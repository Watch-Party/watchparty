watchParty.controller('loginCtrl', function($scope){


  $scope.login = true;
  $scope.signup = true;

  $scope.showLogin = function(){
    $scope.login = false;
    $scope.signup = true;
  }
  $scope.showSignup = function(){
    $scope.login = true;
    $scope.signup = false;
  }







})
