const mongoose=require("mongoose");
const express=require("express");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const app=express();
const bodyParser=require("body-parser");
const path=require("path");
const { appendFileSync } = require("fs");
const port=process.env.PORT || 9000;

require('dotenv').config({ path: './config.env'});

const DB='mongodb+srv://mittalayush2003:7mKitybpippNuZux@cluster0.jrkwykm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));

const User=require('./models/UserSchema');
const { json }=require("express");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log('no connection'));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.get("/register", (req, res)=>{
    res.sendFile(__dirname+"/register.html")
});

app.post("/register", async(req, res)=>{
    try{
        let registrationForm=new User({
            username: req.body.username,
            email: req.body.email,
            phoneno: req.body.phoneno,
            password: req.body.password
        });
        console.log(registrationForm);
        const registered=await registrationForm.save();

        res.redirect('/login');
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get("/login", (req, res)=>{
    res.sendFile(__dirname+"/login.html")
});

//login check
app.post("/login", async(req, res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;
        console.log(password);

        const userName=await User.findOne({ username: username });
        console.log(userName.password);
        const isMatch=await bcrypt.compare(password, userName.password);
        console.log(isMatch);

        if(isMatch){
            res.sendFile(__dirname+'/key-subscribe.html');
        }
        else{
            console.log('password is not matching');
            res.redirect('/register');
        }
    } catch(error){
        res.status(400).send("invalid username");
    }
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});