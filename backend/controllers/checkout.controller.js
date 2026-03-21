import { createOrderModel, getCartModel, updateCartModel, deleteItemModel } from "../models/checkout.model.js";

const createOrder = async (req, res) => {
    try {
        const { id: userId } = req.user; // Sacamos el ID del token que teniamos antes
        const cart = req.body;

        // Validamos que el carrito no venga vacío
        if (!cart || cart.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío" });
        }

        const numeroOrden = await createOrderModel(userId, cart);

        return res.status(201).json({
            message: "Checkout successful",
            orden_id: numeroOrden,
            cart: cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al procesar la compra" });
    }
};

const getCart = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const cart = getCartModel(userId);
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al procesar la compra" });
    }
}

const updateCart = async (req, res) => {
    try {
        const { id: usuario_id } = req.user;
        const { libro_id, libro_cantidad, libro_stock } = req.body
        if (libro_cantidad <= libro_stock) {
            updateCartModel({ usuario_id, libro_id, libro_cantidad });
            res.status(200).json({ message: "Se modificó el carrito correctamente" });
        }
        else {
            res.status(400).json({ message: "El número de libros supera el stock disponible" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al modificar el carrito de compras" });
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id: libro_id} = req.params
        const { id: usuario_id } = req.user;
        res.send(req);
        deleteItem(usuario_id, libro_id);
        res.status(200).json({ message: "Se eliminó el libro correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al eliminar el carrito de compras" });
    }
}

export {
    createOrder,
    getCart,
    updateCart,
    deleteItem
};