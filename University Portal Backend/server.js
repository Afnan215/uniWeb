//** set up node server and modeules  , author: Afnan ansari */

const express = require("express");

const path = require("path");

const moment = require("moment");

const router = require("../University Portal Backend/src/admin/backend_routes/routes");

const dbConnect = require("./src/libs/dbconnection");

// setting up express //*
const app = express();

const cors = require('cors')

app.use(cors())

const mongoose = require("mongoose");

// app.use(express.static(path.join(__dirname,'/uploads')));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(router);

app.set("views", path.join(__dirname, "src/admin/views"));

app.set("view engine", "hbs");

app.use(express.static("images"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    "Log",
    `🌏 Express server started at ${port} || ${moment().format(
      "YYYY-MM-DDTHH:mm:ss"
    )}`
  );
});
