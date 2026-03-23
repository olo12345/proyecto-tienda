-- Check if user email exists in the db
SELECT *
FROM usuarios
WHERE usuario_email = $1;
-- Create new user
INSERT INTO usuarios (
        usuario_email,
        usuario_password,
        usuario_nombre,
        usuario_edad,
        usuario_rol,
        usuario_imagen
    )
VALUES ('%s', '%s', '%s', '%s', '%s', '%s');
-- Edit user
UPDATE usuarios
SET usuario_password = '%s',
    usuario_nombre = '%s',
    usuario_edad = '%s',
    usuario_rol '%s',
    usuario_imagen '%s'
WHERE usuario_email = '%s'
RETURNING usuario_nombre,
    usuario_edad,
    usuario_rol,
    usuario_imagen;
-- Add book
INSERT INTO libros (
        libro_titulo,
        libro_descripcion,
        libro_precio,
        libro_stock,
        libro_imagen,
        libro_fecha_publicacion,
        libro_autor,
    )
VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s');
-- Get book with reviews and categories
SELECT l.*,
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
FROM libros AS l;