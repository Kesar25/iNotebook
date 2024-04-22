const express = require("express");
const User = require("../models/userSchema")
const { body, validationResult } = require("express-validator")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const router = express.Router();
const JWT_SECRET="iamadevelkjvjhjvoperlearnkjgjhinghowtocode"
const fetchUser=require("../middleware/fetchUser");

router.post("/createUser", [body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'Password must be at least 5 characters long').isLength({ min: 3 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry user with this email already exist" })
            }
            
            const salt = await bcrypt.genSalt(10);
            const secPass=await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })
            res.json(user)
        } catch (e) {
            console.log(e.message);
            res.status(500).send("Some error occured")
        }

})

router.post("/login", [body('email', 'Enter a valid email').isEmail(),
body('password', 'Password cannot be blank').exists()], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    const {email, password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try login with correct credentials"});
        }

        const comparePass=await bcrypt.compare(password,user.password);
        if(!comparePass){
            console.log(password);
            console.log(req.body.password);
            return res.status(400).json({error:"Please password enter valid credentials"})
        }

        const data={
            user:{
                id:user.id
            }
        }

        const authToken=jwt.sign(data,JWT_SECRET);
        res.json(authToken);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/getUser", fetchUser, async(req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user)
    }catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router;