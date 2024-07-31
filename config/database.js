require("dotenv").config();
const mongoose = require("mongoose");

function dbConnect() {
    mongoose.connect(process.env.DATABASE_URL, {})
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.error("Error in database connection");
            console.error(err);
        });
}

module.exports = dbConnect;
