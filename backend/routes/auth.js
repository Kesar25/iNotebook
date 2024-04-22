const express = require("express");
const User = require("../models/userSchema")
const { body, validationResult } = require("express-validator")
const bcrypt=require("bcrypt");

const router = express.Router();

router.post("/", [body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'Password must be at least 5 characters long').isLength({ min: 3 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
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

module.exports = router;