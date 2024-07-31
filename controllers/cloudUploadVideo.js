const mongoose=require("mongoose");
const File=require("../model/fileSchema");
const cloudinary = require('cloudinary').v2;


exports.cloudUploadVideo=async(req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).send("No Video were uploaded");
        }
        const file=req.files.VideoFile;
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("FileType is",fileType);
        if(fileType!="mp4" && fileType!="mov"){
            return res.status(400).json({message:"Video format not Supported"},{upload:"Failed"});
        }
        console.log("file is ",file);
        const fileName=file.name.split('.')[0]+"."+Date.now();
        const result=await cloudinary.uploader.upload(file.tempFilePath,{folder:"uploads",public_id: fileName, resource_type: "video" });
        const newFile=new File({
            name:file.name,
            path:result.secure_url,
            size:file.size,
            type:file.mimetype
        });

        await newFile.save();
        console.log("Video uploaded Successsfully");
        return res.status(200).json({message:"Video uploaded Sucessfully ",file:newFile});

    }
    catch(err){
        console.log("Failed in getting the Video Maybe Video is too long");
        console.log(err);
        return res.status(400).json({message:"Error in Getting the Video"});
    }
}