var app = angular.module('flapperNews')

app.controller('newsportCommentCtrl', [
'$scope',
'$stateParams',
'newsportFactory',
'post',
'auth',
function($scope, $stateParams, newsportFactory, post, auth){

$scope.post = post;
$scope.pageSize =13; 
$scope.myFilters = [
    {name: 'Most Votes', type: '-upvotes'},
    {name: 'Recently Posted', type: '-time'},
] 

$scope.predicate = "-upvotes";
 $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };



$scope.addComment = function(){
  if($scope.body === '') { return; }
  newsportFactory.addComment(post._id, {
    body: $scope.body,
    author: 'user',
  }).then(function(comment){
      $scope.post.comments.push(comment);
  });
  $scope.body = '';
}


$scope.isLoggedIn = auth.isLoggedIn;

$scope.incrementUpvotes = function(comment, post, index) {
   newsportFactory.upvoteComment(comment, post).then(function(response){
       console.log(response.data);
       $scope.posts[index] = response.data
   })
}   
    

}]);


