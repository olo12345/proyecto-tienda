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
VALUES ('%s', '%s', '%s', '%s', '%s', '%s')