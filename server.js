const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config({ path: "./.env"});
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
    .then((con) => {
        console.log(`connected to database: ${mongoURL}`);
    }).catch((error) => {
        console.error("Error to connect to database");
        console.error(error);
    });

const PORT = process.env.PORT || 3200;
app.listen(PORT, () =>{
    console.log(`the server is running on port ${PORT}`);
})
