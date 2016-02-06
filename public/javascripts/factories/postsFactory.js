var app = angular.module('flapperNews')

app.factory('posts', ['$http', 'auth', function($http, auth){
  var o = {
    posts: []
  };
            // Show Data
  o.getAll = function() {
      return $http.get('/posts').success(function(data){
          console.log(data);
          angular.copy(data, o.posts);
      });
  }
  
  o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res) {
          
          return res.data;
      });
  };
  
  
    // Save to Database
  o.create = function(post) {
      return $http.post('/posts', post, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
          o.posts.push(data);
      });
  };
  
  o.upvote = function(post){
      console.log(post);
      return $http ({
          method: 'PUT',
          url: '/posts/' + post._id + '/upvote',
          data: {upvotes: post.upvotes + 1},
          headers: {Authorization: 'Bearer ' +      auth.getToken()} 
      }).then(function(response){
          return response;
          
      });
     
      
    //   return $http.put('/posts/' + post._id + '/upvote', null, {
    // headers: {Authorization: 'Bearer ' + auth.getToken(), upvotes: post.upvotes + 1}
    // }).success(function(data){
    //    return data.data;
    //   })
    
  };
  o.addComment = function(id, comment) {
      console.log(comment);
      return $http.post('/posts/' + id + '/comments' , comment, {
    headers: {Authorization: 'Bearer '+ auth.getToken()}
        
    }).then(function(response){
        return response.data;
    })
  };
  
  o.upvoteComment = function(comment, post){
      return $http ({
          method:'PUT',
          url:'/posts/' + post._id + '/comments/' + comment._id + '/upvote',
          data: {upvotes: comment.upvotes +1},
          headers: {Authorization: 'Bearer '+ auth.getToken(), upvotes: comment.upvotes + 1}
      }).then(function(response){
          return response;
      })
      
  }    
      
      
//       return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
//     headers: {Authorization: 'Bearer '+auth.getToken()}
//     }).success(function(data){
//           comment.upvotes += 1;
//       })
//   }
  
  
  
  return o;
}]);