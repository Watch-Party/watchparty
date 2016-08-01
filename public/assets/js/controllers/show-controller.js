watchParty.controller('showCtrl', function($scope, $http, $compile, $location, $anchorScroll, ActionCableChannel, $auth, $window, $interval, $timeout){
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

      $scope.episodes = $scope.orderedSeasons[season - 1].episodes;
      $scope.orderedEpisodes = $scope.orderedSeasons[season - 1].episodes.reverse()
      console.log($scope.episodes);
      console.log($scope.orderedEpisodes);


  }
  $scope.episodeSelectFunc = function(episode,season){
    console.log(season)

    $scope.selectedEpisode = $scope.orderedEpisodes[episode -1];
    localStorage.setItem('episodeId', $scope.selectedEpisode.info.id )
    console.log($scope.selectedEpisode)
  }
  $scope.startAllDelayRoomFunc = function(value) {
    localStorage.setItem('typeOfChannel', 'all')
    localStorage.setItem('channelType', 'DelayedChannel')
    $scope.delayTimerShow =! $scope.delayTimerShow;
    $scope.showContentHide =! $scope.showContentHide;
    localStorage.setItem('partyRoom', $scope.partyRoom);

    if ($scope.partyRoom === true){
      var epId = localStorage.getItem('episodeId')
      $http.get('https://wp-spoileralert.herokuapp.com/party/' + epId)
      .then(function(response){
        localStorage.setItem('partyId', response.data.feed_name)
      })
    }
      $scope.delayCounter = 5;
      $scope.onTimeout = function(){
        $scope.delayCounter--;
        delayTimeout = $timeout($scope.onTimeout,1000);
        console.log($scope.delayCounter)
        if ($scope.delayCounter === 0){
          $timeout.cancel(delayTimeout);

          $window.location.href = '#/feed'

        }
      }
      var delayTimeout = $timeout($scope.onTimeout,1000)
      $scope.landingContentWrapperShow = !$scope.landingContentWrapperShow;
      $scope.delayTimerShow= true;


  }
  $scope.startWatchingDelayRoomFunc = function(value) {
    localStorage.setItem('typeOfChannel', 'watching')
    localStorage.setItem('channelType', 'Delayed')
    $scope.delayTimerShow =! $scope.delayTimerShow;
    $scope.showContentHide =! $scope.showContentHide;
    localStorage.setItem('partyRoom', $scope.partyRoom);

    if ($scope.partyRoom === true){

      $http.get('https://wp-spoileralert.herokuapp.com/party/' + epId)
      .then(function(response){
        localStorage.setItem('partyId', response.data.feed_name)
      })
    }
    $scope.delayCounter = 5;
    $scope.onTimeout = function(){
      $scope.delayCounter--;
      delayTimeout = $timeout($scope.onTimeout,1000);
      console.log($scope.delayCounter)
      if ($scope.delayCounter === 0){
        $timeout.cancel(delayTimeout);

        $window.location.href = '#/feed'

      }
    }
    var delayTimeout = $timeout($scope.onTimeout,1000)
    $scope.landingContentWrapperShow = !$scope.landingContentWrapperShow;
    $scope.delayTimerShow= true;

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
