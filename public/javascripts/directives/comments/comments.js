angular.module('flappernews')
.directive('commentDirt', function() {
  return {
    templateUrl: "./javascripts/directives/comments/commentTmpl.html",
    restrict: 'E',
    controller: 'commentCtrl',  
}

});