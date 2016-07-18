var watchParty = angular.module('watchParty', ['ngRoute']);

watchParty.config(function($routeProvider) {
  $routeProvider

  .when ('/login', {
    templateUrl: 'pages/login.html',
  })

  .when ('/landing', {
    templateUrl: 'pages/landing.html',
  })

  .when ('/profile', {
    templateUrl: 'pages/profile.html',
  })

  .when ('/feed', {
    templateUrl: 'pages/feed.html',
  })

  .otherwise({
    redirectTo: '/landing'
    });

});
