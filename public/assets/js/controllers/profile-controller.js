
watchParty.controller('profileController', function($scope, $http, $auth, $window,$route){
$scope.editShow= true;
$scope.userInfoHide= false;
var id = JSON.parse(localStorage.getItem('id'));
var profileId = JSON.parse(localStorage.getItem('profileId'));

console.log(id);
$http.get('https://wp-spoileralert.herokuapp.com/users/'+ profileId)
  .then(function(response){
    $scope.userInfo = response;
    $scope.avatar = $scope.userInfo.data.user.avatar;
    $scope.firstName = $scope.userInfo.data.user.first_name;
    $scope.lastName = $scope.userInfo.data.user.last_name;
    $scope.screenName = $scope.userInfo.data.user.username;
    $scope.profileId = $scope.userInfo.data.user.id
    $scope.watchers = $scope.userInfo.data.user.watched_by.length;
    $scope.watching = $scope.userInfo.data.user.watching.length;
    $scope.totalPosts = $scope.userInfo.data.user.total_posts;
    if (id === $scope.profileId){
      $scope.thisUser = true;
    }
    else {
      $scope.thisUser = false;

    }
    console.log(response)
  });
  if (profileId === id){
    $scope.contactShow = false;
  }
  else{
    $scope.contactShow=true;
  }

  $scope.editProfileFunc= function(){
    $scope.editShow= !$scope.editShow;
    $scope.userInfoHide= !$scope.userInfoHide;
  }
  // $scope.avatarUpload = ""
  $scope.submitEditFunc = function(){
    var edited = {
      first_name: $scope.firstName,
      last_name: $scope.lastName
      //'remote_avatar_url': $scope.avatarNew
    }
    console.log(edited)


      $auth.updateAccount(edited)
        .then(function(resp) {
          console.log(resp);
          $route.reload();
        })
        .catch(function(resp) {
          // handle error response
        });

    // $http.patch('https://wp-spoileralert.herokuapp.com/auth', $scope.newInfo)
    //   .then(function(response){
    //
    //   });
  }
  $scope.watchUserFunc = function(){
    $http.post('https://wp-spoileralert.herokuapp.com/watch/' + profileId)
    .then(function(response){
      console.log(response);
    });
    };
  });
