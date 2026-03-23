const logger = (req, res, next) => {
    console.log(`Método de consulta: ${req.method}, URL Consultada: ${req.originalUrl}`)
    next()
}

export default logger;