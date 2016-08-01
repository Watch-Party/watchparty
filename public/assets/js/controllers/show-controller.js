watchParty.controller('showCtrl', function($scope, $http, $compile, $location, $anchorScroll, ActionCableChannel, $auth, $window, $interval){
var showName = localStorage.getItem('showName');
$scope.detailHide = true;

    // $http.get('https://wp-spoileralert.herokuapp.com/Preacher/info')
     $http.get('https://wp-spoileralert.herokuapp.com/'+ showName +'/info')
    .then(function(response){
      $scope.show = response.data.show;
    console.log(response);
  });
  $scope.recentFunc= function(show){
    localStorage.setItem('episodeId', show.recent_id )
    localStorage.setItem('channelType', 'DelayedChannel')

  }
  $scope.upcomingFunc= function(show){
    localStorage.setItem('episodeId', show.upcoming_id )
    localStorage.setItem('channelType', 'LiveChannel')
  }
// var posterDelay = $interval(function(){
//         $('.poster').addClass('posterBack')
//         $('.posterBack').removeClass('poster')
//         $scope.detailHide = true;
//     },2000)

})
watchParty.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
