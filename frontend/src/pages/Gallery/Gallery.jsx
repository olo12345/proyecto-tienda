import { useState, useEffect } from "react";
import { CardBook } from "./CardBook";
import { getProducts } from "./../../services/products";
import FilterBar from "./FilterBar";

const RenderBooks = ({ books }) => {
  if (!books.length)
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

  const getBooks = () => {
    getProducts()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) =>
        console.log("Ocurrió un error al obtener los libros", error)
      );
  };

  useEffect(() => {
    getBooks();
  }, []);

  // FILTROS
  const filteredBooks = books.filter((book) => {
    const matchesAuthor =
      filter.author === "" ||
      (book.libro_autor &&
        book.libro_autor.toLowerCase().includes(filter.author.toLowerCase()));

    const matchesCategory =
      filter.category === "" ||
      (book.libro_categorias &&
        book.libro_categorias.toLowerCase().includes(filter.category.toLowerCase()));

    const matchesMinPrice =
      filter.minPrice === "" ||
      Number(book.libro_precio) >= Number(filter.minPrice);

    const matchesMaxPrice =
      filter.maxPrice === "" ||
      Number(book.libro_precio) <= Number(filter.maxPrice);

    return (
      matchesAuthor &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  // ORDER BY
  let sortedBooks = [...filteredBooks];

  if (orderBy === "libro_titulo_ASC") {
    sortedBooks.sort((a, b) =>
      a.libro_titulo.localeCompare(b.libro_titulo)
    );
  } else if (orderBy === "libro_titulo_DESC") {
    sortedBooks.sort((a, b) =>
      b.libro_titulo.localeCompare(a.libro_titulo)
    );
  } else if (orderBy === "libro_precio_ASC") {
    sortedBooks.sort(
      (a, b) => Number(a.libro_precio) - Number(b.libro_precio)
    );
  } else if (orderBy === "libro_precio_DESC") {
    sortedBooks.sort(
      (a, b) => Number(b.libro_precio) - Number(a.libro_precio)
    );
  }

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
      <div style={{ marginBottom: "20px" }}>
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
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
        <RenderBooks books={sortedBooks} />
      </div>
    </div>
  );
}

export default Gallery;