import { createContext, useEffect, useEffectEvent, useCallback } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';
//Uso de api
import { getProduct, getProducts, createProduct, deleteProduct, updateProduct, getProductsByRating } from "./../services/products";

const BooksContext = createContext()

const BooksProvider = ({ children }) => {
    const [books, setBooks] = useLocalStorage('books', []);
    const [highlights, setHighlights] = useLocalStorage('books', []);
    const [book, setBook] = useLocalStorage('book', {});

    const fetchBooks = async (params) => {
        return getProducts(params)
            .then(data => {
                setBooks(data);
                return data;
            })
            .catch(e => console.error("Ocurrió un error llamando libros desde el back", e));
    }
    const getHighlights = async () => {
        // Lógica para filtrar por calificacion en el front o llamar endpoint
        return getProductsByRating()
            .then(data => {
                setHighlights(data);
                return data;
            })
            .catch(e => console.error("Ocurrió un error llamando libros desde el back", e))
    }

    const addBook = async (product) => {
        return createProduct(product)
            .then((newBook) => {
                fetchBooks();
                //setBooks();
                return newBook;
            })
    }

    const updateBook = async (id, product) => {
        return updateProduct(id, product)
            .then((updatedBook) => {
                fetchBooks();
                return updatedBook;
            })
    }

    const fetchBookById = useCallback(async (productId) => {
        return getProduct(productId)
            .then((data) => {
                console.log('fetchBookById',data);
                setBook(data);
                return data;
            })
    }
        , [setBook])

    const removeBook = async (productId) => {
        return deleteProduct(productId)
            .then(() => {
                console.log("removeBook", productId)
                fetchBooks();
            })
            .catch(() => console.log("Ocurrió un error eliminando el libro desde el back"));
    };

    const updateFetchBooks = useEffectEvent(() => {
        return fetchBooks();
    });
    const updateGetHighlights = useEffectEvent(() => {
        return getHighlights();
    })

    useEffect(() => {
        updateFetchBooks();
        updateGetHighlights();
    }, []);

    return (
        <BooksContext.Provider
            value={{
                book,
                fetchBooks,
                books,
                addBook,
                updateBook,
                highlights,
                fetchBookById,
                removeBook,
            }}>
            {children}
        </BooksContext.Provider>
    )
}
export default BooksProvider;

export { BooksContext };