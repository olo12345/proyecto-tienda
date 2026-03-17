// import { readFile } from "node:fs/promises"; again, la forma simulada de db
import pool from "./../db/dbconfig.js"; // con esto sí tenemos una conexión a la db
import format from "pg-format";

const getLibros = async () => {
    // Pedimos todos los libros a la tabla correspondiente
    const query = "SELECT * FROM libros;";
    const { rows } = await pool.query(query);
    return rows; // Retorna el arreglo completo con el catálogo
  };

  const getItemModel = async (id) => {
    // Buscamos un libro específico por su id
    const query = "SELECT * FROM libros WHERE id = $1;";
    const { rows } = await pool.query(query, [id]);
    return (rows); // Retorna el libro si lo encuentra, o undefined si no existe
  };

const getAllItemsModel = async ({ order_by = "id_ASC" }) => {
    const [campo, direccion] = order_by.split('_');
    const sqlQuery = format('SELECT * from inventario order by %s %s', campo, direccion);
    const { rows } = await pool.query(sqlQuery);
    return (rows);
}

const getItemsModel = async ({ limits = 10, order_by = "id_ASC", page = 1 }) => {
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits
    const sqlQuery = format('SELECT * from inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    const { rows } = await pool.query(sqlQuery);
    return (rows);
}



const getItemsFilterModel = async ({ precio_max, precio_min, categoria, autor }) => {
    let filtros = [];
    let fValores = [];
    // const precio_maxInt = parseInt(precio_max);
    // const precio_minInt = parseInt(precio_min);

    if ((precio_max)) {
        filtros.push(`precio <= %s`);
        fValores.push(precio_max);
    }

    if ((precio_min)) {
        filtros.push(`precio >= %s`);
        fValores.push(precio_min);
    }
    if (categoria) {
        filtros.push(`categoria = '%s'`);
        fValores.push(categoria);
    }
    if (autor) {
        filtros.push(`autor = '%s'`);
        fValores.push(autor);
    }


    let sqlQuery = 'SELECT * FROM inventario'
    if (filtros.length > 0) {
        filtros = filtros.join(' AND ')
        sqlQuery += ` WHERE ${filtros}`;
    }
        const formattedQuery = format(sqlQuery, ...fValores);
        const { rows } = await pool.query(formattedQuery);
        return (rows);
}

export { getAllItemsModel, getItemsModel, getItemModel, getItemsFilterModel };

// export const libroModel = {
//   getAllItemsModel,
//   getItemsModel,
// };
