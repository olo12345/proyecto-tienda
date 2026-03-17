import { libroModel } from "../models/libro.model.js";

const readLibros = async (req, res) => {
    try {
  const libros = await libroModel.getLibros();
  res.json(libros);
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el catálogo de libros" });
  }
};

const readLibro = async (req, res) => {
    try {
  const { id } = req.params;
  const libro = await libroModel.getLibro(id.toLowerCase()); // no sé si el ide será numérico o string
  if (!libro) {
    return res.status(404).json({ message: "Libro not found" });
  }
  res.json(libro);
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el libro" });
  }
};

export const libroController = {
  readLibros,
  readLibro,
};
