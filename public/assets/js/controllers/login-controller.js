watchParty.controller('loginCtrl', function($scope, $http, $auth, $window){

  // On load of page: //
  $scope.login = true;
  $scope.signup = true;
  $scope.about = true;
  $scope.loginLoad = false;
  $scope.loginError = false;
  $scope.loginErrorServer = false;
  $scope.signupSuccess = false;
  $scope.pwLength = false;
  $scope.check = false;
  $scope.usernameTaken = false;
  $scope.emailTaken = false;

  // Login input fields //
  $scope.showLogin = function(){
    $scope.login = false;
    $scope.signup = true;
    $scope.about = true;

    // clear errors on signup page on click of login button //
    $scope.signupSuccess = false;
    $scope.pwLength = false;
    $scope.check = false;
    $scope.usernameTaken = false;
    $scope.emailTaken = false;

    // clear signup form when heading back to login page //
    // for when user receives error on signup then goes to login and back //
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.email = '';
    $scope.newUsername = '';
    $scope.newPassword = '';
    $scope.newPassword2 = '';
  }

  // Signup input fields //
  $scope.showSignup = function(){
    $scope.login = true;
    $scope.signup = false;
    $scope.about = true;

    // clear errors on login page on click of signup button //
    $scope.loginError = false;

    // clear login form when heading to signup page //
    // for when user receives error on login then heads to signup //
    $scope.username = '';
    $scope.password = '';
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
        })

        .catch(function(response) {
          if (response.errors == "Invalid credentials") {
            $scope.loginError = true;
            console.log(response.errors);
            // $scope.username = '';
            // $scope.password = '';
          }
          // console.log(err);
          // console.log(err.errors);
          // $scope.error.data = {message: error, status: status};
          // console.log($scope.data.error.status);
          console.log(response);
          // console.log(response.status);
          // if (err.errors == "Invalid credentials") {
          //   $scope.loginError = true;
          //   console.log("Inv email/pw!");
          // }
          // else {
          //   $scope.loginErrorServer = true;
          //   console.log("503!")
          // }

        });
    $scope.$on('auth:login-error', function(ev, reason) {
      console.log('auth failed because', reason.errors[0]);
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
      pwEl1.addClass('match');
      pwEl2.addClass('match');
      $scope.check = true;

      $auth.submitRegistration($scope.newUserInfo)
      .then(function(response) {
        $scope.signupSuccess = true;
        // $scope.signup = true;
        console.log(response);
        console.log($scope.newUserInfo);
      })

      .catch(function(response) {
        if (response.data.errors.full_messages == "Screen name has already been taken") {
          $scope.usernameTaken = true;
          console.log("username already taken");
        }
        else if (response.data.errors.full_messages == "Email already in use") {
          $scope.emailTaken = true;
          console.log("email already in use");
        }
        console.log(response);
      })

      }
      else {
        $scope.pwLength = true;
      }



    }

  }


})
