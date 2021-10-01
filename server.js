const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const Grid = require("gridfs-stream");

require("dotenv").config();

//image uploading

var fs = require('fs');
var path = require('path');



app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Set EJS as templating engine
app.set("view engine", "ejs");



let gfs;

//end

const empRoutes = require("./controller/employeeController");

const port = 4000;

const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

app.use("/api", empRoutes);

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindandModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection("photos");
})


app.get("/file/:filename", async (req, res) => {
    console.log("get file ");
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

//Vehicle_Routes
const vehicleRouter = require("./controller/vehicleController.js");
app.use("/vehicle", vehicleRouter);

const vehicleRemoveRouter = require("./controller/removeVehicleController.js");
app.use("/vehicleRemove", vehicleRemoveRouter);


app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});

//hasani
const rentalRouter = require("./controller/rentalController.js");
app.use("/rental", rentalRouter);//table name is created at this point

const deletedRentalsRouter = require("./controller/removedRentalController.js");
app.use("/deletedRentals", deletedRentalsRouter);


const reservationController = require("./controller/reservationController.js");
app.use("/reservations", reservationController);

const deletedReservationRouter = require("./controller/removedReservationController.js");
app.use("/deletedReservations", deletedReservationRouter);

const loginRouter = require("./controller/login.js");
app.use("/login", loginRouter);

const uploadRouter = require("./controller/uploadController.js");
app.use("/upload", uploadRouter);

