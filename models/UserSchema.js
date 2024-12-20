const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//we are hashing the password
UserSchema.pre('save', async function(next){
    console.log("hi from inside");
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 12);
    }
    next();
});

//we are generating json web token
UserSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch(err){
        console.log(err);
    }
}

const User=mongoose.model('USER', UserSchema);
module.exports=User;