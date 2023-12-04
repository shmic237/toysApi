const express = require("express");
const cors = require("cors");
const path = require("path");

const toyRoutes = require("./routes/toys.routes"); 
const userRoutes = require("./routes/user.routes"); 

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")))

app.use('/api/v1/toys', toyRoutes);
app.use('/api/v1/users', userRoutes);

app.get("*", () => {})

app.use((error, req, res, next) => {
    console.log(" error from the app-->>>>", error);
    return res.status(400).send({msg: error.message});
} );


module.exports.app = app;


