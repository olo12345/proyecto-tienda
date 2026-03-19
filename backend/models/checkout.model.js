import pool from "./../db/dbconfig.js";
import format from "pg-format";

const createOrderModel = async (userId, cart) => {
  try {
    // hay que tener una tabla "compras" o sería el carrito? verificar
    const queryCompra = "INSERT INTO pedidos (usuario_id) VALUES ($1) RETURNING carrito_id;";
    const resCompra = await pool.query(queryCompra, [userId]);
    const compraId = resCompra.rows[0].id;

    let queryDetalle = "INSERT INTO carrito_libros (compra_id, libro_id, cantidad) VALUES";
    let placeholders = []
    let values = [];
    for (const item of cart) {
      placeholders.push('(%s, %s, %s)');
      values.push(compraId, item.id, item.cantidad);
    }
    queryDetalle += placeholders.join(", ");
    formattedQuery = format(queryDetalle, ...values);
    await pool.query(formattedQuery);

    // Confirmamos los cambios en PostgreSQL
    await pool.query("COMMIT");

    return compraId; // Devolvemos el número de orden generado
  } catch (error) {
    // Si algo falla, deshacemos todo
    throw error; // Lanzamos el error para que el controlador lo atrape
  }
};

const getCartModel = async (userId) => {
  const query = `SELECT cl.libro_id, cl.cantidad, l.libro_titulo, l.libro_precio
  FROM carrito_libros AS cl
  JOIN carritos AS c ON cl.compra_id = c.compra_id
  JOIN libros l ON cl.libro_id = l.libro_id
  WHERE c.usuario_id = $1`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}

const deleteItemModel = async (userId, libroId) => {
  const query = `DELETE FROM carrito_libros AS cl
  USING carritos AS c
  WHERE cl.compra_id = c.compra_id
  AND c.usuario_id = $1
  AND cl.libro_id = $2`;
  await pool.query(query, [userId, libroId]);
}

const deleteCartModel = async (userId) => {
  const query = `DELETE FROM carrito_libros AS cl
  USING carritos AS c
  WHERE cl.compra_id = c.compra_id
  AND c.usuario_id = $1`;
  await pool.query(query, [userId]);
}

export {
  createOrderModel,
  getCartModel,
  deleteItemModel,
  deleteCartModel
};