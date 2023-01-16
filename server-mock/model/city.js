const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const schema = mongoose.Schema

const citySchema = new schema({
    id:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:false
    },
    Population:{
        type:Number,
        required:false
    },   
    lat:Number,
    lon:Number
})

module.exports = mongoose.model('city',citySchema)