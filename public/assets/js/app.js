var watchParty = angular.module('watchParty', ['ngRoute', 'ng-token-auth','ipCookie', 'ngActionCable', ]);


watchParty.config(function($authProvider) {
     $authProvider.configure({
       //apiUrl: 'https://281f92a2.ngrok.io'
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
  .when ('/show', {
    templateUrl: 'pages/show.html',
    controller: 'showCtrl',
    resolve: {
  auth: function($auth) {
    return $auth.validateUser();
    // console.log($auth.validateUser())
  }
}
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
watchParty.filter('userSearch', function() {
  return function(items){
    if ('email' in items){
      return items;
      console.log("filtering")
    }
  }

console.log("not filtering")
});
