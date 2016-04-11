var app = angular.module('flapperNews')

app.factory('nhlFactory', ['$http', 'auth', function($http, auth){
  var o = {
    posts: []
  };
            // Show Data
  o.getAll = function() {
      return $http.get('/nhl/posts').success(function(data){
          angular.copy(data, o.posts);
      });
  }
  
  o.get = function(id) {
      return $http.get('/nhl/posts/' + id).then(function(res) {
          
          return res.data;
      });
  };
  
  
    // Save to Database
  o.create = function(post) {
      return $http.post('/nhl/posts', post, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
          o.posts.push(data);
      });
  };
  
  o.upvote = function(post){    
      return $http ({
          method: 'PUT',
          url: '/nhl/posts/' + post._id + '/upvote',
          data: {upvotes: post.upvotes + 1},
          headers: {Authorization: 'Bearer ' +      auth.getToken()} 
      }).then(function(response){
          return response;
          
      });
     

    
  };
  o.addComment = function(id, comment) {
      console.log(comment);
      return $http.post('/nhl/posts/' + id + '/comments' , comment, {
    headers: {Authorization: 'Bearer '+ auth.getToken()}
        
    }).then(function(response){
        return response.data;
    })
  };
  
  o.upvoteComment = function(comment, post){
      return $http ({
          method:'PUT',
          url:'/nhl/posts/' + post._id + '/comments/' + comment._id + '/upvote',
          data: {upvotes: comment.upvotes +1},
          headers: {Authorization: 'Bearer '+ auth.getToken(), upvotes: comment.upvotes + 1}
      }).then(function(response){
          return response;
      })
      
  }    
      
      

  
  
  return o;
}]);