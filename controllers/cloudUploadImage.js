const mongoose=require("mongoose");
const File=require("../model/fileSchema");
var nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();


exports.cloudUploadImage=async(req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).send("No files were uploaded");
        }

        if(!req.body.email){
            return res.status(400).send("Email is required");
        }

        console.log(req.body.email);
        const file=req.files.file;
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("FileType is",fileType);
        if(fileType!="png" && fileType!="jpeg" && fileType!="jpg"){
            return res.status(400).json({message:"File format not Supported"},{upload:"Failed"});
        }
        console.log("file is ",file);
        const fileName=file.name.split('.')[0]+"."+Date.now();
        const result=await cloudinary.uploader.upload(file.tempFilePath,{folder:"uploads",public_id: fileName });
        const newFile=new File({
            name:file.name,
            path:result.secure_url,
            size:file.size,
            type:file.mimetype
        });

        await newFile.save();


        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
        });
        
        var mailOptions = {
            from: process.env.email,
            to: `${req.body.email}`,
            subject: 'Image has Been Uploaded Successsfuly',
            text:<a href="${result.secure_url}" target="_blank" rel="noopener noreferrer">View Image</a>
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 

        console.log("File uploaded Successsfully");
        return res.status(200).json({message:"File uploaded Sucessfully ",file:newFile});

    }
    catch(err){
        console.log("Failed in getting the file Maybe Filetype is not supported ");
        console.log(err);
        return res.status(400).json({message:"Error in Getting the File"});
    }
}