watchParty.controller('postCtrl', function($scope, $http, $compile, $location, $anchorScroll, ActionCableChannel, $auth, $window){

  //Consider opening up a timer when entering a room. using that timer to send a numeric value with every post
  //only show posts with numeric values less than what we are at. Possibly set options where one could set
  //an auto refresh or always be in control.
  // var dispatcher = new WebSocket('wss://wp-spoileralert.herokuapp.com/cable') //Url for socket.
  // dispatcher.onopen = function(){ //init a web socket with a function when connection is open.
  //   console.log("connected")
  // }
  // dispatcher.onmessage = function(evt){
  //   console.log(evt);
  //   //dispatcher.close();
  // }
  // var cable = new WebSocket('wss://wp-spoileralert.herokuapp.com/cable');
  // cable.onopen = function() {
  //   console.log("connected")
  //   $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
  //   console.log(response);
  //   // $scope.allPosts= [];
  //   $scope.getPosts= response.data.posts;
  //   //$scope.allPosts.push($scope.getPosts);
  //   console.log($scope.getPosts);
  //   });
  // }
  // cable.onmessage = function(evt){
  //   //console.log(evt)
  // }
  $scope.allPosts = []
  // watchParty.run(function (ActionCableConfig){
  //   ActionCableConfig.wsUri= "wss://wp-spoileralert.herokuapp.com/cable";
  //   ActionCableConfig.autoStart= true;
  // });

var userId = JSON.parse(localStorage.getItem('id'));
var consumer = new ActionCableChannel('FeedsChannel', [{show: 'game_of_thrones', season: 1, episode: 1}, {user_id: userId}]); //setting up actioncable var
var callback = function(post) {
  $scope.allPosts.push(post);
  console.log(post);
  //not completely sure what this does yet^^ but its in the docs.
};
//Thoughts to not forget for Tuesday
//Ping the server with newpost server responds with proper format
// this is what sends a post to the actioncable and displays on screen.
consumer.subscribe(callback).then(function(){
  $scope.submitPost = function(post){
    var post = {
      content: $scope.postContent,
    }
    consumer.send(post, 'post');
    $scope.postContent = '';
    // $scope.allPosts.push(post);
    console.log(post);
    console.log($scope.allPosts)
  };
  console.log(callback);
})
//   var channel = cable.subscribe('FeedsChannel', { received: function(newComment){
//    $scope.allPosts.push(newComment);
//    console.log(newComment);
//    console.log($scope.allPosts);
//
// }});
  // show/hide side menu //
  $scope.menuShow = true;
  $scope.menuFunc = function(){
    $scope.menuShow = !$scope.menuShow;
    console.log("Show/Hide Menu")
  }

  // logout - $auth - redirect to login //
  $scope.logOut = function(){
    console.log("click");
    $auth.signOut()
      .then(function(resp) {
        $window.location.href = '#/login';
        console.log("goodbye");
        console.log(resp)
      })
  }
//function to display avatar
  var id = JSON.parse(localStorage.getItem('id'));
  console.log(id);
  $http.get('https://wp-spoileralert.herokuapp.com/users/'+ id)
    .then(function(response){
      $scope.userInfo = response;
      $scope.avatarThumb = $scope.userInfo.data.user.avatar_thumb;
      console.log(response)
    })


    // var getUl = angular.element(document.querySelector('.postTest'));
    // console.log(getUl)
    // for (var i = 0; i < response.data.posts.length; i++) {
    //   getUl[i];
    //   console.log(getUl);
    //   console.log(getUl[4]);
    //   console.log(i);
    // }

    // console.log(orig);


  // refresh posts on click //
  // watchParty.directive('scrollDir', function($scope, $anchorScroll, $location) {
    // $scope.refreshPosts = function(){
    //   $scope.socketPosts = []
    //   $scope.newPostsRefresh = 0;
    //   $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
    // // console.log(response);
    // $scope.getPosts = response.data.posts;
    // console.log(response.data.posts);
    // // console.log($scope.getPosts);
    // console.log("Refresh");


    // var scrollId = getUl[4]; // don't hardcode 0 in every time? //
    // $location.hash(scrollId); // what's in () is where function scrolls to //
    // $anchorScroll();
    // console.log($location.hash());
    // console.log($location.hash(scrollId));

        // var x = [];
        // for(var i = 0; i < response.data.posts.length; i++) {
        //   $scope.comeToMe = response.data.posts[2];
        //   // console.log(response.data.posts[2]);
        //   console.log(i);
        // };
        // $scope.scrollId =

        // console.log();
    //
    //    })
    // };
    // })


  //// };
  // dispatcher.onmessage = function(evt){
  //   console.log(evt.data);
  //   console.log("sent");
  // }
  // send post to server on submit //
  // $scope.submitPost = function() {
  //   $scope.post =  {
  //       'content': $scope.postContent,
  //     };
  //     // $scope.allPosts.push($scope.post);
  //     console.log($scope.post);
  //     console.log($scope.allPosts);
  //     $scope.postContent = '';
  //     $http.post('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json', $scope.post).then(function(post){
  //         console.log(post);
  //         // $http.get('https://wp-spoileralert.herokuapp.com/game_of_thrones/1/1/posts.json').then(function(response){
  //         //   console.log(response);
  //         //   $scope.getPosts= response.data.posts;
  //         //   console.log($scope.getPosts);
  //         // })
  //       });
  // }


  // // on click of popcorn - active -- for add class //
  // $scope.isActive = false;
  // $scope.activeButton = function() {
  //   $scope.isActive = !$scope.isActive;
  //   console.log("Active click")
  // }


  });

//FILTER WE MAY OR MAY NOT NEED
// // inspiration from: https://codedump.io/share/Eunu1YNUTbAO/1/angular-ng-repeat-in-reverse //
// watchParty.filter('missyElliot', function() {
//   return function(items) {
//   return items.slice().reverse();
// };
// });
