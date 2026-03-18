//, useEffect, useState Falta agregar posibles useState
import { createContext } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart, clearCart] = useLocalStorage('cart', []);

  const addToCart = (product) => {
    //temporal por ajuste de api
    //product = {...product, quantity: 1}
    const bookToAdd = {
      ...product,
      libro_id: product.libro_id || product.id, // Compatibilidad si el objeto trae id o libro_id
      libro_precio: product.libro_precio || product.price,
      cantidad: 1
  };

    setCart((prev) => {
      const exists = prev.find((item) => item.libro_id === bookToAdd.libro_id);

      if (exists) {
        return prev.map((item) => item.libro_id === bookToAdd.libro_id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
        )
      }

      return [...prev, boookToAdd]
    })

  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => (item.libro_id || item.id) !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    setCart((prev) => prev.map((item) => (item.libro_id || item.id) === productId
    ? { ...item, cantidad: Math.max(1, newQuantity) }
      : item,
    ),
    );
  };

  // const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.cantidad * (item.libro_precio || 0)), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export { CartContext }