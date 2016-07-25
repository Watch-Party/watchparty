var watchParty = angular.module('watchParty', ['ngRoute', 'ng-token-auth','ipCookie', 'ng-cable' ]);

watchParty.config(function($authProvider) {
     $authProvider.configure({
         apiUrl: 'https://wp-spoileralert.herokuapp.com'
     });
 });
 {
  function persistData(key, val) {}
  function retrieveData(key) {}
  function deleteData(key) {}
}
watchParty.config(function($routeProvider) {
  $routeProvider

  .when ('/login', {
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  })

  .when ('/landing', {
    templateUrl: 'pages/landing.html',
    controller: 'landingController',
    resolve: {
  auth: function($auth) {
    return $auth.validateUser();
    // console.log($auth.validateUser())
  }
}
  })

  .when ('/profile', {
    templateUrl: 'pages/profile.html',
    controller: 'profileController',
    resolve: {
  auth: function($auth) {
    return $auth.validateUser();
  }
}
  })

  .when ('/feed', {
    templateUrl: 'pages/feed.html',
    controller: 'postCtrl',
    resolve: {
  auth: function($auth) {
    return $auth.validateUser();
  }
}
  })

  .otherwise({
    redirectTo: '/login'
    });

});
