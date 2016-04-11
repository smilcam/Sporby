
var mongoose = require('mongoose');

var MlbSchema = new mongoose.Schema({
  title: String,
  link: String,
//   nba: {required:true},
  time : { type :Date, default: Date.now },
  createdAt: {type:Date, default:Date.now },
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MlbComment' }],
  author: String
});

MlbSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


module.exports = mongoose.model('Mlb', MlbSchema);


