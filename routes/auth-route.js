const route = require('express').Router()
const passport = require('passport')
const authController = require('../Controller/authController')

// Route 
route.get( '/login', authController.login_get )
route.post( '/login', authController.login_post )
route.get( '/create_account', authController.createAccount_get )
route.get('/signup', authController.signup_get )
route.get('/logout', authController.logout_get)
route.post('/signup',  authController.signup_post)
// login with social media 

//google
route.get( '/google', passport.authenticate('google',{
    scope:['profile']
}))
route.get('/google/redirect', passport.authenticate('google'),(req,res) => {
   res.redirect('/')
})

// facebook
route.get('/facebook',passport.authenticate('facebook'))
route.get('/facebook/redirect',passport.authenticate('facebook'),(req,res) => {
    res.redirect('/')
})


module.exports = route;