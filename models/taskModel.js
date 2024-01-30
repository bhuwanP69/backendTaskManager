const mongoose = require('mongoose')
const Schema = mongoose.Schema

//model schema 
const TasksSchema = new Schema({
    task:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Tasks',TasksSchema)