var app = angular.module('flapperNews')

app.filter('myFilter', function(){
    return function(data,start) {   
   return data.slice(start);       
    }
})
