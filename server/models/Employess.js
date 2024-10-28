const mongoose = require('mongoose')

const employessschema = new mongoose.Schema({
    name: String,
    email:String,
    password: String
})

const employessModel1 = mongoose.model("employess",employessschema)
module.exports = employessModel1