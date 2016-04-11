var app = angular.module('flapperNews')
app.controller('nflCtrl', [
'$scope',
'nflFactory',
'auth',

function($scope, nflFactory, auth){
  $scope.pageSize =15; 
  
  
$scope.myFilters = [
    {name: 'Most Votes', type: '-upvotes'},
    {name: 'Most Comments' ,type:'-comments.length'},
    {name: 'Recently Posted', type: '-time'},
] 
 $scope.predicate = "-upvotes";
 $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
  
  
$scope.posts = nflFactory.posts;


$scope.addPost = function(){
    
  if(!$scope.title || $scope.title === '') { return; }
  nflFactory.create({
    title: $scope.title,
    link: $scope.link,
    
  });
  $scope.title = '';
  $scope.link = '';
 
};

$scope.isLoggedIn = auth.isLoggedIn;

$scope.incrementUpvotes = function(post, index) {
    if(post.upvotes = post.upvotes) {

    }
    else {}
    
 nflFactory.upvote(post).then(function(response){
      //$scope.posts [index] = response.data;
  })
};



}]);