import pool from "./../db/dbconfig.js";
import format from "pg-format";

const isEmailRegistered = async (email) => {
  const query = "SELECT * FROM usuarios WHERE usuario_email = $1";
  const result = await pool.query(query, [email]);
  return (result.rowCount > 0);
};

// CORREGIDO: Ahora recibe "nombre"
const createUserModel = async ({ nombre, email, password, rol = 'user', edad, imagen = null }) => {
  const sqlQuery = format(
    "INSERT INTO usuarios (usuario_email, usuario_password, usuario_nombre, usuario_edad, usuario_rol, usuario_imagen) VALUES (%L, %L, %L, %L, %L, %L) RETURNING *",
    email, password, nombre, edad, rol, imagen
  );
  
  const { rowCount } = await pool.query(sqlQuery);
  return rowCount;
}

const loginUserModel = async (email) => {
    // CORREGIDO: El nombre de la columna en la bd es "usuario_email"
    const sqlQuery = 'SELECT * FROM usuarios WHERE usuario_email = $1';
    const result = await pool.query(sqlQuery, [email]);
    return result;
}

const verificarCredencialesModel = async (email) => {
    // CORREGIDO: Nombres de columnas según la tabla "usuarios"
    const sqlQuery = 'SELECT usuario_email, usuario_rol FROM usuarios WHERE usuario_email = $1';
    const result = await pool.query(sqlQuery, [email]);
    return result;
}

export const authModel = {
  isEmailRegistered,
  createUserModel,
  loginUserModel,
  verificarCredencialesModel,
};