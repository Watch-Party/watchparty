watchParty.controller('postCtrl', function($scope, $http){

  $scope.submitPost = function() {
    $scope.post = {
        'content': $scope.postContent
    }
    console.log($scope.post);

    // $http.post('https://json-party.herokuapp.com/users/sign_in.json', $scope.post).then(function(post){
    //   console.log(post);
    // })
  }




});
