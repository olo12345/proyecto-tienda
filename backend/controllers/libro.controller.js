import {
    getAllItemsModel,
    getItemsModel,
    getItemModel,
    getItemsFilterModel,
    createItemModel,
    editItemModel,
    addComentarioModel,
    getBooksByCommentsModel,
    deleteItemModel,
} from "./../models/libro.model.js";

const getAllItems = async (_, res) => {
    try {
        const libros = await getAllItemsModel({});
        // const librosHateoas = await _HATEOAS("libros", libros);
        res.status(200).json({ result: libros });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

const getItems = async (req, res) => {
    try {
        // const { limits, order_by, page } = req.query
        const libros = await getItemsModel(req.query);
        console.log("getItems", libros);
        // const librosPage = pagination ({data: libros, items:limits, page});
        // console.log("librosPage", librosPage);
        res.status(200).json(libros);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('getItem', id)
        const libro = await getItemModel(id);
        console.log({libro});
        if (!libro) {
            return res.status(404).json({ message: "Libro not found" });
        }
        res.json(libro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener el libro" });
    }
};

const getItemsFilter = async (req, res) => {
    try {
        const librosFilter = await getItemsFilterModel(req.query);
        res.status(200).json(librosFilter[0])
    } catch (error) {
        console.error(error);
        if (error.code == 42703) {
            res.status(400).json({ error: "Valor de filtro no admitido" });
            return;
        }
        res.status(500).json(error);
    }
}

const createItem = async (req, res) => {
    try {
        console.log("Creando el libro en controller", req.body);
        const { libro_titulo, libro_autor, libro_precio, libro_stock, libro_categorias, libro_descripcion, libro_imagen, libro_fecha_publicacion } = req.body;
        const newLibro = await createItemModel({ libro_titulo, libro_autor, libro_precio, libro_stock, libro_categorias, libro_descripcion, libro_imagen, libro_fecha_publicacion })
        console.log("Libro creado correctamente", newLibro)
        res.status(201).json(newLibro);

    } catch (error) {
        console.error("ERROR EN POSTGRESQL:", error.message, error.detail);
        res.status(500).json({ error: error });
    }
}

const editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { libro_titulo, libro_autor, libro_precio, libro_stock, libro_categorias, libro_descripcion, libro_imagen, libro_fecha_publicacion } = req.body;
        const updatedLibro = await editItemModel(id, { libro_titulo, libro_autor, libro_precio, libro_stock, libro_categorias, libro_descripcion, libro_imagen, libro_fecha_publicacion })
        res.status(200).json(updatedLibro);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al realizar la edición", error: error });
    }
}

const addComentario = async (req, res) => {
    try {
        const { id: libroId } = req.params;
        console.log("addComentario", req.body)
        const { comentario, calificacion, usuario_id } = req.body;
        const nuevoComentario = await addComentarioModel({ libroId, comentario, calificacion, usuario_id })
        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getBooksByComments = async (req, res) => {
    try {
        const libros = await getBooksByCommentsModel();
        res.status(200).json(libros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("deleteItem", id)
        if (id) deleteItemModel(id);
        res.send(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensage: "Error al eliminar el libro", error: error });
    }
}

export {
    getItem,
    getAllItems,
    getItems,
    getItemsFilter,
    createItem,
    editItem,
    addComentario,
    getBooksByComments,
    deleteItem,
}

// export const libroController = {
//   readLibros,
//   readLibro,
// };
