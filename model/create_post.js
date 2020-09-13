const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    contentId: {
        type:String,
    },
    thumbnail: {
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    } ,
},{timestamps: true})


const userPost = mongoose.model('posts', postSchema)
module.exports =  userPost