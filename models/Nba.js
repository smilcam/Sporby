
var mongoose = require('mongoose');

var NbaSchema = new mongoose.Schema({
  title: String,
  link: String,
//   nba: {required:true},
  time : { type :Date, default: Date.now },
  createdAt: {type:Date, default:Date.now },
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NbaComment' }],
  author: String
});

NbaSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


module.exports = mongoose.model('Nba', NbaSchema);


