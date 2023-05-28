const mongoose = require('mongoose')

const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a la BD")
    })
    .catch((err) => {
        console.log("No se ha podido establecer la conexión a la BD:", err)
    });
}

module.exports = dbConnect
