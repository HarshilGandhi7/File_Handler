const express = require("express");
const router = express.Router();

const {cloudUploadImage}=require("../controllers/cloudUploadImage");
const {cloudUploadVideo}=require("../controllers/cloudUploadVideo");
const {cloudUploadSizeReducer}=require("../controllers/cloudUploadSizeReducer");

router.post("/cloudUploadImage",cloudUploadImage);
router.post("/cloudUploadVideo",cloudUploadVideo);
router.post("/cloudUploadSizeReducer",cloudUploadSizeReducer);

module.exports=router;