export const verificarLogin = (req, res, next) => {
    const { email = "", password = "" } = req.body;
    if (!email.trim() || !password.trim()) {
        return res.status(400).json({ error: "Email and password son requeridos" });
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({ error: "la contraseña debe ser de al menos 6 caratctéres" });
    }
    req.user = { email, password };
    next();
};