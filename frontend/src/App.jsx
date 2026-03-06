import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Gallery from "./pages/Gallery/Gallery"
import CreatePost from "./pages/CreatePost"
import PostDetail from "./pages/PostDetail"
import CartProvider from "./context/CartContext"
import FavoritesProvider from "./context/FavoritesContext"


function App() {
  return (
    <>
        <CartProvider>
          <FavoritesProvider>

            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </FavoritesProvider>
        </CartProvider>
    </>
  )
}

export default App