CREATE DATABASE thepassengerbooks;
CREATE TYPE rol AS ENUM ('admin', 'user');
CREATE TABLE usuarios (
    usuario_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_nombre VARCHAR(255) NOT NULL,
    usuario_email VARCHAR(255) NOT NULL,
    usuario_password VARCHAR(255) NOT NULL,
    usuario_edad SMALLINT,
    usuario_habilitado BOOLEAN DEFAULT TRUE,
    usuario_rol rol,
    usuario_imagen TEXT,
    usuario_created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CHECK (usuario_edad >= 0)
);
CREATE TABLE libros (
    libro_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    libro_titulo VARCHAR(255) NOT NULL,
    libro_descripcion TEXT,
    libro_precio INT NOT NULL,
    libro_stock SMALLINT,
    libro_imagen TEXT,
    libro_fecha_publicacion DATE,
    libro_autor VARCHAR(255),
    libro_created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    libro_updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CHECK (libro_stock >= 0),
    CHECK (libro_precio >= 0)
);
CREATE TABLE comentarios (
    comentario_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id INT,
    libro_id INT,
    comentario_texto TEXT,
    comentario_calificacion SMALLINT NOT NULL,
    comentario_created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comentario_updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id) ON DELETE
    SET NULL,
        FOREIGN KEY(libro_id) REFERENCES libros(libro_id) ON DELETE CASCADE
);
CREATE TABLE carritos (
    carrito_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id INT,
    carrito_activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);
CREATE TABLE carrito_libros (
    carrito_id INT,
    libro_id INT,
    cantidad SMALLINT,
    PRIMARY KEY (carrito_id, libro_id),
    FOREIGN KEY(carrito_id) REFERENCES carritos(carrito_id) ON DELETE CASCADE,
    FOREIGN KEY(libro_id) REFERENCES libros(libro_id) ON DELETE CASCADE,
    CHECK (cantidad >= 0)
);
CREATE TYPE order_status AS ENUM(
    'pendiente',
    'pagado',
    'enviado',
    'completado',
    'cancelado'
);
CREATE TABLE pedidos (
    pedido_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id INT,
    pedido_costo_total INT,
    pedido_created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    pedido_status order_status DEFAULT 'pendiente',
    --Set null para guardar un estado de todos los pedidos hechos en caso que se quiera hacer una revisión por una diferencia en los movimientos de stock
    FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id) ON DELETE
    SET NULL,
        CHECK (pedido_costo_total > 0)
);
CREATE TABLE categorias (
    categoria_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoria_nombre VARCHAR(255) NOT NULL
);
CREATE TABLE libros_categorias (
    libro_id INT,
    categoria_id INT,
    FOREIGN KEY(libro_id) REFERENCES libros(libro_id) ON DELETE CASCADE,
    FOREIGN KEY(categoria_id) REFERENCES categorias(categoria_id) ON DELETE CASCADE
);