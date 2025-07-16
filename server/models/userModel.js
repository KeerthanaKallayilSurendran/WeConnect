const mongoose = require('mongoose')

const userModelSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password: {
        type: String
    }, 
    googleId: {
        type: String, 
        unique: true
    },
    otp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    profilePic:{
        type:String,
        default:''
    }, 
    bio:{
        type:String,
        default:''
    }, 
    friends:{
        type:Array,
        default:''
    }, 
    friendRequests:{
        type:Array,
        default:''
    }
})

const users = mongoose.model("users", userModelSchema)
module.exports = users