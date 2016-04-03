var app = angular.module('flapperNews')
app.controller('MainCtrl', [
'$scope',


function($scope){
 
  
  
$scope.myFilters = [
    {name: 'Most Votes', type: '-upvotes'},
    {name: 'Most Comments' ,type:'-comments.length'},
    {name: 'Recently Posted', type: 'time'},
] 


}]);