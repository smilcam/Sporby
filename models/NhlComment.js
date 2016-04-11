
var mongoose = require('mongoose');

var NhlCommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  time : { type : Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Nhl' }
});

NhlCommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('NhlComment', NhlCommentSchema);
