const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signupController = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send('email and password are required')
        }

        const exitingUser = await User.findOne({email})

        if(exitingUser){
            return res.status(409).send('user is already registered')

        }

        //encypt the password

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password:hashPassword
        })

        return res.status(201).json({
            user:newUser
        })
    } catch (err)
    
    {
        return res.status(500).send(err.message)
    }
}


// internal function

const generateAccessToken = async(data)=>{
    try {
        const token = jwt.sign(data,'randomString', {
            expiresIn: '60s',  
        })
        return token;
    } catch (err) {
        return res.status(500).send(err.message)
        
    }
}

module.exports = {
    signupController
}