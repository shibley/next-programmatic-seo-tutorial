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
        required:false
    },
    state:{
        type:String,
        required:false
    },
    zip:{
        type:String,
        required:false
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
    longitude:Number,
    photoreference:String,
    image:String
})

module.exports = mongoose.model('course',courseSchema)