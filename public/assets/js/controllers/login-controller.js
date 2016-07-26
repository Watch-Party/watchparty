watchParty.controller('loginCtrl', function($scope, $http, $auth, $window){

  // On load of page: //
  $scope.login = true;
  $scope.signup = true;
  $scope.about = true;
  $scope.loginLoad = false;
  $scope.loginError = false;
  $scope.signupSuccess = false;
  $scope.pwLength = false;

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
        'email': $scope.username,
        'password': $scope.password
    }
    $auth.submitLogin($scope.loginInfo)
        .then(function(response) {
          $scope.loginLoad = true;
          $scope.loginError = false;
          console.log(response);
          localStorage.setItem('id', JSON.stringify(response.id))
          $window.location.href = '#/landing';
        }, function(error) {
          $scope.loginError = true;
        });
    console.log($scope.loginInfo);

    //
    // $http.post('https://wp-spoileralert.herokuapp.com/auth/sign_in.json', $scope.loginInfo).then(function(response){
    //   console.log(response);
    //   console.log(response.headers)
    // })

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
      if ($scope.newPassword.length && $scope.newPassword2.length >= 6) {
      console.log("Passwords match");
      var pwEl1 = angular.element(document.querySelector('.password-signup'));
      var pwEl2 = angular.element(document.querySelector('.re-enter-password'));
      var check = angular.element(document.querySelector('.check'));
      var check2 = angular.element(document.querySelector('.check2'));
      pwEl1.addClass('match');
      pwEl2.addClass('match');
      check.css('visibility', 'visible');
      check2.css('visibility', 'visible');
      $auth.submitRegistration($scope.newUserInfo)
    .then(function(response) {
      $scope.signupSuccess = true;
      // $scope.signup = true;
      console.log(response);
      console.log($scope.newUserInfo);
    })
    }
    else {
      $scope.pwLength = true;
    }
      // $http.post('https://wp-spoileralert.herokuapp.com/auth', $scope.newUserInfo).then(function(newUserInfo){
      //   console.log(newUserInfo);
      // })
    }

  }


})
