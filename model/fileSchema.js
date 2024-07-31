const mongoose= require("mongoose");

const fileSchema=new mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String},
    size:{type:Number},
    type:{type:String},
    date:{type:Date,default:Date.now()},
})

module.exports=mongoose.model("File",fileSchema);