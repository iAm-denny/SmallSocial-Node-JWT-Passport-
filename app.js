const express = require("express");
const app = express();
const oauthLogin = require("./routes/auth-route");
const createPost = require('./routes/post-route')
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const posts = require('./model/create_post')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require("./model/user")


//connect to database
mongoose
  .connect( keys.mongodb.url, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

// set up view engine
app.set("view engine", "ejs");

//set cookie 
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.cookie.sessionKey]
}))

// initialize passport 
app.use(passport.initialize())
app.use(passport.session())


// check user
const checkUser = (req, res, next) => {
  const token = req.cookies.Social_User;
  if (token) {
    jwt.verify(token, 'small social', async (err, decodedToken) => {
      if (err) {
        res.locals.ownUser = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.ownUser = user;
        next();
      }
    });
  } else {
    res.locals.ownUser = null;
    next();
  }
};
//set up Router
app.get('*', checkUser);

app.get("/", (req, res) => {
  posts.find().sort({createdAt: -1})
  .then((result) => res.render("home", { title: "Home", user: req.user, topics:result }))
  .catch(err => console.log(err))
});
app.use("/auth", oauthLogin);
app.use("/create_post", createPost);

