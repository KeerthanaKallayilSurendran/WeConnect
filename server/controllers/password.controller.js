const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const {sendOtp} = require('../utils/send.email')
const {generateOtp} = require('../utils/generate.otp')

exports.forgotPasswordController = async(req,res)=>{
    // console.log("Inside forgot password controller");
    const {email} = req.body
    try {
        const user = await users.findOne({email})
        // console.log(user);
        if(user){
            const {otp, otpExpiresTime} =  generateOtp()
            user.otp = otp
            user.otpExpires = otpExpiresTime
            // console.log(user);
            
            await user.save()
            // console.log("Before callingd sendotp");
            await sendOtp(email, otp)
            // console.log("After calling sendotp");
            return res.status(200).json("OTP send successfully")
        }  
        return res.status(404).json("Usern not found")
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.resetPasswordController = async(req,res)=>{
    // console.log("Inside reset password controller");
    
    const {email, password} = req.body
    try {
        const user = await users.findOne({email})
        if(user){
            const hashedPassword = await bcrypt.hash(password,10)
            // console.log(hashedPassword);
            user.password = hashedPassword
            await user.save()
            // console.log(user);
            
            return res.status(200).json("Password updated successfully")
        }
        return res.status(404).json("User not found")
    } catch (error) {
        return res.status(401).json(error)
    }
}