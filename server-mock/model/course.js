const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const schema = mongoose.Schema

const courseSchema = new schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    slug: {
        type:String,
        slug:"name"
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    holecount:{
        type:Number,
        required:false
    },   
    rating:{
        type:Number,
        required:false
    },
    latitude:Number,
    longitude:Number
})

module.exports = mongoose.model('course',courseSchema)