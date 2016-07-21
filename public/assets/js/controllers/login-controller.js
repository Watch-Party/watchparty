watchParty.controller('loginCtrl', function($scope, $http, $auth, $window){

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
        'email': $scope.username,
        'password': $scope.password
    }
    $auth.submitLogin($scope.loginInfo)
        .then(function(response) {
          console.log(response);
          $window.location.href = '#/landing';
        })
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
    $auth.submitRegistration($scope.newUserInfo)
  .then(function(response) {
    console.log(response);
    console.log($scope.newUserInfo);
  })
    $http.post('https://wp-spoileralert.herokuapp.com/auth', $scope.newUserInfo).then(function(newUserInfo){
      console.log(newUserInfo);
    })


  }







})
