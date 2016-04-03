var Comment = require('./../models/NhlComment');
var Post = require('./../models/Nhl');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


module.exports = {
    
 
 findyById: function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }

    req.comment = comment;
    return next();
  });
},



createComment: function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.params.post;
  comment.author = req.payload.username;
  
  Post.findByIdAndUpdate(req.params.post,
   {$push: {comments:comment._id}},
   function(err, post){
       if(err) { return (err)}
       console.log(post)
   })
  
  

  comment.save(function(err, comment){
    if(err){ return next(err); }

  

      res.json(comment);
    });
  
},




createUpvote: function(req, res, next) {
    console.log('here');
        Comment.findByIdAndUpdate(req.params.comment, {upvotes: req.body.upvotes}, 
    function (err, comment){
        console.log(comment);
       if (err) {return next(err); }
       
       res.json(comment); 
    });

}
    
  

}