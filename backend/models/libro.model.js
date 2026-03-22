import pool from "./../db/dbconfig.js";
import format from "pg-format";

const BASE_SELECT = "SELECT * FROM libros";

const getAllItemsModel = async ({ order_by = "libro_id_ASC" }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const sqlQuery = format('SELECT * from libros order by %I_%I %s', prefijo, campo, dir);
  const { rows } = await pool.query(sqlQuery);
  return rows;
}

const getItemsModel = async ({ limits = 3, order_by = "libro_id_ASC", page = 1 }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  // direccion = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits;
  const sqlQuery = format("SELECT * FROM libros ORDER BY %s_%s %s LIMIT %s OFFSET %s", prefijo, campo, direccion, limits, offset);

  // const result = await pool.query(sqlQuery);
  const { rows: libros } = await pool.query(sqlQuery);
  if (libros.length === 0) return [];

  const librosId = libros.map(libro => libro.libro_id);
  let librosString = "'{" + librosId.join(",") + "}'";

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
  const queryLibro = `SELECT * FROM libros WHERE libro_id = $1`;

  //La query de las categorias
  const queryCategorias = `SELECT cat.categoria_nombre FROM categorias AS cat
    LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
    WHERE lcat.libro_id = $1`;

  //La query de los comentarios
  const queryComentarios = ` SELECT c.* FROM comentarios AS c
    WHERE c.libro_id = $1`;

  const libroResult = await pool.query(queryLibro, [id]);
  if (libroResult.rowCount > 0) {
    const { rows: categorias } = await pool.query(queryCategorias, [id]);
    const { rows: comentarios } = await pool.query(queryComentarios, [id]);
    //Se retornan las columnas del libro más sus categorías y comentarios
    return ({
      ...libroResult.rows[0], categorias, comentarios,
      calificacion: comentarios.reduce((acc, comment) => acc + comment.comentario_calificacion, 0) / (comentarios?.length > 0 ? comentarios.length : 1) || 0,
    });
  }
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

const getItemsFilterModel = async ({ limits = 10, page = 1, order_by = "libro_id_ASC", search = "", precio_max, precio_min, categoria, autor }) => {
  const [prefijo, campo, direccion] = order_by.split('_');
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits;

  let filtros = [];
  let fValues = [];

  if (search && search.trim() !== "") {
    filtros.push("(LOWER(libro_titulo) LIKE LOWER(%s) OR LOWER(libro_autor) LIKE LOWER(%s))");
    fValues.push(`%${search}%`, `%${search}%`);
  };
  if (precio_max) {
    filtros.push(format("libro_precio <= %s", precio_max));
    fValues.push(precio_max);
  };
  if (precio_min) {
    filtros.push(format("libro_precio >= %s", precio_min));
    fValues.push(precio_min);
  };
  if (categoria) {
    filtros.push(`EXISTS (
        SELECT 1 FROM categorias AS cat
        JOIN libros_categorias lc ON cat.categoria_id = lc.categoria_id
        WHERE lc.libro_id = l.libro_id AND cat.categoria_nombre = %s)`);
    fValues.push(categoria);
  }
  if (autor) {
    filtros.push("libro_autor = %s");
    fValues.push(autor)
  }

  // let sqlQuery = 'SELECT * FROM libros AS l LEFT JOIN comentarios AS c ON l.libro_id = c.libro_id LEFT JOIN libros_categorias lc ON l.libro_id = lc.libro_id LEFT JOIN categorias cat ON lc.categoria_id = cat.categoria_id ';
  //GROUP BY l.libro_id, lc.libro_id, c.comentario_id, lc.categoria_id, cat.categoria_id
  let sqlQuery = "SELECT l.* FROM libros AS l";
  if (filtros.length > 0) {
    sqlQuery += ` WHERE ${filtros.join(' AND ')}`;
  }

  console.log(fValues, {sqlQuery});

  sqlQuery += ' ORDER BY %s_%s %s LIMIT %s OFFSET %s';
  const formattedQuery = format(sqlQuery, ...fValues, prefijo, campo, dir, limits, offset)
  console.log({formattedQuery});

  const { rows } = await pool.query(sqlQuery);
  return rows;
}

const createItemModel = async (libroData) => {
  let bookValues = []
  let bookQuery = []
  const { libro_categorias } = libroData;
  // const { libro_titulo, libro_autor, libro_precio, libro_stock, libro_categorias, libro_descripcion, libro_imagen = "", libro_fecha_publicacion } = libroData;
  for (let [key, value] of Object.entries(libroData)) {
    if (value != null && key !== "libro_categorias") {
      bookValues.push(value);
      bookQuery.push(key);
    }
  }
  const sqlQuery = `INSERT INTO libros (${bookQuery.join(",")})
 VALUES %L RETURNING *`;
  // const sqlQueryCategorias = `INSERT INTO categorias (categoria_n)`
  const formattedQueryLibros = format(sqlQuery, [bookValues]);
  const { rows: libro } = await pool.query(formattedQueryLibros);
  const libroId = libro[0].libro_id;

  if (libro_categorias) {
    for (const categoria of libro_categorias) {
      const nombreLimpio = categoria.trim().toLowerCase();

      const { rows: resultCat } = await pool.query(
        `INSERT INTO categorias (categoria_nombre)
        VALUES ($1)
        ON CONFLICT (categoria_nombre) DO UPDATE SET categoria_nombre = EXCLUDED.categoria_nombre
        RETURNING categoria_id`,
        [nombreLimpio]
      );
      const categoriaId = resultCat[0].categoria_id;
      await pool.query('INSERT INTO libros_categorias (libro_id, categoria_id) VALUES ($1, $2)', [libroId, categoriaId])
      console.log("categoria vinculada ok", categoriaId)
    }
  }
  return ({ ...libro[0] });
}

const editItemModel = async (id, libroData) => {
  const { libro_categorias } = libroData;
  let bookValues = []
  let bookQuery = []

  for (let [key, value] of Object.entries(libroData)) {
    if (value != null && key !== "libro_categorias") {
      bookValues.push(value);
      bookQuery.push(key);
    }
  }
  const sqlQueryLibros = `UPDATE libros SET (${bookQuery.join(", ")}) = %L WHERE libro_id = %s RETURNING *`;
  // const sqlQueryLibros = `UPDATE libros SET libro_titulo = %s, libro_autor = %s, libro_precio = %s, libro_stock = %s, libro_descripcion = %s, libro_imagen = %s, libro_fecha_publicacion = %s, libro_updated_at = NOW() WHERE libro_id = %s RETURNING *`;
  // console.log(libroData);

  console.log(sqlQueryLibros);
  console.log(bookValues);

  const formattedQueryLibros = format(sqlQueryLibros, [bookValues], id);
  console.log(formattedQueryLibros)
  const resultLibro = await pool.query(formattedQueryLibros);

  await pool.query('DELETE FROM libros_categorias WHERE libro_id = $1', [id])

  if (libro_categorias && libro_categorias.length > 0) {
    for (const categoria of libro_categorias) {
      const nombreLimpio = categoria.trim().toLowerCase();
      console.log("entro if 1", nombreLimpio)
      const { rows: resultCat } = await pool.query(
        `INSERT INTO categorias (categoria_nombre)
        VALUES ($1)
        ON CONFLICT (categoria_nombre) DO UPDATE SET categoria_nombre = EXCLUDED.categoria_nombre
        RETURNING categoria_id`,
        [nombreLimpio]
      );
      console.log("resultCat ok", resultCat)
      const categoriaId = resultCat[0].categoria_id;
      await pool.query('INSERT INTO libros_categorias (libro_id, categoria_id) VALUES ($1, $2)', [id, categoriaId])
      console.log("categoria vinculada ok", categoriaId)
    }
  }
  return (resultLibro.rowCount);
}

const addComentarioModel = async ({ librosId, comentario, calificacion, usuarioId }) => {
  const sqlQuery = `INSERT INTO comentarios (libro_id, comentario_texto, comentario_calificacion, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(sqlQuery, [librosId, comentario, calificacion, usuarioId]);
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
};

// export const libroModel = {
//   getAllItemsModel,
//   getItemsModel,
// };