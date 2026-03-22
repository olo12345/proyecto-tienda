import pool from "./../db/dbconfig.js";

const createOrderModel = async (userId, cart) => {
  const client = await pool.connect();
  try {
    //se utiliza un cliente para realizar una transacción y poder hacer rollback en caso de un error inesperado a mitad de proceso
    await client.query('BEGIN');

    const librosId = '{' + cart.map((libro) => libro.libro_id) + '}';
    const { rows: precioLibros } = await client.query('SELECT libro_id, libro_precio FROM libros WHERE libro_id = ANY($1)', [librosId])
    const totalPrecio = cart.reduce((acc, libroFront) => {
      //Esto se hace para sacar los precios del backend y evitar manipulación maliciosa
      const libro = precioLibros.find((libroDb) => libroDb.libro_id === libroFront.libro_id);
      return acc + (libro.libro_precio * libroFront.cantidad);
    }, 0);

    const { rows: resultPedido } = await client.query(
      'INSERT INTO pedidos (usuario_id, pedido_costo_total, pedido_status) VALUES ($1, $2, $3) returning pedido_id',
      [userId, totalPrecio, 'pagado']
    );

    for (const libro of cart) {
    await client.query(
        'UPDATE libros SET libro_stock = libro_stock - $1 WHERE libro_id = $2',
        [libro.cantidad, libro.libro_id]
    );
  }

    await client.query('UPDATE carritos SET carrito_activo = FALSE WHERE carrito_id = $1', [cart.carrito_id])


    await client.query("COMMIT");

    return resultPedido[0].pedido_id; // Devolvemos el número de orden generado
  } catch (error) {
    await client.query('ROLLBACK');
    throw error; // Lanzamos el error para que el controlador lo atrape
  }
  finally {
    client.release();
  }
};

const getCartModel = async (userId) => {
  const query = `SELECT cl.libro_id, cl.cantidad, l.libro_titulo, l.libro_precio
  FROM carrito_libros AS cl
  JOIN carritos AS c ON cl.carrito_id = c.carrito_id
  JOIN libros l ON cl.libro_id = l.libro_id
  WHERE c.usuario_id = $1`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}

const updateCartModel = async ({ usuario_id, libro_id, libro_cantidad }) => {
  const carritoResult = await pool.query('SELECT carrito_id FROM carritos WHERE usuario_id = $1', [usuario_id]);

  let newCart = [];
  if (carritoResult.rowCount === 0) {
    const result = await pool.query('INSERT INTO carritos (usuario_id, carrito_activo) VALUES ($1, $2) RETURNING carrito_id', [usuario_id, true]);
    newCart = result.rows;
    console.log('newCart', newCart);
  }
  const carritoId = newCart ? newCart[0].carrito_id : carritoResult.rows[0].carrito_id;

  const addBookQuery = `INSERT INTO carrito_libros (carrito_id, libro_id, cantidad)
  VALUES ($1, $2, $3)
  ON CONFLICT (carrito_id, libro_id)
  DO UPDATE SET cantidad = $3
  WHERE carrito_id = $1 AND libro_id = $2`;

  await pool.query(addBookQuery, [carritoId, libro_id, libro_cantidad]);
}

const deleteItemModel = async (userId, libroId) => {
  const query = `DELETE FROM carrito_libros AS cl
  USING carritos AS c
  WHERE cl.carrito_id = c.carrito_id
  AND c.usuario_id = $1
  AND cl.libro_id = $2`;
  await pool.query(query, [userId, libroId]);
}

const deleteCartModel = async (userId) => {
  const query = `DELETE FROM carrito_libros AS cl
  USING carritos AS c
  WHERE cl.carrito_id = c.carrito_id
  AND c.usuario_id = $1`;
  await client.query(query, [userId]);
}

export {
  createOrderModel,
  getCartModel,
  updateCartModel,
  deleteItemModel,
  deleteCartModel,
};