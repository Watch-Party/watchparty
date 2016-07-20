watchParty.controller('postCtrl', function($scope, $http, $compile){
  $scope.allPosts= [];
  $scope.submitPost = function() {
    $scope.post =  {
        'content': $scope.postContent,
      };
        $scope.allPosts.push($scope.post);
        console.log($scope.allPosts);
        console.log($scope.post);
        $scope.postContent = '';

  }
  $scope.reset = function(){

  }


    // $http.post('https://json-party.herokuapp.com/users/sign_in.json', $scope.post).then(function(post){
    //   console.log(post);
    // })





});
