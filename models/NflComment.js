
var mongoose = require('mongoose');

var NflCommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  time : { type : Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Nfl' }
});

NflCommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('NflComment', NflCommentSchema);
