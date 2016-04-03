var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');


var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

            // CONTROLLERS
var commentCtrl = require('./controllers/commentCtrl');
var postsCtrl = require('./controllers/postsCtrl');
var authCtrl = require('./controllers/authCtrl');
             // NBA CTRL
var nbaCtrl = require('./controllers/nbaBackCtrl');
var nbaCommentCtrl = require('./controllers/nbaCommentCtrl');
             // NFL CTRL

var nflCtrl = require('./controllers/nflBackCtrl');
var nflCommentCtrl = require('./controllers/nflCommentCtrl');
             // NHL CTRL
var nhlCtrl = require('./controllers/nhlBackCtrl');
var nhlCommentCtrl = require('./controllers/nhlCommentCtrl');
   
                // MLB CTRL
   
var mlbCtrl = require('./controllers/mlbBackCtrl');
var mlbCommentCtrl = require('./controllers/mlbCommentCtrl');
 
 
          //    NEW SPORT CTRL
 var newCtrl = require('./controllers/newsportBackCtrl');
var newCommentCtrl = require('./controllers/newsportCommentCtrl');
 
mongoose.connect('mongodb://localhost/testingBackend');



    // MODELS
require('./models/Posts');
require('./models/Comment');
require('./models/Users');


    // NBA MODEL
require('./models/Nba');
require('./models/NbaComment');

    // NFL MODEL
require('./models/Nfl');
require('./models/NflComment');

        // NHL MODEL
require('./models/Nhl');
require('./models/NhlComment');

        //   MLB MODEL
require('./models/Mlb');
require('./models/MlbComment');

        // NEW SPORT MODEL
require('./models/Newsport');
require('./models/NewsportComment');

require('./config/passport');



var routes = require('./routes/index');




var app = express();

// view engine setup
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(cors());
app.use('/', routes);



        
            

        //HOME PAGE
            // POST
            
app.get('/posts', postsCtrl.read);
 app.post('/posts', auth, postsCtrl.createUser);
 app.get('post', postsCtrl.findbyId);   
 app.get('/posts/:post', postsCtrl.postReturn);          
app.put('/posts/:post/upvote', auth, postsCtrl.postUpvote);


//             // COMMENT



app.get('comment', commentCtrl.findyById)            
app.post('/posts/:post/comments', auth,commentCtrl.createComment); 
app.put('/posts/:post/comments/:comment/upvote', commentCtrl.createUpvote); 

         //  NBA           
 app.get('/nba/posts', nbaCtrl.read);
 app.post('/nba/posts', auth, nbaCtrl.createUser);
 app.get('posts', nbaCtrl.findbyId);   
 app.get('/nba/posts/:post', nbaCtrl.postReturn);          
app.put('/nba/posts/:post/upvote', auth, nbaCtrl.postUpvote);                  
//          NBA COMMENT
app.get('comment', nbaCommentCtrl.findyById)            
app.post('/nba/posts/:post/comments', auth,nbaCommentCtrl.createComment); 
app.put('/nba/posts/:post/comments/:comment/upvote', nbaCommentCtrl.createUpvote); 


                // NFL 
 app.get('/nfl/posts', nflCtrl.read);
 app.post('/nfl/posts', auth, nflCtrl.createUser);
 app.get('posts', nflCtrl.findbyId);   
 app.get('/nfl/posts/:post', nflCtrl.postReturn);          
app.put('/nfl/posts/:post/upvote', auth, nflCtrl.postUpvote); 
 
        //    NFL COMMENT
app.get('comment', nflCommentCtrl.findyById)            
app.post('/nfl/posts/:post/comments', auth,nflCommentCtrl.createComment); 
app.put('/nfl/posts/:post/comments/:comment/upvote', nflCommentCtrl.createUpvote);                
                
                
                  // NHL 
 app.get('/nhl/posts', nhlCtrl.read);
 app.post('/nhl/posts', auth, nhlCtrl.createUser);
 app.get('posts', nhlCtrl.findbyId);   
 app.get('/nhl/posts/:post', nhlCtrl.postReturn);          
app.put('/nhl/posts/:post/upvote', auth, nhlCtrl.postUpvote); 
 
        //    NHL COMMENT
app.get('comment', nhlCommentCtrl.findyById)            
app.post('/nhl/posts/:post/comments', auth,nhlCommentCtrl.createComment); 
app.put('/nhl/posts/:post/comments/:comment/upvote', nhlCommentCtrl.createUpvote);                
                 // MLB
 app.get('/mlb/posts', mlbCtrl.read);
 app.post('/mlb/posts', auth, mlbCtrl.createUser);
 app.get('posts', mlbCtrl.findbyId);   
 app.get('/mlb/posts/:post', mlbCtrl.postReturn);          
app.put('/mlb/posts/:post/upvote', auth, mlbCtrl.postUpvote); 
 
        //    MLB COMMENT
app.get('comment', mlbCommentCtrl.findyById)            
app.post('/mlb/posts/:post/comments', auth,mlbCommentCtrl.createComment); 
app.put('/mlb/posts/:post/comments/:comment/upvote', mlbCommentCtrl.createUpvote);  
 
                // NEW SPORT
 app.get('/new/posts', newCtrl.read);
 app.post('/new/posts', auth, newCtrl.createUser);
 app.get('posts', newCtrl.findbyId);   
 app.get('/new/posts/:post', newCtrl.postReturn);          
app.put('/new/posts/:post/upvote', auth, newCtrl.postUpvote); 
 
        //    NEW SPORT COMMENT
app.get('comment', newCommentCtrl.findyById)            
app.post('/new/posts/:post/comments', auth,newCommentCtrl.createComment); 
app.put('/new/posts/:post/comments/:comment/upvote', newCommentCtrl.createUpvote);  
                               
                
            // AUTH
            
// app.post('/login', authCtrl.login);

// app.post('/register', authCtrl.register);        
            










/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err.stack)
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
