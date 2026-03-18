import { useState, useEffect } from "react";
import { CardBook } from "./CardBook";
import { getProducts } from "./../../services/products";
import FilterBar from "./FilterBar"; // importamos la barra de filtros

const RenderBooks = ({ books }) => {
  // const { books } = param;
  if (!books.length) return <div style={{ color: "var(--text-muted)", textAlign: "center", width: "100%" }}>Cargando galería...</div>;
    return books.map((book) => (
        <CardBook
        key={book.libro_id} // Usamos el ID real de la DB para estabilidad
        id={book.libro_id}
        title={book.libro_titulo}
        price={book.libro_precio}
        img={book.libro_imagen}
        rating={book.calificacion || 0} // Usamos la calificación calculada por el backend
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

  const getBooks = () => {
    getProducts()
      .then((data) => {
        // const tempBooks = res.data.map((book) => ({
        //   ...book,
        //   stock: book.installments,
        //   category: book.style,
        //   rating: Math.floor(Math.random() * 5)
        setBooks(data);
        })
      .catch((error) =>
        console.log("Ocurrió un error al obtener los libros", error)
      );
  };

  useEffect(() => {
    getBooks();
  }, []);

// Filtramos usando los nombres de columna de PostgreSQL
const filteredBooks = books.filter((book) => {
  const matchesAuthor = filter.author === "" || 
    (book.libro_autor && book.libro_autor.toLowerCase().includes(filter.author.toLowerCase()));
  
  const matchesCategory = filter.category === "" || 
    (book.libro_categorias && book.libro_categorias.toLowerCase().includes(filter.category.toLowerCase()));
  
  const matchesMinPrice = filter.minPrice === "" || 
    Number(book.libro_precio) >= Number(filter.minPrice);
  
  const matchesMaxPrice = filter.maxPrice === "" || 
    Number(book.libro_precio) <= Number(filter.maxPrice);

  return matchesAuthor && matchesCategory && matchesMinPrice && matchesMaxPrice;
});

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "transparent", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "var(--accent-cyan)", letterSpacing: "2px", fontSize: "2.5rem", textShadow: "0 2px 10px rgba(0,229,255,0.3)" }}>
        Tienda
      </h1>

      {/* Barra de filtros */}
      <FilterBar filter={filter} setFilter={setFilter} />

      {/* Tarjetas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <RenderBooks books={filteredBooks} />
      </div>
    </div>
  );
}

export default Gallery;