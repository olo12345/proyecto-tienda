import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // fake libros (los colocaremos con el fetch real luego)
  useEffect(() => {
    const data = [
      { id: 1, title: "Libro 1", price: 15000, rating: 4, img: "url_1" },
      { id: 2, title: "Libro 2", price: 23000, rating: 4, img: "url_2" },
      { id: 3, title: "Libro 3", price: 9990, rating: 5, img: "url_3" },
    ];
    setBooks(data);
  }, []);

  // Parte del filtro por calificación
  const featuredBooks = books.filter(book => book.rating === 5);

  return (
    <main>
      {/* Parte central "Hero section" */}
      <section style={{ textAlign: "center", padding: "50px", background: "#f5f5f5" }}>
        <div style={{ border: "1px solid #ccc", padding: "40px" }}>
        <h1>The Passenger Books</h1>
        <button onClick={() => navigate("/Store")}>Compra Ahora</button>
        </div>
      </section>

      {/* Destacados */}
      <section style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Productos Destacados</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {featuredBooks.map(book => (
            <div key={book.id} style={{ width: "200px", border: "1px solid #eee", padding: "10px" }}>
              <div style={{ background: "#ddd", height: "150px", marginBottom: "10px" }}>Foto</div>
              <h4>{book.title}</h4>
              <p>${book.price}</p>
              <p>{"⭐".repeat(book.rating)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section style={{ padding: "40px", textAlign: "center", background: "#f9f9f9" }}>
        <h3>Sobre Nosotros</h3>
        <p style={{ maxWidth: "800px", margin: "0 auto" }}>
        Nuestro Viaje En The Passenger Books, creemos que cada historia merece una segunda vida. Somos un mercado impulsado por la comunidad, creado para conectar a lectores de todo el país. Ya sea que estés buscando un hallazgo único o dándole un nuevo hogar a un clásico querido, nuestra misión es hacer que el viaje de cada libro sea tan fluido como su primera página.
        </p>
      </section>

      {/* El footer no olvidar */}
    </main>
  );
}

export default Home;