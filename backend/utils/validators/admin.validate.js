const isAdmin = (req, res, next) => {
    const user = req.user;

    // Validamos que exista el usuario, que tenga un rol y que sea exactamente 'admin'
    if (user && user.rol === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Acceso denegado: Se requiere rol de administrador." });
    }
};
export default isAdmin;