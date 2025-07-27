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

const DB='mongodb+srv://mittalayush2003:97pzGonKMiTcLuGp@cluster0.hofiztw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/basic', express.static(path.join(__dirname, 'pp/basic/public')));
app.use('/standard', express.static(path.join(__dirname, 'pp/standard/public')));
app.use('/premium', express.static(path.join(__dirname, 'pp/premium/public')));


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

app.get("/basic", (req, res)=>{
    res.sendFile(__dirname+"/pp/basic/dashboard.html")
});

app.get("/standard", (req, res)=>{
    res.sendFile(__dirname+"/pp/standard/dashboard.html")
});

app.get("/premium", (req, res)=>{
    res.sendFile(__dirname+"/pp/premium/dashboard.html")
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

app.get("/key-subscribe", (req, res) => {
    res.sendFile(__dirname + "/key-subscribe.html");
});

//login check
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(password);

        const user = await User.findOne({ username: username });
        if (!user) {
            console.log("User not found");
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (isMatch) {
            res.redirect('/key-subscribe');
        } else {
            console.log("Incorrect password");
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).send("Bad Request");
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});