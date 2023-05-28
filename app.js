const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpecs = require("./docs/swagger");


const dbConnect = require("./config/db");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;

app.use("/api", require("./routes/")); 

app.listen(PORT, () => {
  console.log("Server corriendo en el puerto " + PORT);
});

dbConnect();

module.exports = app;