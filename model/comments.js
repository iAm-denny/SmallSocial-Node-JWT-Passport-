const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    username : String,
    thumbnail: String,
    contentId: String,
    comment:String
},{timestamps: true})
const Comments = mongoose.model('comments', commentSchema) 
module.exports =  Comments