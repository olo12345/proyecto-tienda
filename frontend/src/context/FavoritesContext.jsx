//, useEffect, useState Falta agregar posibles useState
import { createContext } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';

export const FavoritesContext = createContext;

export const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useLocalStorage('Favorites', []);

    const addToFavorites = (product) => {
        setFavorites((prev) => [...prev, product]);
    };

    const removeFavorite = (productId) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId))
    }

    const clearFavorites = () => setFavorites([]);

    const isFavorite = (productId) => {
        //en la clase decía !== pero según la documentación debería ser el producto que satisfaga itemId === productId para indicar que se encuentra en el array
        return favorites.some((item) => item.id === productId)
    }

    const totalFavorites = favorites.reduce((acc, item) => acc + item ? 1 : 0, 0);

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