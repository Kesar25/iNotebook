const mongoose=require("mongoose");

const notesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
});


const Note=mongoose.model('note', notesSchema);
module.exports=Note;