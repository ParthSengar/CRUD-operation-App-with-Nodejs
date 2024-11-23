// BACKEND >> in this we will be writting API's code for our server site !! 

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())    // to access our server site in our front end
app.use(express.json())  // this for whenever we pass a data from our front-end 
                        // to our back-end site 

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")

 app.get("/" , (req ,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err)) 
 })

 app.put('/updateUser/:id', (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
         email: req.body.email,
          age: req.body.age
        })
    .then(users => res.json(users))
    .catch(err => res.json(err) )
 })

 app.delete('/deleteUser/:id', (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err) )
 })


app.post("/CreateUser", (req, res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err) )
})

app.get('/getUser/:id', (req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err) )
})

//  Also to run our server 
app.listen(3001, ()=>{
    console.log("server is running")
})