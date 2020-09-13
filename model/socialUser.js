const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayname:String,
    socialId:String,
    thumbnail:String
})

const User = mongoose.model('googleUsers', userSchema)
module.exports = User