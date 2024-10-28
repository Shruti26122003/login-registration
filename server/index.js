const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const employessModel1 = require('./models/Employess')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employess");

app.post('/login',(req,res) => {
    const { email, password} = req.body;
    employessModel1.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            } else{
                res.json("the password is incorrect")
            }
        }else{
            res.json('no record existed')
        }
    })
})

app.post('/register',(req, res) => {
    employessModel1.create(req.body)
    .then(employess => res.json(employess))
    .catch(err => res.json(err))
})

app.listen(3001, () =>{
    console.log("server is running")
})