import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{display:"flex", gap:"15px", padding:"10px", borderBottom:"1px solid #ccc"}}>

      <Link to="/">Proyecto Tienda</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </>
      )}

      {user && (
        <>
          <span>Bienvenido {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}

    </nav>
  );
}

export default Navbar;