const users = require('../models/userModel')
const {sendOtp} = require('../utils/send.email')
const {generateOtp} = require('../utils/generate.otp')

// generate otp
exports.generateOtpController = async(req,res)=>{
    // console.log("Inside generate otp controller");
    const {email} = req.body
    // console.log(email);
    
    try {
        const user = await users.findOne({email})
        if(!user){
            return res.status(400).json("User not Found")
        }
        // console.log(user);

        const {otp,otpExpiresTime} = generateOtp()

        user.otp = otp
        user.otpExpires = otpExpiresTime
        await user.save()
        // console.log(user);
        // console.log("before calling send otp");
        
        await sendOtp(email,otp)
        // console.log("after calling send otp");
        
        return res.status(200).json("OTP send successfully")

    } catch (error) {
        return res.status(401).json(error)
        // console.log(error);

    }
    
}

// verify otp
exports.verifyOtpController = async(req,res)=>{
    // console.log("Inside verify otp contorller");
    const {email, otp} = req.body
    // console.log(email,otp,71);
    
    try {
        const user = await users.findOne({email})
        // console.log(user);
        
        if(!user){
            return res.status(400).json("User not Found")
        }   

        if(user.otp != otp || user.otpExpires < Date.now()){
            return res.status(400).json("Invalid OTP or time expires")
        }
        // console.log(84);
        
        user.otp = null;
        user.otpExpires = null
        await user.save()
        // console.log(89);
        
        return res.status(200).json("OTP verified successfully")

    } catch (error) {
        return res.status(401).json(error)
    }
}