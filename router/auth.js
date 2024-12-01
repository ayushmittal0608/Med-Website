const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require("bcryptjs");
const router=express.Router();


const User=require('../models/UserSchema');

router.get('/', (req, res)=>{
    res.send("Hello world from server.");
});

router.post('/register', async(req, res)=>{
    const { username, email, password}=req.body;

    if(!username || !email || !password){
        return res.status(422).json({ error: 'Please fill the field properly'});
    }
    try{
        const userExist=await User.findOne({ username: username });

            if(userExist){
                return res.status(422).json({ error: 'Username already exists'});
            }
            const user= new User({ username, email, password });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
    }
    catch(err){ 
        console.log(err);
    }
});

//login route

router.post('/login', async(req, res)=>{
    try{
        let token;
        const { username, password}=req.body;

        if(!username || !password){
            return res.status(400).json({ error: 'Please fill the data'});
        }
        const userLogin=await User.findOne({ username: username });
        console.log(userLogin);

        if(userLogin){
            const isMatch=await bcrypt.compare(password, userLogin.password);

            const token=await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Data.now(), 25892000000),
                httpOnly: true
            });

            if(!isMatch){
                res.status(400).json({ error: 'Invalid credentials' });
            }
            else{
                res.json({ message: "User signin successfully" });
            }
        }
        else{
            res.status(400).json({ message: 'Invalid credentials'});
        }
    }
    catch(err){
        console.log(err);
    }
})



module.exports=router;