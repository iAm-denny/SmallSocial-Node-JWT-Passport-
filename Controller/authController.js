const User = require("../model/user")
const jwt = require('jsonwebtoken')

const validate = (err) =>  {
    console.log(err.message,err.code)
    let errors = {username : '', email: '', password: ''}

    if(err.message === 'Incorrect email') {
        errors.email = 'Incorrect email'
        return errors
    }
    if(err.message === 'Incorrect password') {
        errors.password = 'Incorrect password'
        return errors
    }
    if(err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message
        })
    }
    return errors
}
const createToken = (id) => {
    return jwt.sign({id}, 'small social', {
        expiresIn: 3 * 24* 60 *60 
    })
}
module.exports.login_get = (req,res) => {
    res.render('login',{title:"Login",user:req.user})
}

module.exports.createAccount_get = (req,res) => {
    res.render('create_acc',{title:"Create an account"})
}
module.exports.logout_get = (req,res) => {
    req.logout()
    res.cookie('Social_User', "", {maxAge: 1})
    res.redirect('/')
}
module.exports.signup_get = (req,res) => {
    res.render('signup', {title:'Sign up', user: req.user})
}
module.exports.signup_post = async (req,res) => {
    const { username, email, password } = req.body 
    
    try {
        const user = await User.create({username, email, password})
        const token =  createToken(user._id)
        res.cookie("Social_User", token, {httpOnly: true, maxAge: 3* 24 *60 *60 *1000})
        res.status(200).json({user:user._id})
    }
    catch(err) {
        const errors = validate(err)
        res.status(400).json({errors})
    }
}
module.exports.login_post = async (req,res) => {
    const {email, password }= req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('Social_User', token , {httpOnly:true, maxAge:3* 24*60*60*1000})
        res.status(200).json({user:user._id})
    }
    catch(err) {
        const errors = validate(err)
        res.status(400).json({errors})
    }
 
}