import pool from "./../db/dbconfig.js";
import format from "pg-format";

const getAllItemsModel = async ({ order_by = "libro_id_ASC" }) => {
  const [prefijo, campo, direccion] = order_by.split("_");
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const sqlQuery = format(
    "SELECT * FROM libros ORDER BY %I_%I %s",
    prefijo,
    campo,
    dir
  );
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

const getItemsModel = async ({
  limits = 10,
  order_by = "libro_id_ASC",
  page = 1,
}) => {
  const [prefijo, campo, direccion] = order_by.split("_");
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits;

  const sqlQuery = format(
    "SELECT * FROM libros ORDER BY %I_%I %s LIMIT %L OFFSET %L",
    prefijo,
    campo,
    dir,
    limits,
    offset
  );

  const { rows: libros } = await pool.query(sqlQuery);
  if (libros.length === 0) return [];

  const librosId = libros.map((libro) => libro.libro_id);

  const categoriasQuery = `
    SELECT lc.libro_id, cat.categoria_nombre
    FROM categorias AS cat
    LEFT JOIN libros_categorias AS lc ON cat.categoria_id = lc.categoria_id
    WHERE lc.libro_id = ANY($1)
  `;

  const comentariosQuery = `
    SELECT * FROM comentarios
    WHERE libro_id = ANY($1)
  `;

  const { rows: categorias } = await pool.query(categoriasQuery, [librosId]);
  const { rows: comentarios } = await pool.query(comentariosQuery, [librosId]);

  return libros.map((libro) => {
    const libroComentarios = comentarios.filter(
      (c) => c.libro_id === libro.libro_id
    );

    return {
      ...libro,
      categorias: categorias
        .filter((cat) => cat.libro_id === libro.libro_id)
        .map((cat) => cat.categoria_nombre),
      comentarios: libroComentarios,
      calificacion:
        libroComentarios.length > 0
          ? libroComentarios.reduce(
              (acc, c) => acc + c.comentario_calificacion,
              0
            ) / libroComentarios.length
          : 0,
    };
  });
};

const getItemModel = async (id) => {
  const queryLibro = `SELECT * FROM libros WHERE libro_id = $1`;

  const queryCategorias = `
    SELECT cat.categoria_nombre
    FROM categorias AS cat
    LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
    WHERE lcat.libro_id = $1
  `;

  const queryComentarios = `
    SELECT c.*, u.usuario_nombre AS username
    FROM comentarios AS c
    JOIN usuarios AS u USING (usuario_id)
    WHERE c.libro_id = $1
    ORDER BY c.comentario_id DESC
  `;

  const libroResult = await pool.query(queryLibro, [id]);

  if (libroResult.rowCount > 0) {
    const { rows: categorias } = await pool.query(queryCategorias, [id]);
    const { rows: comentarios } = await pool.query(queryComentarios, [id]);

    return {
      ...libroResult.rows[0],
      categorias: categorias.map((c) => c.categoria_nombre),
      comentarios,
      calificacion:
        comentarios.length > 0
          ? comentarios.reduce(
              (acc, comment) => acc + comment.comentario_calificacion,
              0
            ) / comentarios.length
          : 0,
    };
  }
};

const getBookCategories = async (id) => {
  const query = `
    SELECT cat.categoria_nombre
    FROM categorias AS cat
    LEFT JOIN libros_categorias AS lcat ON cat.categoria_id = lcat.categoria_id
    WHERE lcat.libro_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows;
};

const getItemsFilterModel = async ({
  limits = 10,
  page = 1,
  order_by = "libro_id_ASC",
  search = "",
  precio_max,
  precio_min,
  categoria,
  autor,
 }) => {
  const [prefijo, campo, direccion] = order_by.split("_");
  const dir = direccion.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limits;

  const columnaOrden = `${prefijo}_${campo}`;

  let filtros = [];
  let fValues = [];

  if (search && search.trim() !== "") {
    filtros.push("(libro_titulo ILIKE %L OR libro_autor ILIKE %L)"); //aquí había una coma en vz de punto y ocma
      fValues.push(`%${search}%`, `%${search}%`);
  };
  if (precio_max) {
    filtros.push("libro_precio <= %L"); // caambiamos %s por %L para que SQL lo entianda como valor
    fValues.push(precio_max);
  };
  if (precio_min) {
    filtros.push("libro_precio >= %L"); // cambiamos %s por %L para que SQL lo entianda como valor
    fValues.push(precio_min);
  };
  if (autor) {
    filtros.push("libro_autor ILIKE %L");
    fValues.push(`%${autor}%`)
  }

  if (categoria) {
    const categoriasQuery = `
      SELECT lc.libro_id, cat.categoria_nombre
      FROM categorias AS cat
      LEFT JOIN libros_categorias AS lc ON cat.categoria_id = lc.categoria_id
      WHERE cat.categoria_nombre ILIKE $1
    `;
    const resultCategorias = await pool.query(categoriasQuery, [`%${categoria}%`]);
    //Si no coincide ninguna categoría, devuelve vacío
    if (resultCategorias.rowCount === 0) return [];
    const catValue = resultCategorias.rows.filter(cat => cat.libro_id !== null).map(cat => cat.libro_id);
    console.log({ catValue });
    // Usar formato SQL directo para el array de IDs
    filtros.push(`l.libro_id = ANY(ARRAY[${catValue.join(',')}])`);
  }

  let sqlQuery = "SELECT l.* FROM libros AS l";
  if (filtros.length > 0) {
    sqlQuery += ` WHERE ${filtros.join(" AND ")}`;
  }
  fValues.push(columnaOrden, dir, limits, offset);
  sqlQuery += ' ORDER BY %I %s LIMIT %L OFFSET %L';

  const formattedQuery = format(sqlQuery, ...fValues)
  const { rows: libros } = await pool.query(formattedQuery);
  if (libros.length === 0) return [];

  const librosId = libros.map((libro) => libro.libro_id);

  const comentariosQuery = `SELECT * FROM comentarios WHERE libro_id = ANY($1)`;
  const { rows: comentarios } = await pool.query(comentariosQuery, [librosId]);

  const relCategoriasQuery = `
    SELECT lc.libro_id, cat.categoria_nombre
    FROM categorias AS cat
    LEFT JOIN libros_categorias AS lc ON cat.categoria_id = lc.categoria_id
    WHERE lc.libro_id = ANY($1)
  `;
  const { rows: categoriasRelacionadas } = await pool.query(relCategoriasQuery, [librosId]);

  const librosResult = libros.map((libro) => {
    const libroComentarios = comentarios.filter(
      (c) => c.libro_id === libro.libro_id
    );

    return {
      ...libro,
      categorias: categoriasRelacionadas
        .filter((cat) => cat.libro_id === libro.libro_id)
        .map((cat) => cat.categoria_nombre),
      comentarios: libroComentarios,
      calificacion:
        libroComentarios.length > 0
          ? libroComentarios.reduce(
              (acc, c) => acc + c.comentario_calificacion,
              0
            ) / libroComentarios.length
          : 0,
    };
  });

  return librosResult;
};

const createItemModel = async (libroData) => {
  const {
    libro_titulo,
    libro_autor,
    libro_descripcion,
    libro_precio,
    libro_stock,
    libro_imagen,
    libro_categorias,
  } = libroData;

  const sqlQuery = `
    INSERT INTO libros (
      libro_titulo,
      libro_autor,
      libro_descripcion,
      libro_precio,
      libro_stock,
      libro_imagen
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const { rows: libro } = await pool.query(sqlQuery, [
    libro_titulo,
    libro_autor,
    libro_descripcion,
    libro_precio,
    libro_stock,
    libro_imagen,
  ]);

  const libroId = libro[0].libro_id;

  if (libro_categorias) {
    for (const categoria of libro_categorias) {
      const nombreLimpio = categoria.trim().toLowerCase();
      let resultCat = [];

      if (nombreLimpio) {
        ({ rows: resultCat } = await pool.query(
          `
          INSERT INTO categorias (categoria_nombre)
          VALUES ($1)
          ON CONFLICT (categoria_nombre)
          DO UPDATE SET categoria_nombre = EXCLUDED.categoria_nombre
          RETURNING categoria_id
          `,
          [nombreLimpio]
        ));

        const categoriaId = resultCat[0].categoria_id;

        await pool.query(
          "INSERT INTO libros_categorias (libro_id, categoria_id) VALUES ($1, $2)",
          [libroId, categoriaId]
        );
      }
    }
  }

  return libro[0];
};

const editItemModel = async (id, libroData) => {
  const { libro_categorias } = libroData;
  let bookValues = [];
  let bookQuery = [];

  for (const [key, value] of Object.entries(libroData)) {
    if (value != null && key !== "libro_categorias") {
      bookValues.push(value);
      bookQuery.push(key);
    }
  }

  const sqlQueryLibros = `
    UPDATE libros
    SET (${bookQuery.join(", ")}) = %L
    WHERE libro_id = %s
    RETURNING *
  `;

  const formattedQueryLibros = format(sqlQueryLibros, [bookValues], id);
  const resultLibro = await pool.query(formattedQueryLibros);

  await pool.query("DELETE FROM libros_categorias WHERE libro_id = $1", [id]);

  if (libro_categorias && libro_categorias.length > 0) {
    for (const categoria of libro_categorias) {
      const nombreLimpio = categoria.trim().toLowerCase();
      let resultCat = [];

      if (nombreLimpio) {
        ({ rows: resultCat } = await pool.query(
          `
          INSERT INTO categorias (categoria_nombre)
          VALUES ($1)
          ON CONFLICT (categoria_nombre)
          DO UPDATE SET categoria_nombre = EXCLUDED.categoria_nombre
          RETURNING categoria_id
          `,
          [nombreLimpio]
        ));

        const categoriaId = resultCat[0].categoria_id;

        await pool.query(
          "INSERT INTO libros_categorias (libro_id, categoria_id) VALUES ($1, $2)",
          [id, categoriaId]
        );
      }
    }
  }

  return resultLibro.rows[0];
};

const addComentarioModel = async (comentarioData) => {
  const { libroId, comentario, calificacion, usuario_id } = comentarioData;

  const sqlQuery = `
    INSERT INTO comentarios (
      libro_id,
      comentario_texto,
      comentario_calificacion,
      usuario_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const { rows } = await pool.query(sqlQuery, [
    libroId,
    comentario,
    calificacion,
    usuario_id,
  ]);

  return rows[0];
};

const getBooksByCommentsModel = async () => {
  const comentariosQuery = `
    SELECT libro_id, AVG(comentario_calificacion) AS calificacion
    FROM comentarios
    GROUP BY libro_id
    ORDER BY calificacion DESC
    LIMIT 10
  `;

  const { rows: comentarios } = await pool.query(comentariosQuery);
  if (comentarios.length === 0) return [];

  const librosId = comentarios.map((l) => l.libro_id);
  const { rows: libros } = await pool.query(
    "SELECT * FROM libros WHERE libro_id = ANY($1)",
    [librosId]
  );

  return libros.map((libro) => ({
    ...libro,
    ...comentarios.find((c) => c.libro_id === libro.libro_id),
  }));
};

const deleteItemModel = async (libroId) => {
  await pool.query("DELETE FROM libros WHERE libro_id = $1", [libroId]);
};

export {
  getAllItemsModel,
  getItemsModel,
  getItemModel,
  getItemsFilterModel,
  getBookCategories,
  getBooksByCommentsModel,
  createItemModel,
  editItemModel,
  addComentarioModel,
  deleteItemModel,
};