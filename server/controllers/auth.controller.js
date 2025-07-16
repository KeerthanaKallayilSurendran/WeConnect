const users = require('../models/userModel')
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register a new user
exports.registerUserController = async(req,res)=>{
    // console.log("Inside register user controller");
    const {username,email,password} = req.body
    // console.log(username,email,password);
    
    try {
        const existingUser = await users.findOne({email})
        // console.log(existingUser);
        
        if(existingUser){
            return res.status(406).json("Existing User")
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new users({username, email, password:hashPassword})
        newUser.save()
        return res.status(200).json(newUser)

    } catch (error) {
        return res.status(401).json(error)
        
    }
}

// login user
exports.loginController = async(req,res)=>{
    // console.log("Inside login controller");
    const {email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        // console.log(existingUser);
        if(existingUser){
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
            // console.log(isPasswordMatch);
            
            if(isPasswordMatch){
                const token = await jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD,{expiresIn:'1d'})
                // console.log(token);
                return res.status(200).json({user:existingUser,token})
            }
            return res.status(406).json("Incorrect Password")
        }
        return res.status(406).json("Incorrect Email")
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.googleLoginController = (req, res, next) => {
  console.log("Inside Google Login controller");
  passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
};

exports.googleCallbackController = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    // console.log(user,13);
    
    if (err || !user) {
      return res.status(401).json('Google login failed');
    }

    try {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_PASSWORD, { expiresIn: '1d' }
      );

      res.status(200).json({user,token});
    } catch (error) {
      res.status(500).json(err);
    }
  })(req, res, next);
};

