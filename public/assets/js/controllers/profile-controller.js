
watchParty.controller('profileController', function($scope, $http, $auth, $window){
$scope.editShow= true;
$scope.userInfoHide= false;

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
  $scope.editProfileFunc= function(){
    $scope.editShow= !$scope.editShow;
    $scope.userInfoHide= !$scope.userInfoHide;
  }
  // $scope.avatarUpload = ""
  $scope.submitNewAvatarFunc = function(){
    $scope.submitNewAvatar = {
      first_name: 238489723
      //'remote_avatar_url': $scope.avatarNew
    }
    console.log($scope.avatarNew)
    console.log($scope.submitNewAvatar)

      $auth.updateAccount($scope.submitNewAvatar)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(resp) {
          // handle error response
        });

    // $http.patch('https://wp-spoileralert.herokuapp.com/auth', $scope.newInfo)
    //   .then(function(response){
    //
    //   });
  }
  });
