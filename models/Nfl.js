
var mongoose = require('mongoose');

var NflSchema = new mongoose.Schema({
  title: String,
  link: String,
  time : { type :Date, default: Date.now },
  createdAt: {type:Date, default:Date.now },
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NflComment' }],
  author: String
});

NflSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


module.exports = mongoose.model('Nfl', NflSchema);
