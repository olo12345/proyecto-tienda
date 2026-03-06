import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

function Login() {

  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(email, password)

    if (result.success) {
      navigate("/")
    } else {
      alert(result.error)
    }
  }

  return (
    <div>

      <h1>Inicio de sesión</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Iniciar sesión
        </button>

      </form>

    </div>
  )
}

export default Login