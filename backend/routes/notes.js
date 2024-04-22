const express = require("express");
const Note=require("../models/notesSchema");


const router = express.Router();
router.post("/",(req,res)=>{
    console.log("notes");
})

module.exports=router;