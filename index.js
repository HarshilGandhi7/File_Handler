require("dotenv").config();
const express=require("express");
const app=express();


const PORT=process.env.PORT||4000;

//middlewares->manage transfer between clients and server
app.use(express.json());

const fileUpload=require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const Routes=require("./routes/Routes");
app.use("/api/v1/",Routes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

//connect Database to server
const dbConnect=require("./config/database");
dbConnect();

const cloudConnect=require("./config/cloudinary");
cloudConnect();

app.get("/",(req,res)=>{
    res.send("Welcome to My Website");
})



