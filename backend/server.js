const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const donenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})
/**Package routes */
const packageRouter = require('./routes/packages');
app.use('/packages',packageRouter);

/**Notes routes */
const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);


app.listen(5001, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})