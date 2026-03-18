import { useState, useEffect } from "react";
import { CardBook } from "./CardBook";
import { getProducts } from "./../../services/products";
import FilterBar from "./FilterBar"; // importamos la barra de filtros

const RenderBooks = (param) => {
  const { books } = param;
  return books.length
    ? books.map((book) => (
        <CardBook
          title={book.title}
          id={book.id}
          price={book.price}
          img={book.img}
          key={new Date().getTime() + book.id} // tu forma original
          rating={book.rating}
        />
      ))
    : <div>"Cargando galería"</div>;
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
      .then((res) => {
        const tempBooks = res.data.map((book) => ({
          ...book,
          stock: book.installments,
          category: book.style,
          rating: Math.floor(Math.random() * 5)
        }));
        setBooks(tempBooks);
      })
      .catch((error) =>
        console.log("Ocurrió un error al obtener los libros", error)
      );
  };

  useEffect(() => {
    getBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    return (
      (filter.author === "" || book.author?.toLowerCase().includes(filter.author.toLowerCase())) &&
      (filter.category === "" || book.category?.toLowerCase().includes(filter.category.toLowerCase())) &&
      (filter.minPrice === "" || book.price >= Number(filter.minPrice)) &&
      (filter.maxPrice === "" || book.price <= Number(filter.maxPrice))
    );
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