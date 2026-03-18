//, useEffect, useState Falta agregar posibles useState
import { createContext } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useLocalStorage('Favorites', []);

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            const productId = product.libro_id || product.id;
            // Evitamos duplicados en la lista de favoritos
            const exists = prev.some((item) => (item.libro_id || item.id) === productId);
            
            if (exists) return prev; 
            return [...prev, product];
        });
    };

    const removeFavorite = (productId) => {
        setFavorites((prev) => prev.filter((item) => (item.libro_id || item.id) !== productId))
    }

    const clearFavorites = () => setFavorites([]);

    const isFavorite = (productId) => {
        //en la clase decía !== pero según la documentación debería ser el producto que satisfaga itemId === productId para indicar que se encuentra en el array
        return favorites.some((item) => (item.libro_id || item.id) === productId);
    }

    const totalFavorites = favorites.length;
    
    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFavorite,
                clearFavorites,
                isFavorite,
                totalFavorites,
            }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesProvider

export { FavoritesContext }