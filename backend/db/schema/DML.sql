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
