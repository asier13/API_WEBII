const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === 'Mi_API_key_secreta') {
            next()
        } else {
            res.status(403).send("La API key no es correcta")
        }
    } catch(err) {
        res.status(403).send(err)
    }
}

module.exports = customHeader
