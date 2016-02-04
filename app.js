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

            // CONTROLLER TEST
var commentCtrl = require('./controllers/commentCtrl');
var postsCtrl = require('./controllers/postsCtrl');
var authCtrl = require('./controllers/authCtrl');




   
 
mongoose.connect('mongodb://localhost/testingBackend');

require('./models/Posts');
require('./models/Comment');
require('./models/Users');
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



        
            

            ////POST
            
app.get('/posts', postsCtrl.read);

 app.post('/posts', auth, postsCtrl.createUser);
 
 app.get('post', postsCtrl.findbyId);   
 
 app.get('/posts/:post', postsCtrl.postReturn);
            
app.put('/posts/:post/upvote', auth, postsCtrl.postUpvote);


//             // COMMENT



app.get('comment', commentCtrl.findyById)            

app.post('/posts/:post/comments', auth,commentCtrl.createComment); 

app.put('/posts/:post/comments/:comment/upvote', commentCtrl.createUpvote); 




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
