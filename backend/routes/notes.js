const express = require("express");
const Note=require("../models/notesSchema");
const fetchUser=require("../middleware/fetchUser");
const {body, validationResult}=require("express-validator")

const router = express.Router();
router.get("/fetchNotes",fetchUser, async(req,res)=>{
    try{
        
        const notes=await Note.find({user:req.user.id});
        res.json(notes)
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Some error occured")
    }
    
})


router.post("/addNote", fetchUser, [body('title', 'Enter a valid title').isLength({ min: 3 }),
body('description', 'Description should be atleast 3 characters long').isLength({min: 3})], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            
            const note = await Note.create({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.user.id
            })
            res.json(note)
        } catch (e) {
            console.log(e.message);
            res.status(500).send("Some error occured")
        }

})

router.put("/updatenote/:id", fetchUser, async(req,res)=>{
    const {title, description, tag}= req.body;
    const newNote={};

    if(title) {newNote.title=title};
    if(description) {newNote.description=description};
    if(tag) {newNote.tag=tag};

    let note=await Note.findById(req.params.id);
    if(!note) {return res.status(404).send("Not Found")};

    if(note.user.toString()!==req.user.id){ return res.status(401).send("Not Allowed to update")};

    note= await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
    res.json(note)
})

router.delete("/deletenote/:id", fetchUser, async(req,res)=>{
    const {title, description, tag}= req.body;
    

    let note=await Note.findById(req.params.id);
    if(!note) {return res.status(404).send("Not Found")};

    if(note.user.toString()!==req.user.id){ return res.status(401).send("Not Allowed to update")};

    note= await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"Note deleted successfully"})
})


module.exports=router;