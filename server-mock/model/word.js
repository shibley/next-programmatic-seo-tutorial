const mongoose = require('mongoose')
const schema = mongoose.Schema

const wordSchema = new schema({
    word:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('word',wordSchema)