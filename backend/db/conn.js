const mongoose=require("mongoose");

const dbConnection=()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/INOTE_BOOK").then(()=>{
        console.log("connection to database successful");
    }).catch((e)=>{
        console.log("Some error occurred while connecting:",e);
    })
}

module.exports=dbConnection;