var app = angular.module('flapperNews')
app.controller('MainCtrl', [
'$scope',
'posts',
'auth',

function($scope, posts, auth){
  $scope.test = 'Hello world!';
  
$scope.myFilters = [
    {type: '-upvotes'},
    {type: '-comments.length'},
    {type: 'time'},
] 
  
$scope.posts = posts.posts;


$scope.addPost = function(){
    
  if(!$scope.title || $scope.title === '') { return; }
  posts.create({
    title: $scope.title,
    link: $scope.link,
    
  });
  $scope.title = '';
  $scope.link = '';
 
};

$scope.isLoggedIn = auth.isLoggedIn;

$scope.incrementUpvotes = function(post, index) {
  posts.upvote(post).then(function(response){
      $scope.posts [index] = response.data;
  })
};


 

}]);