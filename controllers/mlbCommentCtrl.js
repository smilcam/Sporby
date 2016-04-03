var Comment = require('./../models/MlbComment');
var Post = require('./../models/Mlb');
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

 
//     read: function(req, res, next) {
//   Comment.find(function(err, posts){
//     if(err){ return next(err); }

//     res.json(posts);
//   });
// },

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
  
  
//   req.body.comments.push(comment);
  comment.save(function(err, comment){
    if(err){ return next(err); }

    
    // req.body.save(function(err, post) {
    //   if(err){ return next(err); }

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
    
    
    
    //  {new:true}
    
    
    
    
    
//   req.comment.upvote(function(err, comment){
//     if (err) { return next(err); }

//     res.json(comment);
//   });
// }




}