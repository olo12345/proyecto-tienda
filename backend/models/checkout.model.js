import pool from "../db/connection.js";

const registrarCompra = async (userId, cart) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // hay que tener una tabla "compras" o sería el carrito? verificar
    const queryCompra = "INSERT INTO compras (usuario_id) VALUES ($1) RETURNING id;";
    const resCompra = await client.query(queryCompra, [userId]);
    const compraId = resCompra.rows[0].id;

    const queryDetalle = "INSERT INTO detalle_compras (compra_id, libro_id, cantidad) VALUES ($1, $2, $3);";
    
    for (const item of cart) {
      await client.query(queryDetalle, [compraId, item.id, item.cantidad]);
    }

    // Confirmamos los cambios en PostgreSQL
    await client.query("COMMIT");
    
    return compraId; // Devolvemos el número de orden generado
  } catch (error) {
    // Si algo falla, deshacemos todo
    await client.query("ROLLBACK");
    throw error; // Lanzamos el error para que el controlador lo atrape
  } finally {
    // Siempre debemos liberar el cliente para que otros puedan usarlo
    client.release();
  }
};

export const checkoutModel = {
  registrarCompra,
};