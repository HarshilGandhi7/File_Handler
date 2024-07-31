const mongoose=require("mongoose");
// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

require("dotenv").config();

function cloudConnect(){
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET,
    })
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary connected successfully");
    } catch (err) {
        console.error("Error in Cloudinary connection");
        console.error(err);
    }
}

module.exports=cloudConnect;