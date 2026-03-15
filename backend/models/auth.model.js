// import { readFile, writeFile } from "node:fs/promises"; en modelos anteriores leíamos de un archivo json para simular una db
import pool from "../db/connection.js"; // con esto sí tenemos una conexión a la db

const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1;";
    const { rows } = await pool.query(query, [email]);
    return rows[0]; // Retorna el usuario si existe, o undefined si no
  };

const addUser = async (newUser) => {
    const query = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;";
    const { rows } = await pool.query(query, [email, password]);
    return rows[0];
};

export const authModel = {
  getUserByEmail,
  addUser,
};
