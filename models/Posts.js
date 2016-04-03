
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  time : { type :Date, default: Date.now },
  createdAt: {type:Date, default:Date.now },
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  author: String
});



module.exports = mongoose.model('Post', PostSchema);
