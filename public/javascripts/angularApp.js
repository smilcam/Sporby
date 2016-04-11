var app = angular.module('flapperNews', ['ui.router', 'ui.bootstrap']);
app.config([
'$stateProvider',
'$urlRouterProvider',

function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './javascripts/Template/homeTmpl.html',
      controller: 'MainCtrl',
      filter: 'myFilter',
      resolve: {
          postPromise: ['posts', function(posts){
              return posts.getAll();
          }]
      }
    }).state('posts', {
  url: '/posts/{id}',
  templateUrl: './javascripts/Template/post.html',
  controller: 'PostsCtrl',
  resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts){
          return posts.get($stateParams.id);
      }]
  }
}) 


.state('basketball', {
      url: '/basketball',
      templateUrl: '/javascripts/Template/nbaTmpl.html',
      controller: 'nbaCtrl',
      resolve: {
          postPromise:function(nbaFactory){
              return nbaFactory.getAll();
          }
      }
    })
.state('nbaComments', {
      url: '/nbaComments/{id}',
      templateUrl: '/javascripts/Template/nbaCommentTmpl.html',
      controller: 'nbaCommentCtrl',
      resolve: {
          post: ['$stateParams', 'nbaFactory', function($stateParams, nbaFactory){
          return nbaFactory.get($stateParams.id);
          }]
      }
    })
.state('football', {
      url: '/football',
      templateUrl: '/javascripts/Template/nflTmpl.html',
      controller: 'nflCtrl',
      resolve: {
          postPromise:function(nflFactory){
              return nflFactory.getAll();
          }
      }
    })

.state('nflComments', {
      url: '/nflComments/{id}',
      templateUrl: '/javascripts/Template/nflCommentTmpl.html',
      controller: 'nflCommentCtrl',
      resolve: {
          post: ['$stateParams', 'nflFactory', function($stateParams, nflFactory){
          return nflFactory.get($stateParams.id);
          }]
      }
    })

.state('nhl', {
      url: '/nhl',
      templateUrl: '/javascripts/Template/nhlTmpl.html',
      controller: 'nhlCtrl',
      resolve: {
          postPromise:function(nhlFactory){
              return nhlFactory.getAll();
          }
      }
    })
.state('nhlComments', {
      url: '/nhlComments/{id}',
      templateUrl: '/javascripts/Template/nhlCommentTmpl.html',
      controller: 'nhlCommentCtrl',
      resolve: {
          post: ['$stateParams', 'nhlFactory', function($stateParams, nhlFactory){
          return nhlFactory.get($stateParams.id);
          }]
      }
    })
.state('mlb', {
      url: '/mlb',
      templateUrl: '/javascripts/Template/mlbTmpl.html',
      controller: 'mlbCtrl',
      resolve: {
          postPromise:function(mlbFactory){
              return mlbFactory.getAll();
          }
      }
    })
.state('mlbComments', {
      url: '/mlbComment/{id}',
      templateUrl: '/javascripts/Template/mlbCommentTmpl.html',
      controller: 'mlbCommentCtrl',
      resolve: {
          post: ['$stateParams', 'mlbFactory', function($stateParams, mlbFactory){
          return mlbFactory.get($stateParams.id);
          }]
      }
    })
.state('newsport', {
      url: '/newsport',
      templateUrl: '/javascripts/Template/newsportTmpl.html',
      controller: 'newsportCtrl',
      resolve: {
          postPromise:function(newsportFactory){
              return newsportFactory.getAll();
          }
      }
    })    
 .state('newsportComments', {
      url: '/newsportComment/{id}',
      templateUrl: '/javascripts/Template/newsportCommentTmpl.html',
      controller: 'newsportCommentCtrl',
      resolve: {
          post: ['$stateParams', 'newsportFactory', function($stateParams, newsportFactory){
          return newsportFactory.get($stateParams.id);
          }]
      }
    })   
    

.state('nbarules', {
  url: '/nbarules',
  templateUrl: './javascripts/Template/nbarules.html',
})
.state('naismithrules', {
  url: '/naismithrules',
  templateUrl: './javascripts/Template/naismithrules.html',
})
.state('nflrules', {
  url: '/nflrules',
  templateUrl: './javascripts/Template/nflrules.html',
})
.state('originalfootballrules', {
  url: '/originalfootballrules',
  templateUrl: './javascripts/Template/originalfootballrules.html',
})
.state('nhlrules', {
  url: '/nhlrules',
  templateUrl: './javascripts/Template/nhlrules.html',
})
.state('halifaxrules', {
  url: '/halifaxrules',
  templateUrl: './javascripts/Template/halifaxrules.html',
})
.state('mlbrules', {
  url: '/mlbrules',
  templateUrl: './javascripts/Template/mlbrules.html',
})
.state('knickerbockerrules', {
  url: '/knickerbockerrules',
  templateUrl: './javascripts/Template/knickerbockerrules.html',
})

.state('login', {
  url: '/login',
  templateUrl: './javascripts/Template/login.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
})
.state('register', {
  url: '/register',
  templateUrl: './javascripts/Template/login.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
});

  $urlRouterProvider.otherwise('home');
  
  
 
}]);

 app.run(function($rootScope){
      $rootScope.$on('$stateChangeError' ,function(event, toState, toParams, fromState, fromParams, error){
      console.error(error);
  })
  
 });
 
 
 
 
 
 
      // AUTH FACTORY




            







