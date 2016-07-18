watchParty.controller('loginCtrl', function($scope){

  // On load of page: //
  $scope.login = true;
  $scope.signup = true;
  $scope.about = true;

  // Login input fields //
  $scope.showLogin = function(){
    $scope.login = false;
    $scope.signup = true;
    $scope.about = true;
  }

  // Signup input fields //
  $scope.showSignup = function(){
    $scope.login = true;
    $scope.signup = false;
    $scope.about = true;
  }

  // Learn more text //
  $scope.aboutShow = function(){
    $scope.about = false;
    $scope.login = true;
    $scope.signup = true;
  }

  // On submit of GO, log username and password inputs to console //
  $scope.submitLogin = function() {
    var loginInfo = {
      'username': $scope.username,
      'password': $scope.password
    }
    console.log(loginInfo);
  }

  $scope.saveNewUser = function() {
    var newUserInfo = {
      'firstName': $scope.firstName.toLowerCase(),
      'lastName': $scope.lastName.toLowerCase(),
      'email': $scope.email.toLowerCase(),
      'username': $scope.newUsername,
      'password': $scope.newPassword, // authentication here -- if both password values match, send data -- else, outline text box in red //
      'password2': $scope.newPassword2
    }
    console.log(newUserInfo);
  }







})
