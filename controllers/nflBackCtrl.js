var Comment = require('./../models/NflComment');
var Post = require('./../models/Nfl');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});



module.exports = {
    
    
    mainPage: function(req, res) {
  res.render('index', { title: 'Express' });
},
    
    
read: function(req, res, next) {
    console.log('something')
   Post.find(function(err, posts){
   if(err) {
       console.error(err);
       return res.status(500).json(err);
       
   }

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
    Post.findById(req.params.post)
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