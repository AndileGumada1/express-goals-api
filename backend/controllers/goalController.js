// @desc    Get goals
// @route   POST   /api/goals
// @access Private
const getGoals = (req,res) =>{
    
    res.status(200).json({message:'Get goals'})
}
// @desc    Get goals
// @route   POST   /api/goals
// @access Private
const setGoals = (req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add the text field')
    }
    console.log(req.body)
    res.status(200).json({message:'Creating goals'})
}

// @desc    Update goals
// @route   PUT   /api/goals/id
// @access Private
const updateGoals = (req,res) =>{
    res.status(200).json({message:`Update goal ${req.params.id}`})
}

// @desc    Get goals
// @route   DELETE   /api/goals/id
// @access Private
const deleteGoals = (req,res) =>{
    res.status(200).json({message:`Delete goal ${req.params.id}`})
}


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}