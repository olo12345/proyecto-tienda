import { createContext, useEffect, useEffectEvent } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';
//Uso de api
import { getProduct, getProducts, createProduct, deleteProduct, updateProduct } from "./../services/products";

const BooksContext = createContext()

const BooksProvider = ({ children }) => {
    const [books, setBooks] = useLocalStorage('books', []);
    const [book, _, clearBook] = useLocalStorage('book', {});

    const fetchBooks = async (params) => {
        return getProducts(params)
            .then(data => {
                setBooks(data);

                //todfa esta parte ya no será necesaria
                // const tempBooks = res.data.map((book) =>
                // (
                //     {
                //         //se medio rompe porque la api se reinicia a veces y devuelve el producto inicializado.
                //         ...book,
                //         //Se ajusta por uso de api, no es necesario cuando haya backend
                //         stock: book.installments,
                //         category: book.style,
                //         sizeList: book.sizeList.some(value => value instanceof Object)
                //             ? book.sizeList
                //             : [] // Si sizeList no es un array de objetos, se asigna un array vacío para evitar errores
                //     })
                // )
                // // console.log("La función fetchBooks devuelve:", Fes.data)
                // setBooks(tempBooks)
                // console.log(tempBooks)
                return data;
            })
            .catch(e => console.error("Ocurrió un error llamando libros desde el back", e));
    }

    const addBook = (product) => {
        //temporal por ajuste de api
        return createProduct(product)
            .then((newBook) => {
                fetchBooks();
                //setBooks();
                return newBook;
            })
    }

    const updateBook = async (id, product) => {
        //temporal por ajuste de api
        return updateProduct(id, product)
            .then((updatedBook) => {
                fetchBooks();
                return updatedBook;
                // return new Promise(resolve => resolve(res));
            })
    }

    // const updateUpdateBook = useEffectEvent((product) => updateBook(product));

    //Cuando esté el backend para entregar la lista de destacados
    // const getBooksByRating = () => {
    // }

    const fetchBookByID = async (productId) => {
        return getProduct(productId)
            .then((data) => {
                // setBook(data);
                return data;
            })
    }


    const removeBook = (productId) => {
        return deleteProduct(productId)
            .then(() => {
                fetchBooks();
    })
    .catch(() => console.log("Ocurrió un error eliminando el libro desde el back"));
};

    const updateFetchBooks = useEffectEvent(() => {
        return fetchBooks();
    })

    const getBooksByRating = () => {
        // Lógica para filtrar por calificacion en el front o llamar endpoint
        return [...books].sort((a, b) => b.calificacion - a.calificacion);
    }

    useEffect(() => {
        updateFetchBooks();
    }, []);

    return (
        <BooksContext.Provider
            value={{
                book,
                books,
                addBook,
                updateBook,
                getBooksByRating,
                fetchBookByID,
                removeBook,
                clearBook

            }}>
            {children}
        </BooksContext.Provider>
    )
}

export default BooksProvider;

export { BooksContext };