require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = new nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

const sendOtp = async(email, otp)=>{
    console.log("Inside sendOtp");
    
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Your OTP',
        text:`We Connect email verification OTP is ${otp}`
    }

    try {
        
        await transporter.sendMail(mailOptions)
        console.log("Email Send Successfully");
    } catch (error) {
        console.log('error while sending otp email');
        throw new Error("Failed to send OTP");
        
        
    }
}

module.exports = {sendOtp}