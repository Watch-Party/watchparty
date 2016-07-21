watchParty.controller('postCtrl', function($scope, $http, $compile, $location, $anchorScroll){
  $scope.allPosts= [];
  $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
    console.log(response);
    $scope.getPosts= response.data.posts;
    console.log($scope.getPosts);
  })

  // refresh posts on click //
  $scope.refreshPosts = function(){
  $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
    // console.log(response);
    $scope.getPosts= response.data.posts;
    // console.log($scope.getPosts);

     var x = response.data.posts[23];
     console.log(x);
    var el = angular.element(document.querySelector('.message-bar'));
    $location.hash(x);
    $anchorScroll();
    console.log("Refresh");
    console.log(response.data.posts);

    })

  };

  // send post to server on submit //
  $scope.submitPost = function() {
    $scope.post =  {
        'content': $scope.postContent,
      };

        $scope.allPosts.push($scope.post);
        console.log($scope.allPosts);
        console.log($scope.post);
        $scope.postContent = '';

        $http.post('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json', $scope.post).then(function(post){
          console.log(post);
          $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
            console.log(response);
            $scope.getPosts= response.data.posts;
            console.log($scope.getPosts);
          })
        })
  }

});

// inspiration from: https://codedump.io/share/Eunu1YNUTbAO/1/angular-ng-repeat-in-reverse //
watchParty.filter('missyElliot', function() {
  return function(items) {
  return items.slice().reverse();
};
});
