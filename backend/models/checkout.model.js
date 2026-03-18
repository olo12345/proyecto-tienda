import pool from "./../db/dbconfig.js";
import format from "pg-format";

const registrarCompra = async (userId, cart) => {
  try {
    // hay que tener una tabla "compras" o sería el carrito? verificar
    const queryCompra = "INSERT INTO compras (usuario_id) VALUES ($1) RETURNING carrito_id;";
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

export {
  registrarCompra,
};