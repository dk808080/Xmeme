const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const memeRoutes = require("./routes/meme");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Xmeme API",
      description: "Xmeme API information",
      contact: {
        name: "Dimpal Kataniya",
      },
      servers: ["https://xmeme-app-server.herokuapp.com/"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.use("/", memeRoutes);

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 8081;

const CONNECTION_URL=process.env.MONGOURI;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
