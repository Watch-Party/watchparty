watchParty.controller('postCtrl', function($scope, $http, $compile){
  $scope.allPosts= [];
  $http.get('https://c2148969.ngrok.io/game_of_thrones/1/1/posts.json').then(function(response){
    console.log(response);
    $scope.getPosts= response.data.posts
    console.log($scope.getPosts)
  })
  $scope.submitPost = function() {
    $scope.post =  {
        'content': $scope.postContent,
      };
        // $filter('orderBy')($scope.post, indexOf, reverse)
        $scope.allPosts.push($scope.post);
        console.log($scope.allPosts);
        console.log($scope.post);
        $scope.postContent = '';

        $http.post('https://c2148969.ngrok.io/game_of_thrones/1/1/posts.json', $scope.post).then(function(post){
          console.log(post);
          $http.get('https://c2148969.ngrok.io/game_of_thrones/1/1/posts.json').then(function(response){
            console.log(response);
            $scope.getPosts= response.data.posts
            console.log($scope.getPosts)
          })
        })
  }


    // $http.post('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json', $scope.post).then(function(post){
    //   console.log(post);
    // })



});

// inspiration from: https://codedump.io/share/Eunu1YNUTbAO/1/angular-ng-repeat-in-reverse //
watchParty.filter('missyElliot', function() {
  return function(items) {
  return items.slice().reverse();
};
});
