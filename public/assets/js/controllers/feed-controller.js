watchParty.controller('postCtrl', function($scope, $http, $compile, $location, $anchorScroll){

  var id = JSON.parse(localStorage.getItem('id'));
  console.log(id);
  $http.get('https://wp-spoileralert.herokuapp.com/users/'+ id)
    .then(function(response){
      $scope.userInfo = response;
      $scope.avatarThumb = $scope.userInfo.data.user.avatar_thumb;
      console.log(response)
    })

  $scope.allPosts= [];
  $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
    console.log(response);
    $scope.getPosts= response.data.posts;
    console.log($scope.getPosts);
    var getUl = angular.element(document.querySelector('.postTest'));
    console.log(getUl)
    for (var i = 0; i < response.data.posts.length; i++) {
      getUl[i];
      console.log(getUl);
      console.log(getUl[4]);
      console.log(i);
    }

    // console.log(orig);


  // refresh posts on click //
  // watchParty.directive('scrollDir', function($scope, $anchorScroll, $location) {
    $scope.refreshPosts = function(){

      $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
    // console.log(response);
    $scope.getPosts = response.data.posts;
    console.log(response.data.posts);
    // console.log($scope.getPosts);
    console.log("Refresh");


    var scrollId = getUl[4]; // don't hardcode 0 in every time? //
    $location.hash(scrollId); // what's in () is where function scrolls to //
    $anchorScroll();
    console.log($location.hash());
    console.log($location.hash(scrollId));

        // var x = [];
        // for(var i = 0; i < response.data.posts.length; i++) {
        //   $scope.comeToMe = response.data.posts[2];
        //   // console.log(response.data.posts[2]);
        //   console.log(i);
        // };
        // $scope.scrollId =

        // console.log();

       })
    };
    })


  // };

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
