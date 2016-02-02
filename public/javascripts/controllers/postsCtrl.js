var app = angular.module('flapperNews')

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
'post',
'auth',
function($scope, $stateParams, posts, post, auth){

$scope.post = post;


$scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post._id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment){
      $scope.post.comments.push(comment);
  });
  $scope.body = '';
}


$scope.isLoggedIn = auth.isLoggedIn;

$scope.incrementUpvotes = function(comment) {
    posts.upvoteComment(post, comment);
}

}]);
