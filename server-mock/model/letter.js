const mongoose = require('mongoose')
const schema = mongoose.Schema

const letterSchema = new schema({
    letters:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('letters',letterSchema)