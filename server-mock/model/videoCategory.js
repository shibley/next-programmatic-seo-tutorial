const mongoose = require('mongoose').set('debug', true)
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const schema = mongoose.Schema

const videoCategorySchema = new schema({
    id:Number,
    snippet:{
        title:String,
        slug: 
        {
            type:String,
            slug:"title"
        }
    },
})

module.exports = mongoose.model('video_category',videoCategorySchema)