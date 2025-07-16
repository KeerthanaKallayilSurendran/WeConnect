const crypto = require('crypto')

const generateOtp = ()=>{
    const otp = crypto.randomInt(100000,999999).toString()
    const otpExpiresTime = Date.now() + 10 * 60 * 1000
    return {otp, otpExpiresTime}
}

module.exports = {generateOtp}