const express = require('express')
const authController = require('../controllers/auth.controller')
const passwordController = require('../controllers/password.controller')
const otpController = require('../controllers/otp.controller')

const router = new express.Router

router.post('/register', authController.registerUserController)
router.post('/login', authController.loginController)
router.post('/generate-otp', otpController.generateOtpController)
router.post('/verify-otp', otpController.verifyOtpController)
router.post('/forgot-password', passwordController.forgotPasswordController)
router.post('/reset-password', passwordController.resetPasswordController)
router.get('/auth/google', authController.googleLoginController)
router.get('/google/callback', authController.googleCallbackController)
module.exports = router