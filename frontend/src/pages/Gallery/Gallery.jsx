import { useState, useEffect } from "react";
import { CardBook } from "./CardBook";
import { getProducts } from "./../../services/products";
import FilterBar from "./FilterBar";

const RenderBooks = ({ books }) => {
  if (!books || !books.length)
    return (
      <div style={{ color: "var(--text-muted)", textAlign: "center", width: "100%" }}>
        Cargando galería...
      </div>
    );

  return books.map((book) => (
    <CardBook
      key={book.libro_id}
      id={book.libro_id}
      title={book.libro_titulo}
      price={book.libro_precio}
      img={book.libro_imagen}
      rating={book.calificacion || 0}
    />
  ));
};

function Gallery() {
  const [books, setBooks] = useState([]);

  const [filter, setFilter] = useState({
    author: "",
    minPrice: "",
    maxPrice: "",
    category: ""
  });

  const [orderBy, setOrderBy] = useState("");

  // Función para obtener libros con filtros del backend
  const getBooks = () => {
    // Solo enviar parámetros que tengan valor
    const params = {
      order_by: orderBy || "libro_id_ASC",
      limits: 100
    };

    // Solo agregar filtros si tienen valor
    if (filter.author?.trim()) {
      params.search = filter.author.trim();
    }
    if (filter.minPrice) {
      params.precio_min = Number(filter.minPrice);
    }
    if (filter.maxPrice) {
      params.precio_max = Number(filter.maxPrice);
    }
    if (filter.category?.trim()) {
      params.categoria = filter.category.trim();
    }

    getProducts(params)
      .then((data) => setBooks(data))
      .catch((error) => console.log("Error:", error));
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getBooks();
    }, 500);

    return () => clearTimeout(timer);
  }, [filter, orderBy]);

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "transparent",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "var(--accent-cyan)",
          letterSpacing: "2px",
          fontSize: "2.5rem",
          textShadow: "0 2px 10px rgba(0,229,255,0.3)"
        }}
      >
        Tienda
      </h1>

      {/* Barra de filtros */}
      <FilterBar filter={filter} setFilter={setFilter} />

      {/* ORDER BY */}
      <div style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center"
      }}>
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          style={{
            padding: "12px",
            backgroundColor: "var(--bg-space)",
            border: "1px solid var(--bg-border)",
            color: "var(--text-light)",
            borderRadius: "4px",
            fontSize: "0.9rem",
            outline: "none"
          }}
        >
          <option value="">Ordenar por</option>
          <option value="libro_titulo_ASC">Título A-Z</option>
          <option value="libro_titulo_DESC">Título Z-A</option>
          <option value="libro_precio_ASC">Precio menor a mayor</option>
          <option value="libro_precio_DESC">Precio mayor a menor</option>
        </select>
      </div>

      {/* Tarjetas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <RenderBooks books={books} />
      </div>
    </div>
  );
}

export default Gallery;
