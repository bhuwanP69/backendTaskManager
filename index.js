
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const taskRoutes = require('./routes/task')
const cors = require('cors')
const app = express()

//cors
app.use(cors()) 

//middleware
app.use(express.json())

//body parser  middleware easier to handle post and put request  
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use((req,res,next) =>{
  console.log(req.path,req.method)
  next() //Calling this function invokes the next middleware function in the app
})

app.use('/',taskRoutes)

//Database
  mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
      console.log('db is connected')
      app.listen(process.env.PORT,() =>{
        console.log('listening to the port',process.env.PORT)
      })
  }) 
  .catch((err) => {
    console.log(err)
   } )