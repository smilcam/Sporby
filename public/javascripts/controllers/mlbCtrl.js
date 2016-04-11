var app = angular.module('flapperNews')
app.controller('mlbCtrl', [
'$scope',
'mlbFactory',
'auth',

function($scope, mlbFactory, auth){
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
  
  
$scope.posts = mlbFactory.posts;


$scope.addPost = function(){
    
  if(!$scope.title || $scope.title === '') { return; }
  mlbFactory.create({
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
    
  mlbFactory.upvote(post).then(function(response){
      
  })
};



}]);