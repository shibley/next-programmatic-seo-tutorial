const mongoose = require('mongoose')
const schema = mongoose.Schema

const positionSchema = new schema({
    text:{
        type:String,
        required:true
    },
    index:{
        type:Number
    }
})

module.exports = mongoose.model('positions',positionSchema)