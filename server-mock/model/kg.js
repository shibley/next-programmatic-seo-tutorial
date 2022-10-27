const mongoose = require('mongoose')
const schema = mongoose.Schema

const kgsSchema = new schema({
    kgs:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('kgs',kgsSchema)