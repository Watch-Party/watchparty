var watchParty = angular.module('watchParty', ['ngRoute','ngAnimate']);

watchParty.config(function($routeProvider) {
  $routeProvider

  .when ('/login', {
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  })

  .when ('/landing', {
    templateUrl: 'pages/landing.html',
    controller: 'landingController'
  })

  .when ('/profile', {
    templateUrl: 'pages/profile.html',
  })

  .when ('/feed', {
    templateUrl: 'pages/feed.html',
    controller: 'postCtrl'
  })

  .otherwise({
    redirectTo: '/login'
    });

});
