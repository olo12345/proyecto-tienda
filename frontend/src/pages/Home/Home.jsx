import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // fake libros (los colocaremos con el fetch real luego)
  useEffect(() => {
    const data = [
      { id: 1, title: "Libro 1", price: 25000, rating: 4, img: "url_1" },
      { id: 2, title: "Libro 2", price: 15000, rating: 4, img: "url_2" },
      { id: 3, title: "Libro 3", price: 32000, rating: 5, img: "url_3" },
    ];
    setBooks(data);
  }, []);

  // Parte del filtro por calificación
  const featuredBooks = books.filter(book => book.rating === 5);

  return (
    <main style={{ backgroundColor: "transparent", minHeight: "100vh" }}>
      
      {/* Parte central "Hero section" */}
      <section style={{ 
        textAlign: "center", 
        padding: "80px 20px", 
        backgroundColor: "transparent" /* Totalmente transparente para ver las estrellas */
      }}>
        <div style={{ 
          border: "1px solid rgba(0, 229, 255, 0.3)", 
          padding: "60px 40px", 
          maxWidth: "800px", 
          margin: "0 auto",
          borderRadius: "8px",
          backgroundColor: "rgba(11, 12, 16, 0.7)", /* Negro espacial con 70% de opacidad */
          backdropFilter: "blur(8px)", /* Efecto cristal */
          boxShadow: "0 0 30px rgba(0, 229, 255, 0.15)"
        }}>
          <h1 className="title-outline" style={{ fontSize: "3.5rem", marginBottom: "30px", margin: "0 0 30px 0" }}>
            The Passenger Books
          </h1>
          <button 
            onClick={() => navigate("/store")}
            style={{ 
              padding: "15px 40px", 
              fontSize: "1.2rem", 
              backgroundColor: "var(--accent-cyan)", 
              color: "var(--bg-space)", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)"
            }}
          >
            Compra Ahora
          </button>
        </div>
      </section>

      {/* Destacados */}
      <section style={{ padding: "60px 20px", backgroundColor: "transparent" }}>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "40px", 
          color: "var(--text-light)", 
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          fontSize: "2.5rem" 
        }}>
          Productos Destacados
        </h2>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
          {featuredBooks.map(book => (
            <div 
              key={book.id} 
              onClick={() => navigate(`/store/book/${book.id}`)} 
              style={{ 
                width: "220px", 
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                backgroundColor: "rgba(20, 22, 31, 0.75)", /* Color de tarjeta semitransparente */
                backdropFilter: "blur(5px)", /* Efecto cristal para las tarjetas */
                padding: "15px", 
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-cyan)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ 
                background: "rgba(0,0,0,0.4)", /* Fondo más oscuro para simular el recuadro de la foto */
                height: "180px", 
                marginBottom: "15px", 
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                Foto
              </div>
              <h4 style={{ color: "var(--text-light)", margin: "0 0 10px 0", fontSize: "1.1rem" }}>{book.title}</h4>
              <p style={{ color: "var(--accent-gold)", fontWeight: "bold", margin: "0 0 10px 0", fontSize: "1.2rem" }}>
                ${book.price.toLocaleString("es-CL")}
              </p>
              <p style={{ margin: 0 }}>{"⭐".repeat(book.rating)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section style={{ 
        padding: "80px 20px", 
        textAlign: "center", 
        backgroundColor: "rgba(11, 12, 16, 0.8)", /* Fondo oscuro semitransparente que unifica la sección */
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(0, 229, 255, 0.1)",
        borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
        marginTop: "40px"
      }}>
        <h3 style={{ 
          color: "var(--accent-cyan)", 
          marginBottom: "30px", 
          letterSpacing: "1px",
          fontSize: "2.2rem" 
        }}>
          Sobre Nosotros
        </h3>
        <p style={{ 
          maxWidth: "800px", 
          margin: "0 auto", 
          color: "var(--text-light)", 
          fontSize: "1.1rem", 
          lineHeight: "1.8",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)" /* Sombra en el texto para asegurar legibilidad */
        }}>
        Nuestro Viaje En The Passenger Books, creemos que cada historia merece una segunda vida. Somos un mercado impulsado por la comunidad, creado para conectar a lectores de todo el país. Ya sea que estés buscando un hallazgo único o dándole un nuevo hogar a un clásico querido, nuestra misión es hacer que el viaje de cada libro sea tan fluido como su primera página.
        </p>
      </section>

    </main>
  );
}

export default Home;