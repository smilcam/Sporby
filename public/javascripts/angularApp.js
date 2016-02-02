var app = angular.module('flapperNews', ['ui.router']);
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
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
  templateUrl: './javascripts/Template/register.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
});

  $urlRouterProvider.otherwise('home');
  
}]);

            // AUTH FACTORY




            







