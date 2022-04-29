const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// @desc    Set user
// @route   POST   /api/users
// @access  Public
const registerUser = asyncHandler( async(req,res) =>{

    const {name, email, password} = req.body
    if(!name ||!email ||!password){
        res.status(400)
        throw new Error("Please make sure all fiels are added")
    }
    //check if user is already exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash password by the genSalt method
    const salt = await bcrypt.genSalt(10)
    //hash the password with the bcrypty hash method
    const hasedPassword = await bcrypt.hash(password,salt)

    //Creating a user
    const user = await User.create({
        name,
        email,
        password:hasedPassword
    })
    //if user is saved successful
    if(user){
    res.status(201).json({
        _id: user.id,
        name: user.name,
        token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
// @desc    Authenticate a user
// @route   POST   /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req,res) =>{
    const { email, password} = req.body
    
    const user = await User.findOne()

    //compare if the two password are equal
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid credentials')
        } 
})

// @desc    Get user
// @route   GET   /api/users/get/me
// @access  Private
const getMe = asyncHandler( async(req,res) =>{
    const {_id,name,email} = await User.findById(req.user.id)
    res.status(200).json({
       id:_id,
       name,
       email
    })
})
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}
module.exports ={
    registerUser,
    loginUser,
    getMe
}