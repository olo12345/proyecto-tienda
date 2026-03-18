// import { readFile } from "node:fs/promises"; again, la forma simulada de db
import pool from "./../db/dbconfig.js"; // con esto sí tenemos una conexión a la db
import format from "pg-format";

const selectString = `SELECT l.*,
    (
        SELECT COALESCE(
                JSON_AGG(c.*) FILTER (
                    WHERE c.comentario_id IS NOT NULL
                ),
                '[]'
            )
        FROM comentarios AS c
        WHERE l.libro_id = c.libro_id
    ) AS lista_comentarios,
    (
        SELECT COALESCE(
                JSON_AGG(cat.categoria_nombre),
                '[]'
            )
        FROM categorias AS cat
            LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
        WHERE l.libro_id = lcat.libro_id
    ) AS lista_categorias
FROM libros AS l`

//helper de filtros
const filterHelper = (precio_max, precio_min, categoria, autor) => {
  let filtros = [];
  let valores = [];
  if (precio_max) { filtros.push("l.libro_precio <= %s"); valores.push(precio_max); }
  if (precio_min) { filtros.push("l.libro_precio >= %s"); valores.push(precio_min); }
  if (categoria) { filtros.push("cat.categoria_nombre = %s"); valores.push(categoria); }
  if (autor) { filtros.push("l.libro_autor = %s"); valores.push(autor); }
  // let sqlQuery = 'SELECT * FROM libros AS l LEFT JOIN comentarios AS c ON l.libro_id = c.libro_id LEFT JOIN libros_categorias lc ON l.libro_id = lc.libro_id LEFT JOIN categorias cat ON lc.categoria_id = cat.categoria_id ';
  //GROUP BY l.libro_id, lc.libro_id, c.comentario_id, lc.categoria_id, cat.categoria_id
  let sqlQuery = selectString;
  if (filtros.length > 0) {
    filtros = filtros.join(' AND ')
    sqlQuery += ` WHERE ${filtros}`;
  }
  return { sqlQuery, valores }
};

const getAllItemsModel = async ({ order_by = "libro_id_ASC" }) => {
  const [campo, direccion] = order_by.split('_');
  const sqlQuery = format('SELECT * from libros order by %s %s', campo, direccion);
  const { rows } = await pool.query(sqlQuery);
  return (rows);
}

const getItemsModel = async ({ limits = 10, order_by = "libro_id_ASC", page = 1 }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  const offset = (page - 1) * limits
  const sqlQuery = format(`${selectString} order by %s_%s %s LIMIT %s OFFSET %s`, prefijo, campo, direccion, limits, offset);
  const { rows } = await pool.query(sqlQuery);
  return (rows);
}

const getItemModel = async (id) => {
  // Buscamos un libro específico por su id
  const query = `${selectString} WHERE libro_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return (rows); // Retorna el libro si lo encuentra, o undefined si no existe
};

const getItemsFilterModel = async ({ precio_max, precio_min, categoria, autor }) => {
  // let filtros = [];
  // let fValores = [];
  // const precio_maxInt = parseInt(precio_max);
  // const precio_minInt = parseInt(precio_min);

  const { sqlQuery, valores: fValores } = filterHelper(precio_max, precio_min, categoria, autor)
  const formattedQuery = format(sqlQuery, ...fValores);
  const { rows } = await pool.query(formattedQuery);
  return (rows);
}

export { getAllItemsModel, getItemsModel, getItemModel, getItemsFilterModel };

// export const libroModel = {
//   getAllItemsModel,
//   getItemsModel,
// };
