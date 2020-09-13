const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const passport = require('passport')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase:true,
        unique: true,
        validate: [isEmail, 'That email is not validate']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Please enter at least 6 characters']
    }
})

userSchema.pre('save', async function(next) { 
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.statics.login = async function(email, password)  {
        const user = await this.findOne({email})
        if( user ) {
            const checkpwd =await bcrypt.compare(password, user.password)
            if(checkpwd) {
                return user 
            }
            throw Error('Incorrect password')
        }
        throw Error('Incorrect email')
          
}
const User = mongoose.model('user', userSchema)
module.exports = User