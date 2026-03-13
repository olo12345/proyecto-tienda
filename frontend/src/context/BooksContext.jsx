import { createContext, useEffect, useEffectEvent } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';
//Uso de api
import { getProduct, getProducts, createProduct, deleteProduct, updateProduct } from "./../services/products";

const BooksContext = createContext()

const BooksProvider = ({ children }) => {
    const [books, setBooks] = useLocalStorage('books', []);
    const [book, setBook, clearBook] = useLocalStorage('book', {});

    const fetchBooks = async () => {
        return getProducts()
            .then(res => {
                const tempBooks = res.data.map((book) =>
                (
                    {
                        //se medio rompe porque la api se reinicia a veces y devuelve el producto inicializado.
                        ...book,
                        //Se ajusta por uso de api, no es necesario cuando haya backend
                        stock: book.installments,
                        category: book.style,
                        sizeList: book.sizeList.some(value => value instanceof Object)
                            ? book.sizeList
                            : [] // Si sizeList no es un array de objetos, se asigna un array vacío para evitar errores
                    })
                )
                // console.log("La función fetchBooks devuelve:", Fes.data)
                setBooks(tempBooks)
                console.log(tempBooks)
                return { ...res, data: tempBooks };
            })
            .catch(e => console.error("Ocurrió un error llamando libros desde la api", e));
    }

    const addBook = (product) => {
        //temporal por ajuste de api
        createProduct(product)
            .then((res) => {
                setBooks();
                return res;
            })
    }

    const updateBook = async (product) => {
        //temporal por ajuste de api
        return updateProduct(product.id, { ...product, installments: product.stock, style: product.category })
            .then((res) => {
                fetchBooks();
                return res;
                // return new Promise(resolve => resolve(res));
            })
    }

    const updateUpdateBook = useEffectEvent((product) => updateBook(product));

    //Cuando esté el backend para entregar la lista de destacados
    const getBooksByRating = () => {

    }

    const fetchBookByID = async (productId) => {
        //se medio rompe porque la api se reinicia a veces y devuelve el producto inicializado.
        return getProduct(productId)
            .then((res) => {
                res.data = { ...res.data, stock: res.data.installments, category: res.data.style }
                setBook({ ...res.data, stock: res.data.installments, category: res.data.style });
                return res;
            })
    }


    const removeBook = (productId) => {
        deleteProduct(productId)
            .then(() =>
                setBooks())
            .catch(
                console.log("Error al eliminar el libro"));
    };

    const updateFetchBooks = useEffectEvent(() => {
        return fetchBooks();
    })

    useEffect(() => {
        updateFetchBooks().then((res) => {
            // const initializedBooks = !res.data.some(book => book.sizeList.some(value => value instanceof Object))
            res.data.forEach(book => {
                if (!(book.sizeList instanceof Object)) {
                    updateUpdateBook({ ...book, sizeList: [] })
                        .then((res) => console.log("Libro actualizado para adaptación de api", res.data))
                }
            })
        })
    }, [setBook])

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