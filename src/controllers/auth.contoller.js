const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { error, success } = require("../utils/responseWrapper");
const { REFRESH_ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PRIVATE_KEY } = require("../configs/config");


const signupController = async (req, res)=>{
    try {
        const {email, password} = req.body;
        // console.log(req.body);
        
        if(!email || !password){
           return res.send(error(400, 'Email and Password are required'))
            // return res.status(400).send('email and password are required')
        }

        const exitingUser = await User.findOne({email})

        if(exitingUser){
            // return res.status(409).send('user is already registered')
            return res.send(error(409, 'User is already registered'))

        }

        //encypt the password

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password:hashPassword,
        })

        const accessToken = await generateAccessToken({
            _id: newUser._id
        })

        const refrenshToken = await generateRefrenshToken({
            _id: newUser._id
        })

        

        // return res.status(201).json({
        //     user:newUser
        // })
        return res.send(
            success(201, {user: newUser, accessToken,refrenshToken})
        )
    } catch (err)
    
    {
        // return res.status(500).send(err.message)
        console.error('Error in signup:', err.message);
        return res.send(error(500, err.message))
    }
}


//////logincontroller

const loginController = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            // return res.status(400).send('email and password are required')
            return res.send(error(400, 'Email and Password are required')
        )


        }

        const user = await User.findOne({email})
         
        if(!user){
            // return res.status(409).send('user is not registered')
            return res.send(error(409, 'User is not registered'))

        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if(!correctPassword){
            // return res.status(403).send('password is inccorect');
            return res.send(error(403, 'Password is incorrect'))

        }

        const accessToken = await generateAccessToken({
            _id: user._id,
            // email:user.email
        })

        const refrenshToken = await generateRefrenshToken({

            _id: user._id,
        })


        // console.log(accessToken);
        
        // return res.json({
        //     accessToken:accessToken,
        // })

        return res.send(success(200, {accessToken, refrenshToken}))
    } catch (err) {
        // return res.status(500).send(err.message)
        console.error('Error in login:', err.message);
        return res.send(error(500, err.message))
        
    }
}


// internal function

const generateAccessToken = async(data)=>{
    try {
        const token = jwt.sign(data, ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '60s',  
        })
        return token;
    } catch (err) {
        // return res.status(500).send(err.message)
        console.log(err.message);
        
        // throw new Error('Failed to generate access token');
        
    }
}


const generateRefrenshToken = async(data)=>{
    try {
        const token = jwt.sign(data, REFRESH_ACCESS_TOKEN_PRIVATE_KEY,
            {
                expiresIn: '1y',
            }
        )
        return token
    } catch (err) {
        // return res.send('Error generating refresh token:', err.message)
        // throw new Error('Failed to generate refresh token');
        console.log(err.message);

        
    }
}


module.exports = {
    signupController,
    loginController
}