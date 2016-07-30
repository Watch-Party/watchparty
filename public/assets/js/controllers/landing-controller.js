watchParty.controller('landingController', function($scope, $http, $auth, $window, $timeout, showFactory){
  $scope.menuShow = true;
  $scope.upcomingHide = true;
  $scope.delayRoomHide= true;
  $scope.showSelectHide=false;
  $scope.seasonHide= true;
  $scope.hybridRoomHide = true;
  $scope.hybridSeasonHide=true;
  $scope.hybridName = '';
  $scope.buttonsShow = true;
  $scope.searchBarShow=false;
  $scope.landingContentWrapperShow = true;
  $scope.delayTimerShow = false;
  var hybridChannelName = '';
  var id = JSON.parse(localStorage.getItem('id'));
  console.log($scope.partyRoom);
//   $scope.shows = [{
//     showTitle: 'Game of Thrones', episodeId: 18
//   }, {
//     showTitle: 'Walking Dead', episodeId: 22
//   }
// ];
//   $scope.seasons = [{
//     episode: 1,
//   },
//     {episode: 2
//   },
//     {episode: 3
//   }]
  $http.get('https://wp-spoileralert.herokuapp.com/upcoming')
    .then(function(response){
      $scope.upcomingShows = response.data.upcoming;

      console.log($scope.upcomingShows);
    });
    $http.get('https://wp-spoileralert.herokuapp.com/recent')
      .then(function(response){
        $scope.recentShows = response.data.recent_shows
        console.log($scope.recentShows);
      })
      $http.get('https://wp-spoileralert.herokuapp.com/search/init')
        .then(function(response){
          $scope.popularShows = response.data.popular
          // popularShows.push(response.data.popular);
          console.log(response)
        });

  // console.log(response);
  var id = JSON.parse(localStorage.getItem('id'));
  console.log(id);
  $http.get('https://wp-spoileralert.herokuapp.com/users/'+ id)
    .then(function(response){
      $scope.userInfo = response;
      $scope.avatarThumb = $scope.userInfo.data.user.avatar_thumb;
      console.log(response)
    })

  $scope.menuFunc = function(){
    $scope.menuShow = !$scope.menuShow;
    console.log(hybridChannelName)
    }
    $scope.profileSet = function(){
      localStorage.setItem('profileId', id)
    }
  $scope.searchBarFunc = function(){
    $scope.buttonsShow = !$scope.buttonsShow;
    $scope.searchBarShow= !$scope.searchBarShow;

  }
  $scope.goToProfile = function(user){
    localStorage.setItem('profileId', user.id)

  }
  $scope.upcomingFunc = function(){
    $scope.upcomingHide=!$scope.upcomingHide;
    localStorage.setItem('channelType', 'LiveChannel')

  }
  $scope.setActive = function(show){
    localStorage.setItem('title', show.title);
    localStorage.setItem('episodeId', show.id)
    console.log($scope.selected);
  }
  $scope.setActiveDelay = function(recentShow){
    $scope.selectedShow= recentShow
    console.log($scope.selectedShow);
    $scope.seasons = recentShow.seasons;
    console.log($scope.seasons)
    $scope.episodes = $scope.seasons.episodes
    console.log($scope.episodes);
    localStorage.setItem('title', recentShow.title);
  }
  $scope.seasonSelectFunc = function(season){
    console.log(season)
      $scope.episodes = $scope.selectedShow.seasons[season].episodes;
      console.log($scope.episodes)

  }
  $scope.startAllLiveRoomFunc = function(value) {
    localStorage.setItem('typeOfChannel', 'all')
    $window.location.href = '#/feed'

  }
  $scope.startWatchingLiveRoomFunc = function(value) {
    localStorage.setItem('typeOfChannel', 'watching')
    $window.location.href = '#/feed'

  }
  $scope.startDelayedFunc = function(dataSeason, dataEpisode){
    localStorage.setItem('season', dataSeason);
    localStorage.setItem('episode', dataEpisode);
    var spaceShowName = localStorage.getItem('title');
    var showName = spaceShowName.replace(/\s+/g, '_');
    console.log($scope.partyRoom);
    localStorage.setItem('partyRoom', $scope.partyRoom);
    console.log(showName)
    $http.get('https://wp-spoileralert.herokuapp.com/' + showName + '/' + dataSeason + '/' + dataEpisode)
      .then(function(response){
        console.log(response)
        var epId = response.data.episode_id;
        localStorage.setItem('episodeId', epId);
        if ($scope.partyRoom === true){

          $http.get('https://wp-spoileralert.herokuapp.com/party/' + epId)
          .then(function(response){
            localStorage.setItem('partyId', response.data.feed_name)
          })
        }
      })
    $scope.delayCounter = 5;
    $scope.onTimeout = function(){
      $scope.delayCounter--;
      delayTimeout = $timeout($scope.onTimeout,1000);
      console.log($scope.delayCounter)
      if ($scope.delayCounter === 0){
        $window.location.href = '#/feed'
        $timeout.cancel(delayTimeout);

      }
    }
    var delayTimeout = $timeout($scope.onTimeout,1000)
    $scope.landingContentWrapperShow = !$scope.landingContentWrapperShow;
    $scope.delayTimerShow= true;


  }
  $scope.delayedRoomFunc = function(){
  $scope.delayRoomHide = !$scope.delayRoomHide;
  $scope.showSelectHide=false;
  $scope.seasonHide= true;
  localStorage.setItem('channelType', 'DelayedChannel');
  console.log($scope.partyRoom);

  // $scope.seasonEpisodeForm.$setPristine;
  // console.log($scope.seasonEpisodeForm)
  }
  $scope.showSelectFunc = function(){
    $scope.showSelectHide= true;
    $scope.seasonHide = false;
  }
  $scope.hybridRoomFunc = function(){
    $scope.hybridRoomHide=!$scope.hybridRoomHide;
    $scope.hybridSeasonHide= true;
    $scope.hybridSelectHide= false;
  }
  $scope.hybridSelectFunc = function(){
    $scope.hybridSeasonHide =! $scope.hybridSeasonHide;
    $scope.hybridSelectHide =! $scope.hybridSelectHide;
  }
  $scope.hybridStartFunc = function(){
    hybridChannelName = $scope.hybridName;

    console.log(hybridChannelName);
  }
  $scope.watchUserFunc = function(user){
    $scope.userSelected = user.id;
    // console.log($scope.userSelected);
    $http.post('https://wp-spoileralert.herokuapp.com/watch/' + $scope.userSelected).then(function(response){
      console.log(response);

    })
  }
  $scope.logOut = function(){
    console.log("click");
  $auth.signOut()
    .then(function(resp) {
      $window.location.href = '#/login';
      console.log("goodbye");
      console.log(resp)
    })
  }
  $scope.usersSearch =[];
  $scope.search = function(searchInput){
    $http.get('https://wp-spoileralert.herokuapp.com/search?criteria=' + '"' + $scope.searchInput + '"')
      .then(function(response){
        $scope.usersSearchResults = response.data.results
        console.log($scope.usersSearchResults)
        if ($scope.usersSearchResults.length > 0){
          //$scope.usersSearch.push($scope.usersSearchResults)
          console.log($scope.usersSearchResults);
        }
        console.log(response);
      })
    console.log($scope.searchInput);
    console.log("Get request goes here to search things");

  };


})
watchParty.filter('userSearch', function() {
  return function(user){
    if ('email' in user){
      return items;
      console.log("filtering")
    }
  }

console.log("not filtering")
});
