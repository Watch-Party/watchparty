watchParty.controller('loginCtrl', function($scope, $http){

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
    $scope.loginInfo = {
      "user": {
        'email': $scope.username,
        'password': $scope.password
    }}
    console.log($scope.loginInfo);

    $http.post('https://wp-spoileralert.herokuapp.com/auth/sign_in', $scope.loginInfo).then(function(loginInfo){
      console.log(loginInfo);
    })
  }

  $scope.saveNewUser = function() {
    $scope.newUserInfo = {
      'first_name': $scope.firstName,
      'last_name': $scope.lastName,
      'email': $scope.email.toLowerCase(),
      'screen_name': $scope.newUsername.toLowerCase(),
      'password': $scope.newPassword, // authentication here -- if both password values match, send data -- else, outline text box in red //
      'password_confirmation': $scope.newPassword2
    }
    console.log($scope.newUserInfo);

    if($scope.newPassword != $scope.newPassword2) {
      console.log("Passwords don't match");
      // alert("Passwords don't match.")
      var pwEl1 = angular.element(document.querySelector('.password-signup'));
      var pwEl2 = angular.element(document.querySelector('.re-enter-password'));
      pwEl1.addClass('dont-match');
      pwEl2.addClass('dont-match');
    }
    else {
      console.log("Passwords match");
      var pwEl1 = angular.element(document.querySelector('.password-signup'));
      var pwEl2 = angular.element(document.querySelector('.re-enter-password'));
      var check = angular.element(document.querySelector('.check'));
      var check2 = angular.element(document.querySelector('.check2'));
      pwEl1.addClass('match');
      pwEl2.addClass('match');
      check.css('visibility', 'visible');
      check2.css('visibility', 'visible');
      $http.post('https://wp-spoileralert.herokuapp.com/auth', $scope.newUserInfo).then(function(newUserInfo){
        console.log(newUserInfo);
      })
    }




  }


})
