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

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al procesar la compra" })
    }
}

const updateCart = async (req, res) => {
    try {

    } catch (error) {

    }
}

const deleteItem = async (req, res) => {

}

export {

};