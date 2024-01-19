
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 4000
const app = express()

//cors
app.use(cors())

const Schema = mongoose.Schema

let uri  = 'mongodb+srv://Bhuwan:Bhuban45332@cluster0.vbqayks.mongodb.net/TasksManager?retryWrites=true&w=majority'

//body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//modal schema
const TasksSchema = new Schema({
  task:{
    type:String,
    required:true
  }
})

const TasksModal = mongoose.model('Tasks',TasksSchema)

app.get('/task', async (req,res) =>{
  const Alltasks = await TasksModal.find({}).sort({createdAt: -1})
   res.status(200).json(Alltasks)
})

app.post('/task', async(req,res) =>{
  const {task} = req.body;
  try{
    const tasks = await TasksModal.create({task})
    res.status(200).json(tasks)
  }catch (error){
    res.status(400).json({error: error.message})
  }
      
})

app.delete('/task/:_id', async (req, res) => {
  const { _id } = req.params;   
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'No such Tasks || id is wrong' });
  }

    const task = await TasksModal.findOneAndDelete({ _id: _id });
    if (!task) {
      return res.status(400).json({ error: 'No such tasks' });
    }

    res.status(200).json(task);
  });

//Database
  mongoose.connect(uri)
  .then(() =>{
      console.log('db is connected')
      app.listen(4000,() =>{
        console.log('listening to the port',port)
      })
  }) 
  .catch((err) => console.log(err) )