//, useEffect, useState Falta agregar posibles useState
import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';

const CartContext = createContext();

const CartProvider = ({ children }) => {
const [cart, setCart] = useState([]); // usamos el useState acá parap amnejar el estado del carrito
const [total, setTotal] = useState(0);

useEffect(() => { //aquí para que recalcule cada que cambie el carrito
    const nuevoTotal = cart.reduce((acumulador, item) => acumulador + (item.price * item.count), 0);
    setTotal(nuevoTotal);
  }, [cart]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);
      
      if (existingBook) {
        // Si ya existe, recorremos el carrito y le sumamos 1 a la cantidad (count)
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        // Si no existe, lo agregamos al final del arreglo con count inicial de 1
        return [...prevCart, { ...book, count: 1 }];
      }
    });
  };

  const increase = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      ).filter((item) => item.count > 0) // aqupi también manejamos la eliminación si el num es menor a 0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, increase, decrease, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export { CartContext };