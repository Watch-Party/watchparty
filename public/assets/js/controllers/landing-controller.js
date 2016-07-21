watchParty.controller('landingController', function($scope, $http, $auth, $window){
  $scope.menuShow = true;
  $scope.upcomingHide = true;
  $scope.delayRoomHide= true;
  $scope.showSelectHide=false;
  $scope.seasonHide= true;
  $scope.hybridRoomHide = true;
  $scope.hybridSeasonHide=true;
  $scope.hybridName = '';
  var hybridChannelName = '';

  // console.log(response);
  var id = JSON.parse(localStorage.getItem('id'));
  console.log(id);
  $http.get('https://wp-spoileralert.herokuapp.com/users/'+ id)
    .then(function(response){
      $scope.userInfo = response;
      $scope.avatarThumb = $scope.userInfo.data.user.avatar_thumb;
      console.log(response)
    })

  $scope.menuFunc = function(){
    $scope.menuShow = !$scope.menuShow;
    console.log(hybridChannelName)
    }
  $scope.searchBarFunc = function(){
    $scope.logoShow =!$scope.logoShow;
    $scope.searchHide =!$scope.searchHide;
  }
  $scope.upcomingFunc = function(){
    $scope.upcomingHide=!$scope.upcomingHide;
  }
  $scope.enterRoomFunc= function(){
    console.log("room");
  }
  $scope.delayedRoomFunc = function(){
  $scope.delayRoomHide = !$scope.delayRoomHide;
  $scope.showSelectHide=false;
  $scope.seasonHide= true;
  }
  $scope.showSelectFunc = function(){
    $scope.showSelectHide= true;
    $scope.seasonHide = false;
  }
  $scope.hybridRoomFunc = function(){
    $scope.hybridRoomHide=!$scope.hybridRoomHide;
    $scope.hybridSeasonHide= true;
    $scope.hybridSelectHide= false;
  }
  $scope.hybridSelectFunc = function(){
    $scope.hybridSeasonHide =! $scope.hybridSeasonHide;
    $scope.hybridSelectHide =! $scope.hybridSelectHide;
  }
  $scope.hybridStartFunc = function(){
    hybridChannelName = $scope.hybridName;

    console.log(hybridChannelName);
  }
  $scope.logOut = function(){
    console.log("click");
  $auth.signOut()
    .then(function(resp) {
      $window.location.href = '#/login';
      console.log("goodbye");
      console.log(resp)
    })
  }


})
