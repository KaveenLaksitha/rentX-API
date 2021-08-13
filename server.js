const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const empRoutes = require("./controller/employeeController");

const port = 4000;

const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", empRoutes);

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopologyL: true,
    useFindandModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});