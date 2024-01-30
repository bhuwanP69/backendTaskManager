const Tasks = require('../models/taskModel')
const mongoose = require('mongoose')

//get all tasks
const getTask = async(req,res) =>{
    const allTasks = await Tasks.find({}).sort()
    res.status(200).json(allTasks)
}

//create a new task 
const createTask = async(req,res) =>{
    const {task} = req.body
    try{
        const newTask= await Tasks.create({task})
        res.status(200).json(newTask)
    }catch(error){
        res.status(400).json({error:error.message})

    }
} 

//delete a task 
const deleteTask = async(req,res) =>{
    const {_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'No such Tasks || id is wrong'})
    }
    const task = await Tasks.findOneAndDelete({_id:_id})
    if(!task){
        res.status(400).json({error:'no such task'})
    }
    res.status(200).json(task)
}

//updated the task 
const updateTask=  async(req,res) =>{
    const {_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'No such Tasks || id is wrong'})
    }
    const task = await Tasks.findOneAndUpdate({_id:_id},{
        ...req.body
    })
    if(!task){
        res.status(400).json({error:'no such task'})
    }
    res.status(200).json(task)

}

module.exports = {
    getTask,
    createTask,
    deleteTask,
    updateTask
}