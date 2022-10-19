const mongoose = require('mongoose')
const schema = mongoose.Schema

const wordSchema = new schema({
    valid_guesses:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('valid_guesses',wordSchema)