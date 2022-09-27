const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const schema = mongoose.Schema

const videoSchema = new schema({
    id:{
        type:Number,
        required:true
    },
    videoId:{
        type:Number,
        required:true
    },
    categoryId:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    channelTitle:{
        type:String,
        required:true
    },
    slug: {
        type:String,
        slug:"title"
    },
    tags: {
        type:String,
        required:false
    },
    views:{
        type:Number,
        required:true
    },
    comments:{
        type:Number,
        required:true
    },
    likes:{
        type:Number,
        required:true
    },
    dislikes:{
        type:Number,
        required:true
    },
    thumbnail: {
        type:String,
        required:true
    },
    published:{
        type:Date,
        required:true
    },
})

module.exports = mongoose.model('video',videoSchema)