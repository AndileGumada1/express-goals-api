const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalsModel')
const User = require('../models/userModel')
// @desc    Get goals
// @route   POST   /api/goals
// @access Private
const getGoals = asyncHandler(async(req,res) =>{
    const goals = await Goal.find({user: req.user.id})
    
    res.status(200).json(goals)
})
// @desc    Set goals
// @route   POST   /api/goals
// @access Private
const setGoals = asyncHandler(async (req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add the text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
    })
    console.log(req.body)
    res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT   /api/goals/id
// @access Private
const updateGoals = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found'+id)
    }
    const user = await User.findById(req.user.id)
    //check for the user
    if(!user){
        req.status(400)
        throw new Error('User not found')
    }
    //make sure the loggedin user matches the goal
    if(goal.user.toString() !== user.id){
        req.status(400)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.
        body,{
            new: true
        })

    res.status(200).json(updatedGoal)
})

// @desc    Get goals
// @route   DELETE   /api/goals/id
// @access Private
const deleteGoals = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found'+id)
    }
    const user = await User.findById(req.user.id)
    //check for the user
    if(!user){
        req.status(400)
        throw new Error('User not found')
    }
    //make sure the loggedin user matches the goal
    if(goal.user.toString() !== user.id){
        req.status(400)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}
   