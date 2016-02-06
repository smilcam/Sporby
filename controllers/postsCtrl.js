var Comment = require('./../models/Comment');
var Post = require('./../models/Posts');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});



module.exports = {
    
    
    mainPage: function(req, res) {
  res.render('index', { title: 'Express' });
},
    
    
read: function(req, res, next) {
   Post.find(function(err, posts){
   if(err){ return next(err); }

    res.json(posts);
  });
},
   
   createUser: function(req, res, next) {
       var post = new Post(req.body);
       post.author = req.payload.username;
       
       post.save(function(err,post){
           if(err) {return next(err); }
           
           res.json(post);
       })
   }, 
   
   findbyId: function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error("can't find post")); }

    req.post = post;
    return next();
  });
}, 

postReturn: function(req, res, next) {
    Post.findById(req.params.post, 
     Post.find({})
    .populate('comments')
    .exec(
    function(err, post){
        if (err) { return next(err); }
        
        res.json(post);
        });
    },   
    
    
postUpvote: function(req, res, next) {
  Post.findByIdAndUpdate(req.params.post,{upvotes: req.body.upvotes},{new:true},function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
}
    
    
    
    
    
    
}