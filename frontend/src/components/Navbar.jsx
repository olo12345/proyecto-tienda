import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{
      padding: "12px",
      background: "#f2f2f2",
      display: "flex",
      gap: "15px"
    }}>
      <Link to="/">Inicio</Link>
      <Link to="/register">Registro</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile">Perfil</Link>
      <Link to="/gallery">Galería</Link>
      <Link to="/create">Crear Publicación</Link>
    </nav>
  )
}

export default Navbar