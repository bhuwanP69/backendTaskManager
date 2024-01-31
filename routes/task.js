const express = require('express')
const {
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskController')

const router = express.Router()

router.get('/task',getTask)
router.post('/task',createTask)
router.delete('/task/:_id',deleteTask)
// update 
router.put('/task/:_id',updateTask)

module.exports =  router