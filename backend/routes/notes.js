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



module.exports=router;