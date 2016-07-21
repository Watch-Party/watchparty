
watchParty.controller('profileController', function($scope, $http, $auth, $window){


var id = JSON.parse(localStorage.getItem('id'));
console.log(id);
$http.get('https://wp-spoileralert.herokuapp.com/users/'+ id)
  .then(function(response){
    $scope.userInfo = response;
    $scope.avatar = $scope.userInfo.data.user.avatar;
    $scope.firstName = $scope.userInfo.data.user.first_name;
    $scope.lastName = $scope.userInfo.data.user.last_name;
    $scope.screenName = $scope.userInfo.data.user.screen_name;

    console.log(response)
  });
  });
