// import { readFile } from "node:fs/promises"; again, la forma simulada de db
import pool from "../db/connection.js"; // con esto sí tenemos una conexión a la db

const getLibros = async () => {
    // Pedimos todos los libros a la tabla correspondiente
    const query = "SELECT * FROM libros;";
    const { rows } = await pool.query(query);
    return rows; // Retorna el arreglo completo con el catálogo
  };
  
  const getLibro = async (id) => {
    // Buscamos un libro específico por su id
    const query = "SELECT * FROM libros WHERE id = $1;";
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Retorna el libro si lo encuentra, o undefined si no existe
  };

export const libroModel = {
  getLibros,
  getLibro,
};
