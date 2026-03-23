import { Routes, Route } from "react-router-dom"

import CartProvider from "./context/CartContext"
import FavoritesProvider from "./context/FavoritesContext"
import BooksProvider from "./context/BooksContext"

import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'

import { ProtectedRoute } from './guards/ProtectedRoute'
import { AdminRoute } from './guards/AdminRoute'

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Gallery from "./pages/Gallery/Gallery"
import CreatePost from "./pages/admin/CreatePost"
import BookDetails from "./pages/BookDetails"
import NotFound from "./pages/NotFound"
import Cart from "./pages/Cart/Cart"
import ProductList from "./pages/admin/ProductList"
import AuthProvider from "./context/AuthContext"


function App() {
  return (
    <>
    <AuthProvider>
      <BooksProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              {/* Layout público para usuarios no intregados */}
              <Route element={<PublicLayout />}>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/store"
                  element={<Gallery />}
                />
                <Route
                  path="store/book/:id"
                  element={<BookDetails />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/register"
                  element={<Register />}
                />
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Route>

              {/* Layout de usuarios registrados (protegido) */}
              <Route element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/store"
                  element={<Gallery />}
                />
                <Route
                  path="store/book/:id"
                  element={<BookDetails />}
                />
                <Route
                  path="/cart"
                  element={<Cart />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Route>

              {/* Layout para administradores (protegido) */}
              <Route element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
                <Route
                  path="/admin/store"
                  element={<ProductList />}
                />
                <Route
                  path="/admin/store/books/new"
                  element={<CreatePost />}
                />
                <Route
                  path="/admin/store/edit/:id"
                  element={<CreatePost />}
                />
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Route>
              {/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} /> */}
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </BooksProvider>
    </AuthProvider>
    </>
  )
}

export default App