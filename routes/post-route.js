const route = require('express').Router()
const Comments = require('../model/comments');
const userPost = require('../model/create_post')

route.get("/", (req, res) => {
    res.render("create_post", { title: "Create Post", user: req.user });
});

route.get('/detail/:id', async ( req,res ) => {

    try {
        const userposts = await userPost.findById(req.params.id)
            if(userposts) {
                const commentposts = await Comments.find({contentId: userposts._id}).sort({createdAt: -1})
                res.render('detail', { title: 'Detail', user: req.user, topic: userposts, comments: commentposts})
            }
       
    }
    catch(err) {
        console.log(err)
    }
})

route.post('/topics', async (req,res) => {
    const {username, contentId, thumbnail, title, content} = req.body
    try {
       const user =  await userPost.create({username, contentId,thumbnail, title, content})
       if(user) res.redirect('/')
    }
    catch(err) {
        console.log(err)
    }
})
route.delete('/delete/:id', (req,res) => {
    userPost.findByIdAndDelete(req.params.id)
    .then(result => res.json({redirect:'/'}))
    .catch(err => console.log(err))
})
route.post('/comment', async (req, res) => {
    const {username, contentId, thumbnail, comment} = req.body
    try {
        const com = await  Comments.create({ username, contentId, thumbnail, comment })
        if(com)  res.redirect(req.get('referer'));
    }
 
    catch(err) {

    }
})
  module.exports = route