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

const getItem = async (req, res) => {
    try {
  const { id } = req.params;
  const libro = await getItemModel(id);
  console.log ("se encontró el libro con ID", id , libro)
  if (!libro) {
    return res.status(404).json({ message: "Libro not found" });
  }
  res.json(libro);
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el libro" });
  }
};

const getAllItemsHateoas = async (_, res) => {
    try {
        const joyas = await getAllItemsModel({});
        const joyasHateoas = await _HATEOAS("joyas", joyas);
        res.status(200).json({ result: joyasHateoas });
    }
    catch (error) {
        res.status(500).json({error: error});
    }
}

const getItemsHateoas = async (req, res) => {
    try {
        const {limits, order_by, page} = req.query
        const joyas = await getItemsModel({limits, page, order_by});

        // const joyasPage = pagination ({data: joyas, items:limits, page});
        // console.log("joyasPage", joyasPage);
        const joyasHateoas = await _HATEOAS("joyas", joyas);
        res.status(200).json(joyasHateoas);
    }
    catch (error) {
        res.status(500).json({error: error});
    }
}

const getItemsFilter = async (req, res) => {
    try {
        const joyasFilter = await getItemsFilterModel(req.query);
        res.status(200).json(joyasFilter)
    } catch (error) {
        if (error.code == 42703) {
            res.status(400).json({error: "Valor de filtro no admitido"});
            return;
        }
        res.status(500).json(error);
    }
}

export {
  getItem, getAllItemsHateoas, getItemsHateoas, getItemsFilter
}

// export const libroController = {
//   readLibros,
//   readLibro,
// };
