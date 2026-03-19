// import { readFile, writeFile } from "node:fs/promises"; en modelos anteriores leíamos de un archivo json para simular una db
import pool from "./../db/dbconfig.js"; // con esto sí tenemos una conexión a la db
import format from "pg-format";

const isEmailRegistered = async (email) => {
  const query = "SELECT * FROM usuarios WHERE usuario_email = $1";
  const result = await pool.query(query, [email]);
  return (result.rowCount ? true : false);
};

//Se deja abierta la inyección de rol para poder crear usuarios administradores
const createUserModel = async ({ email, password, rol = 'user', edad, imagen = null }) => {
  const values = [email, password,nombre, edad, rol, imagen];
  const sqlQuery = "INSERT INTO usuarios ( usuario_email, usuario_password, usuario_nombre, usuario_edad, usuario_rol, usuario_imagen) VALUES ('%s', '%s', '%s, '%s, '%s, '%s')";
  const formattedQuery = format(sqlQuery, ...values);
  const { rowCount } = await pool.query(formattedQuery);
  return rowCount;
}

const loginUserModel = async (email) => {
    const sqlQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(sqlQuery, values);
    return result;
}

const verificarCredencialesModel = async (email) => {
    const sqlQuery = 'SELECT email, rol FROM usuarios WHERE email = $1';
    const result = await pool.query(sqlQuery, [email]);
    return result;
}

export const authModel = {
  isEmailRegistered,
  createUserModel,
  loginUserModel,
  verificarCredencialesModel,
};
