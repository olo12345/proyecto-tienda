import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      
      <h2>Proyecto Tienda</h2>

      {user ? (
        <>
          <span>Bienvenido {user.name}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <span>No has iniciado sesión</span>
      )}

    </nav>
  );
}

export default Navbar;