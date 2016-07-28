watchParty.controller('landingController', function($scope, $http, $auth, $window, showFactory){
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
  var hybridChannelName = '';
  $scope.shows = [{
    showTitle: 'Game of Thrones', episodeId: 18
  }, {
    showTitle: 'Walking Dead', episodeId: 22
  }
];
  $scope.seasons = [{
    episode: 1,
  },
    {episode: 2
  },
    {episode: 3
  }]
  $http.get('https://wp-spoileralert.herokuapp.com/upcoming')
    .then(function(response){

      console.log(response);
    });
    $http.get('https://wp-spoileralert.herokuapp.com/recent')
      .then(function(response){
        $scope.recentShows = response.data.recent_shows
        console.log($scope.recentShows);
      })

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
  $scope.searchBarFunc = function(){
    $scope.buttonsShow = !$scope.buttonsShow;
    $scope.searchBarShow= !$scope.searchBarShow;

  }
  $scope.upcomingFunc = function(){
    $scope.upcomingHide=!$scope.upcomingHide;
    localStorage.setItem('channelType', 'LiveChannel')

  }
  // $scope.setActive = function(show){
  //   $scope.selected= show.episodeId;
  //   console.log($scope.selected);
  //   localStorage.setItem('episodeId', $scope.selected)
  //
  // }
  $scope.setActiveDelay = function(recentShow){
    $scope.selectedShow= recentShow
    console.log($scope.selectedShow);
    $scope.seasons = recentShow.seasons;
    console.log($scope.seasons)
    $scope.episodes = $scope.seasons.episodes
    console.log($scope.episodes);
  }
  $scope.seasonSelectFunc = function(season){
    console.log(season)
      $scope.episodes = $scope.selectedShow.seasons[season].episodes;
      console.log($scope.episodes)

  }
  $scope.startLiveRoomFunc = function(data) {
    localStorage.setItem('typeOfChannel', data)

  }
  $scope.startDelayedFunc = function(dataSeason, dataEpisode){
    localStorage.setItem('season', dataSeason);
    localStorage.setItem('episode', dataEpisode);


  }
  $scope.delayedRoomFunc = function(){
  $scope.delayRoomHide = !$scope.delayRoomHide;
  $scope.showSelectHide=false;
  $scope.seasonHide= true;
  localStorage.setItem('channelType', 'DelayedChannel');
  $scope.seasonOptions.$setPristine;
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
