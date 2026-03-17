-- 1. Insert Categories
INSERT INTO categorias (categoria_nombre) VALUES
('Ficción'),
('Ciencia Ficción'),
('Fantasía'),
('Terror'),
('Biografía');

-- 2. Insert Users (Note: Ensure the ENUM 'admin'/'user' exists)
INSERT INTO usuarios (usuario_nombre, usuario_email, usuario_password, usuario_edad, usuario_rol) VALUES
('Admin Principal', 'admin@tienda.com', 'hash_password_123', 30, 'admin'),
('Juan Perez', 'juan@email.com', 'hash_password_456', 25, 'user'),
('Maria Lopez', 'maria@email.com', 'hash_password_789', 22, 'user');

-- 3. Insert Books
INSERT INTO libros (libro_titulo, libro_descripcion, libro_precio, libro_stock, libro_autor, libro_fecha_publicacion) VALUES
('El Quijote', 'Clasico de la literatura española', 2500, 10, 'Miguel de Cervantes', '1605-01-16'),
('Dune', 'Epica de ciencia ficciOn en Arrakis', 3500, 5, 'Frank Herbert', '1965-08-01'),
('El resplandor', 'Novela de terror psicolOgico', 2800, 8, 'Stephen King', '1977-01-28');

-- 4. Link Books and Categories
INSERT INTO libros_categorias (libro_id, categoria_id) VALUES
(1, 1), -- El Quijote -> Ficción
(2, 2), -- Dune -> Ciencia Ficción
(3, 4); -- El resplandor -> Terror

-- 5. Insert Comments
INSERT INTO comentarios (usuario_id, libro_id, comentario_texto, comentario_calificacion) VALUES
(2, 1, 'Un clásico imprescindible.', 5),
(3, 2, 'Muy denso pero fascinante.', 4),
(2, 3, 'Me dio mucho miedo, excelente.', 5),
(1, 3, 'Me dio mucho mucho miedo, excelente.', 5);