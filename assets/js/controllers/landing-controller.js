watchParty.controller('landingController', function($scope, $http){
  $scope.menuShow = true;
  $scope.upcomingHide = true;
  $scope.delayRoomHide= true;
  $scope.showSelectHide=false;
  $scope.seasonHide= true;

  $scope.menuFunc = function(){
    $scope.menuShow = !$scope.menuShow;
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


})
