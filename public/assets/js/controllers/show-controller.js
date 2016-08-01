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
  $scope.seasonSelectFunc = function(season){
    console.log(season)
      $scope.orderedSeasons = $scope.show.seasons.reverse()
      console.log($scope.orderedSeasons)
      $scope.orderedEpisodes = $scope.orderedSeasons[season - 1].episodes;
      $scope.episodes = $scope.orderedEpisodes;
      console.log($scope.episodes);

  }
  $scope.episodeSelectFunc = function(episode,season){
    console.log(season)

    $scope.selectedEpisode = $scope.episodes[episode -1];
    localStorage.setItem('episodeId', $scope.selectedEpisode.info.id )
    console.log($scope.selectedEpisode)
  }
  $scope.startAllDelayRoomFunc = function(value) {
    localStorage.setItem('typeOfChannel', 'all')
    localStorage.setItem('channelType', 'Delayed')
  }
  $scope.startWatchingDelayRoomFunc = function(value) {
    localStorage.setItem('typeOfChannel', 'watching')
    localStorage.setItem('channelType', 'Delayed')

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
