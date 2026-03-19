// import { readFile } from "node:fs/promises"; again, la forma simulada de db
import pool from "./../db/dbconfig.js"; // con esto sí tenemos una conexión a la db
import format from "pg-format";

const getAllItemsModel = async ({ order_by = "libro_id_ASC" }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  direccion = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const sqlQuery = format('SELECT * from libros order by %s_%s %s', prefijo, campo, direccion);
  const { rows } = await pool.query(sqlQuery);
  return (rows);
}

const getItemsModel = async ({ limits = 10, order_by = "libro_id_ASC", page = 1 }) => {
  // const [prefijo, campo, direccion] = order_by.split('_');
  // direccion = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  // const offset = (page - 1) * limits
  const sqlQuery = "SELECT * from libros";
  // const result = await pool.query(sqlQuery);


  const { rows: libros } = await pool.query(sqlQuery);
  if (libros.length === 0) {
    return [];
  }
  //bien
  const librosId = libros.map(libro => libro.libro_id);
  let librosString= "'{" + librosId.join(",") + "}'";

  const categoriasQuery = format(`SELECT lc.libro_id, cat.categoria_nombre FROM categorias AS cat
    LEFT JOIN libros_categorias AS lc ON cat.categoria_id = lc.categoria_id
    WHERE lc.libro_id = ANY(%s)`, librosString);


  const comentariosQuery = format(`SELECT c.* FROM comentarios AS c WHERE c.libro_id = ANY(%s)`, librosString);
  const { rows: categorias } = await pool.query(categoriasQuery);
  const { rows: comentarios } = await pool.query(comentariosQuery);
  const librosCategoriasComentarios = libros.map(libro => {
    return {
      ...libro,
      categorias: categorias
        .filter(cat => cat.libro_id === libro.libro_id)
        .map(cat => cat.categoria_nombre),
      comentarios: comentarios
        .filter(comment => comment.libro_id === libro.libro_id),
      calificacion: comentarios.reduce((acc, comment) => acc + comment.comentario_calificacion, 0) / comentarios?.length || 0,
    }
  })
  console.log(librosCategoriasComentarios)
  return (librosCategoriasComentarios);
}

const getItemModel = async (id) => {
  // Buscamos un libro específico por su id
  const queryLibro = `${selectString} WHERE libro_id = $1`;

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
  //Se retornan las columnas del libro más sus categorías y comentarios
  return ({
    ...libroResult, categorias, comentarios,
    calificacion: comentarios.reduce((acc, comment) => acc + comment.comentario_calificacion, 0) / (comentarios?.length > 0 ? comentarios.length : 1) || 0,
  });
};

const getBookCategories = async (id) => {
  const query = `SELECT cat.categoria_nombre FROM categorias AS cat
    LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
    WHERE lcat.libro_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return (rows);
}

const getBookComments = async (id) => {
  const query = ` SELECT c.* FROM comentarios AS c
    WHERE c.libro_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return (rows);
}

const getItemsFilterModel = async ({ limits = 10, page = 1, order_by = "libro_id_ASC", search, precio_max, precio_min, categoria, autor }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  direccion = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits

  let filtros = [];
  let fValores = [];

  if (search) { filtros.push("(LOWER(libro_titulo) LIKE LOWER(%s) OR LOWER(libro_autor) LIKE LOWER(%s))"); fValores.push(search, search); }
  if (precio_max) { filtros.push("libro_precio <= %s"); fValores.push(precio_max); }
  if (precio_min) { filtros.push("libro_precio >= %s"); fValores.push(precio_min); }
  if (categoria) {
    filtros.push(`EXISTS (
        SELECT 1 FROM categorias cat
        JOIN libros_categorias lc ON cat.categoria_id = lc.categoria_id
        WHERE lc.libro_id = l.libro_id AND cat.categoria_nombre = %%s)`); fValores.push(categoria);
  }
  if (autor) { filtros.push("libro_autor = %s"); fValores.push(autor); }
  // let sqlQuery = 'SELECT * FROM libros AS l LEFT JOIN comentarios AS c ON l.libro_id = c.libro_id LEFT JOIN libros_categorias lc ON l.libro_id = lc.libro_id LEFT JOIN categorias cat ON lc.categoria_id = cat.categoria_id ';
  //GROUP BY l.libro_id, lc.libro_id, c.comentario_id, lc.categoria_id, cat.categoria_id
  let sqlQuery = "SELECT l.* from libros as l";
  if (filtros.length > 0) {
    filtros = filtros.join(' AND ')
    sqlQuery += ` WHERE ${filtros}`;
  }
  sqlQuery += ` ORDER BY %s_%s LIMIT %s OFFSET %s`;
  fValores.push(prefijo, campo, direccion, limits, offset);

  const formattedQuery = format(sqlQuery, ...fValores);
  const { rows } = await pool.query(formattedQuery);
  return (rows);
}

const createItemModel = async ({ titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion }) => {
  const sqlQuery = `INSERT INTO libros (libro_titulo, libro_autor, libro_precio, libro_stock, libro_categorias, libro_descripcion, libro_imagen, libro_fecha_publicacion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *`;
  const formattedQuery = format(sqlQuery, titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion);
  const { rows } = await pool.query(formattedQuery);
  return (rows[0]);
}

const editItemModel = async (id, { titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion }) => {
  const sqlQuery = `UPDATE libros SET libro_titulo = %s, libro_autor = %s, libro_precio = %s, libro_stock = %s, libro_categorias = %s, libro_descripcion = %s, libro_imagen = %s, libro_fecha_publicacion = %s, libro_updated_at = NOW() WHERE libro_id = %s RETURNING *`;
  const formattedQuery = format(sqlQuery, titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion, id);
  const { rows } = await pool.query(formattedQuery);
  return (rows[0]);
}

const addComentarioModel = async ({ librosId, comentario, calificacion, usuarioId }) => {
  const sqlQuery = `INSERT INTO comentarios (libro_id, comentario_texto, comentario_calificacion, usuario_id) VALUES (%s, %s, %s, %s) RETURNING *`;
  const formattedQuery = format(sqlQuery, librosId, comentario, calificacion, usuarioId);
  const { rows } = await pool.query(formattedQuery);
  return (rows[0]);
}

const createCategoriaModel = async (nombreCategoria) => {
  const sqlQuery = `INSER INTO categorias (categoria_nombre) VALUES (%s) RETURNING *`;
  const formattedQuery = format(sqlQuery, nombreCategoria);
  const { rows } = await pool.query(formattedQuery);
  return (rows[0]);
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
