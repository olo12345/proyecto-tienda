//, useEffect, useState Falta agregar posibles useState
import { createContext } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useLocalStorage('cart', []);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id)
            if (exists) {
                return prev.map((item) => item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item)
            }
        }
        )
    }

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        setCart((prev) => prev.map((item) => item.id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        ),
        );
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);


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