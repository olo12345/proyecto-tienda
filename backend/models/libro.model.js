// import { readFile } from "node:fs/promises"; again, la forma simulada de db
import pool from "./../db/dbconfig.js"; // con esto sí tenemos una conexión a la db
import format from "pg-format";

const BASE_SELECT = "SELECT * FROM libros";

const getAllItemsModel = async ({ order_by = "libro_id_ASC" }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const sqlQuery = format('SELECT * from libros order by %I_%I %s', prefijo, campo, dir);
  const { rows } = await pool.query(sqlQuery);
  return rows;
}

const getItemsModel = async ({ limits = 10, order_by = "libro_id_ASC", page = 1 }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits;

  const sqlQuery = format('SELECT * FROM libros ORDER BY %I_%I %s LIMIT %L OFFSET %L', 
    prefijo, campo, dir, limits, offset);
    
  const { rows: libros } = await pool.query(sqlQuery);
  if (libros.length === 0) return [];

  const librosId = libros.map(libro => libro.libro_id);
  //let librosString= "'{" + librosId.join(",") + "}'";

  const categoriasQuery = `
    SELECT lc.libro_id, cat.categoria_nombre FROM categorias AS cat
    LEFT JOIN libros_categorias AS lc ON cat.categoria_id = lc.categoria_id
    WHERE lc.libro_id = ANY($1)`;

  const comentariosQuery = `SELECT * FROM comentarios WHERE libro_id = ANY($1)`;  
  
  const { rows: categorias } = await pool.query(categoriasQuery, [librosId]);
  const { rows: comentarios } = await pool.query(comentariosQuery, [librosId]);

  return libros.map(libro => {
    const libroComentarios = comentarios.filter(c => c.libro_id === libro.libro_id);
    return {
      ...libro,
      categorias: categorias
        .filter(cat => cat.libro_id === libro.libro_id)
        .map(cat => cat.categoria_nombre),
      comentarios: libroComentarios,
      calificacion: libroComentarios.length > 0 
        ? libroComentarios.reduce((acc, c) => acc + c.comentario_calificacion, 0) / libroComentarios.length 
        : 0,
    };
  });
}

const getItemModel = async (id) => {
  // Buscamos un libro específico por su id
  const queryLibro = `${BASE_SELECT} WHERE libro_id = $1`;

  //La query de las categorias
  const queryCategorias = `SELECT cat.categoria_nombre FROM categorias AS cat
    LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
    WHERE lcat.libro_id = $1`;

  //La query de los comentarios
  const queryComentarios = ` SELECT c.* FROM comentarios AS c
    WHERE c.libro_id = $1`;

  const { rows: libroResult } = await pool.query(queryLibro, [id]);
  const { rows: categorias } = await pool.query(queryCategorias, [id]);
  const { rows: comentarios } = await pool.query(queryComentarios, [id]);

  if (libroResult.length === 0) return null;

  //Se retornan las columnas del libro más sus categorías y comentarios
  return ({
    ...libroResult[0], 
    categorias: categorias.map(c => c.categoria_nombre), 
    comentarios,
    calificacion: comentarios.length > 0 
      ? comentarios.reduce((acc, comment) => acc + comment.comentario_calificacion, 0) / comentarios.length 
      : 0,
  });
};

const getBookCategories = async (id) => {
  const query = `SELECT cat.categoria_nombre FROM categorias AS cat
    LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
    WHERE lcat.libro_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

const getBookComments = async (id) => {
  const query = ` SELECT c.* FROM comentarios AS c
    WHERE c.libro_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

const getItemsFilterModel = async ({ limits = 10, page = 1, order_by = "libro_id_ASC", search, precio_max, precio_min, categoria, autor }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits;

  let filtros = [];

  if (search) { 
    filtros.push(format("(LOWER(libro_titulo) LIKE LOWER(%L) OR LOWER(libro_autor) LIKE LOWER(%L))", `%${search}%`, `%${search}%`)); 
  }
  if (precio_max) filtros.push(format("libro_precio <= %L", precio_max));
  if (precio_min) filtros.push(format("libro_precio >= %L", precio_min));
  if (categoria) {
    filtros.push(format(`EXISTS (
        SELECT 1 FROM categorias cat
        JOIN libros_categorias lc ON cat.categoria_id = lc.categoria_id
        WHERE lc.libro_id = l.libro_id AND cat.categoria_nombre = %L)`, categoria)); 
  }
  if (autor) filtros.push(format("libro_autor = %L", autor));

  // let sqlQuery = 'SELECT * FROM libros AS l LEFT JOIN comentarios AS c ON l.libro_id = c.libro_id LEFT JOIN libros_categorias lc ON l.libro_id = lc.libro_id LEFT JOIN categorias cat ON lc.categoria_id = cat.categoria_id ';
  //GROUP BY l.libro_id, lc.libro_id, c.comentario_id, lc.categoria_id, cat.categoria_id
  let sqlQuery = "SELECT l.* from libros as l";
  if (filtros.length > 0) {
    sqlQuery += ` WHERE ${filtros.join(' AND ')}`;
  }
  
  sqlQuery += format(' ORDER BY %I_%I %s LIMIT %L OFFSET %L', prefijo, campo, dir, limits, offset);

  const { rows } = await pool.query(sqlQuery);
  return rows;
}

const createItemModel = async ({ libro_titulo, libro_autor, libro_descripcion, libro_precio, libro_categorias, libro_stock, libro_imagen }) => {
  const query = `
        INSERT INTO libros 
        (libro_titulo, libro_autor, libro_descripcion, libro_precio, libro_categorias, libro_stock, libro_imagen) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`;
  
  const values = [
    libro_titulo || null,
    libro_autor || null,
    libro_descripcion || null,
    libro_precio || 0,
    libro_categorias || null,
    libro_stock || 0,
    libro_imagen || null
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

const editItemModel = async (id, { titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion }) => {
  const sqlQuery = `UPDATE libros SET libro_titulo = $1, libro_autor = $2, libro_precio = $3, libro_stock = $4, libro_categorias = $5, libro_descripcion = $6, libro_imagen = $7, libro_fecha_publicacion = $8, libro_updated_at = NOW() WHERE libro_id = $9 RETURNING *`;
  const values = [titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion, id];
  const { rows } = await pool.query(sqlQuery, values);
  return rows[0];
}

const addComentarioModel = async ({ librosId, comentario, calificacion, usuarioId }) => {
  const sqlQuery = `INSERT INTO comentarios (libro_id, comentario_texto, comentario_calificacion, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(sqlQuery, [librosId, comentario, calificacion, usuarioId]);
  return rows[0];
}

const createCategoriaModel = async (nombreCategoria) => {
  const sqlQuery = `INSERT INTO categorias (categoria_nombre) VALUES ($1) RETURNING *`; //otro error de tipeo....
  const { rows } = await pool.query(sqlQuery, [nombreCategoria]);
  return rows[0];
}

export {
  getAllItemsModel,
  getItemsModel,
  getItemModel,
  getItemsFilterModel,
  getBookCategories,
  getBookComments,
  createItemModel,
  editItemModel,
  addComentarioModel,
  createCategoriaModel,
};

// export const libroModel = {
//   getAllItemsModel,
//   getItemsModel,
// };