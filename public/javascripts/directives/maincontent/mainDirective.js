angular.module('flapperNews')
.directive('mainDirt', function() {
  var controller = ['$scope', function ($scope) {
  $scope.myFilters = [
    {name: 'Most Votes', type: '-upvotes'},
    {name: 'Most Comments' ,type:'-comments.length'},
    {name: 'Recently Posted', type: 'time'},
] 
  },      
   controller= controller,          
    templateUrl: "./javascripts/directives/maincontent/mainContentTmpl.html"

});