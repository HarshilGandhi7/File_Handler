const mongoose=require("mongoose");
const File=require("../model/fileSchema");
const cloudinary = require('cloudinary').v2;


exports.cloudUploadSizeReducer=async(req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).send("No files were uploaded");
        }
        const file=req.files.file;
        const c=req.body.compress;
        let size;
        console.log(c);
        if(c==""){
            size=70;
        }
        if(c=="less"){
            size=30;
        }else if(c=="medium"){
            size=50;
        }else{
            size=80;
        }
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("FileType is",fileType);
        if(fileType!="png" && fileType!="jpeg" && fileType!="jpg"){
            return res.status(400).json({message:"File format not Supported"},{upload:"Failed"});
        }
        console.log("file is ",file);
        const fileName=file.name.split('.')[0]+"."+Date.now();
        const result=await cloudinary.uploader.upload(file.tempFilePath,{folder:"uploads",public_id: fileName,quality:size});
        const newFile=new File({
            name:file.name,
            path:result.secure_url,
            size:file.size,
            type:file.mimetype
        });

        await newFile.save();
        console.log("File uploaded Successsfully");
        return res.status(200).json({message:"File uploaded Sucessfully ",file:newFile});

    }
    catch(err){
        console.log("Failed in getting the file Maybe Filetype is not supported ");
        console.log(err);
        return res.status(400).json({message:"Error in Getting the File"});
    }
}