const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const facebookStrategy = require('passport-facebook')
const keys = require('./keys')
const socialUser = require('../model/socialUser')

passport.serializeUser((user,done) => {
    done(null, user.id)
})
passport.deserializeUser((id,done) => {
    socialUser.findById(id)
    .then(user => done(null,user))
    .catch(err => console.log(err))
})

passport.use(new googleStrategy({
    callbackURL :'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accesstoken,refreshToken,profile,done) => {
    socialUser.findOne({socialId: profile.id})
     .then(currentuser => {
         if(currentuser) {
             done(null, currentuser)
         }else {
             new socialUser({
                 displayname: profile.displayName,
                 socialId: profile.id,
                 thumbnail: profile._json.picture
             })
             .save()
             .then(newUser => done(null, newUser))
             .catch(err => console.log(err))
         }
     })
}
))
passport.use(new facebookStrategy({
    callbackURL:'/auth/facebook/redirect',
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken,refreshToken, profile,done) => {

    socialUser.findOne({socialId: profile.id})
    .then(currentUser => {
        if(currentUser) {
            done(null , currentUser)
        }else {
            new socialUser({
                displayname: profile.displayName,
                socialId: profile.id,
                thumbnail: profile.photos ? profile.photos[0].value : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.teepublic.com%2Fsticker%2F1578697-limited-edition-exclusive-ninja-fb-profile&psig=AOvVaw2cyQrqNpJ6YjIA28MQM2CG&ust=1599117701212000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDBzOb3yesCFQAAAAAdAAAAABAI'
            })
            .save()
            .then(newUser => done(null,newUser))
            .catch(err => console.log(err))
        }
    })


}
))
