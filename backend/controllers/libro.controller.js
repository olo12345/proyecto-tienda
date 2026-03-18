// import { libroModel } from "../models/libro.model.js";
import { getAllItemsModel, getItemsModel, getItemModel, getItemsFilterModel } from "./../models/libro.model.js";
// const readLibros = async (req, res) => {
//     try {
//   const libros = await libroModel.getLibros();
//   res.json(libros);
// } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Error al obtener el catálogo de libros" });
//   }
// };


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
        const { limits, order_by, page } = req.query
        const libros = await getItemsModel({ limits, page, order_by });

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
        const libro = await getItemModel(id);
        console.log("se encontró el libro con ID", id, libro)
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
        res.status(200).json(librosFilter)
    } catch (error) {
        if (error.code == 42703) {
            res.status(400).json({ error: "Valor de filtro no admitido" });
            return;
        }
        res.status(500).json(error);
    }
}

const createItem = async (req, res) => {
    try {
        const { titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion } = req.body;
        const newLibro = await createItemModel({ titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion })
        res.status(201).json(newLibro);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion } = req.body;
        const updatedLibro = await editItemModel(id, { titulo, autor, precio, stock, categorias, descripcion, imagen_url, libro_fecha_publicacion })
        res.status(200).json(updatedLibro);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export {
    getItem, getAllItems, getItems, getItemsFilter, createItem
}

// export const libroController = {
//   readLibros,
//   readLibro,
// };
