watchParty.controller('postCtrl', function($scope, $http, $compile, $location, $anchorScroll, ActionCableChannel, $auth, $window, $timeout){

  //Consider opening up a timer when entering a room. using that timer to send a numeric value with every post
  //only show posts with numeric values less than what we are at. Possibly set options where one could set
  //an auto refresh or always be in control.
  // var dispatcher = new WebSocket('wss://wp-spoileralert.herokuapp.com/cable') //Url for socket.
  // dispatcher.onopen = function(){ //init a web socket with a function when connection is open.
  //   console.log("connected")
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
  console.log($scope.allPosts)

  // $http.get('https://wp-spoileralert.herokuapp.com/doctor_who/9/12/posts.json').then(function(response){
  //   $scope.allPosts= response.data.posts
  //   console.log($scope.allPosts)
  //   console.log(response.data.posts)
  // });

  // watchParty.run(function (ActionCableConfig){
  //   ActionCableConfig.wsUri= "wss://wp-spoileralert.herokuapp.com/cable";
  //   ActionCableConfig.autoStart= true;
  // });


var userId = JSON.parse(localStorage.getItem('id'));
// var showName = JSON.parse(localStorage.getItem(''));
// var seasonNumber = JSON.parse(localStorage.getItem('season'));
var episodeId = JSON.parse(localStorage.getItem('episodeId'));
var viewType = localStorage.getItem('typeOfChannel')
var channelType = localStorage.getItem('channelType')
var partyOrNah = localStorage.getItem('partyRoom')
var partyId = localStorage.getItem('partyId')

if (partyOrNah === 'true' && channelType === 'DelayedChannel'){
  var consumer = new ActionCableChannel('PartyChannel', [{episode_id: episodeId}, {user_id: userId}, {viewtype: viewType}, {feed_name: partyId}]); //setting up actioncable var
  console.log('partyChannel')
}
else {
  var consumer = new ActionCableChannel(channelType, [{episode_id: episodeId}, {user_id: userId}, {viewtype: viewType}]); //setting up actioncable var

}

console.log(consumer);

if (channelType === "LiveChannel") {
  $scope.liveLogo = true;
}
else if (channelType === "DelayedChannel") {
  $scope.liveLogo = false;
}

$scope.partyId = partyId;
if (partyId != null) {
  $scope.partyHide = false;
  $scope.showHide = false;
} else {
  $scope.partyHide = true;
  $scope.showHide = true;
  $scope.partyPlay = true;
}



// display show info under nav bar //
// if (episodeId =! null) {
$http.get('https://wp-spoileralert.herokuapp.com/episodes/' + episodeId )
  .then(function(response){
    $scope.feedInfo = response.data;
    console.log(response);
  });


var callback = function(post) {

  console.log(post);
  console.log(post.pops);
  // console.log($scope.userInfo.data.user.watching.length)

  // filter for all vs watching and filters out pops //
  for (var i = 0; i < $scope.userInfo.data.user.watching.length; i++){
    // console.log("HI")
    if ('content' in post && channelType === "LiveChannel" && viewType === "watching" && post.username === $scope.userInfo.data.user.watching[i].username || post.username === $scope.userInfo.data.user.username) {
      console.log('match');
      console.log(i);
      $scope.allPosts.push(post);
    // console.log(post);
    }
    else if ('content' in post && channelType === "PartyChannel" && viewType === "watching" && post.username === $scope.userInfo.data.user.watching[i].username || post.username === $scope.userInfo.data.user.username) {
      console.log('match - party');
      console.log(i);
      $scope.allPosts.push(post);
    // console.log(post);
    }
    else if ('content' in post){
      $scope.allPosts.push(post);
      console.log('else if');
    }
    else {
      // return "true";
      console.log('no match')
      console.log(post);
      // console.log(post);
      // console.log($scope.allPosts)
    }
    console.log('hellllo');
    console.log(post.username);
    console.log($scope.userInfo.data.user.watching[i].username);
}

if (post.pops === 1) {
  post.popS = false;
  console.log(post.pops);
} else {
  post.popS = true;
}

// if (post.pops >= 1) {
//   post.popped = true;
// }
  // console.log(pop);
  //not completely sure what this does yet^^ but its in the docs.
};

// var callbackPop = function(pop) {
//   // var post = {
//   //   content: $scope.postContent
//   // }
//   console.log(pop);
//   // console.log($scope.allPosts)
//   // console.log(pop);
//   //not completely sure what this does yet^^ but its in the docs.
// };
//Thoughts to not forget for Tuesday
//Ping the server with newpost server responds with proper format
// this is what sends a post to the actioncable and displays on screen.


// hide comment bar by default - toggle on click //
$scope.commentShow = false;
$scope.clickComment = function(post) {
  post.commentShow = !post.commentShow;
}

consumer.subscribe(callback).then(function(){

  $scope.submitPost = function(post){
    var post = {
      content: $scope.postContent,
    }
    consumer.send(post, 'post');
    $scope.postContent = '';
    // $scope.allPosts.push(post);
    console.log(post);
    // console.log($scope.allPosts)
  };
  console.log(callback);

  $scope.setPostToPop = function(post){
    console.log(post.post_id)
    var pop = {
      post_id: post.post_id
    }
    console.log(pop.post_id);
    console.log(post);
    post.pops;
    // console.log(post.pop);
    consumer.send(pop, 'pop');
    // console.log(consumer.send(pop, 'pop'));
  }

  // change star class on click //
  $scope.popStar = function(post){
    post.popped = true;
    console.log("click star");
  }

  // $scope.submittedConf = false;
  $scope.formData = {};
  $scope.submitComment = function(post, comment){
    console.log("comment submitted");
    console.log(comment.formData.commentContent);
    console.log(comment);
    var comment = {
      post_id: post.post_id,
      content: comment.formData.commentContent
    }
    consumer.send(comment, 'comment');
    // console.log(comment.formData.commentContent);
    post.submittedConf = true;
    $scope.submitDelay = function() {
      post.submittedConf = false;
      post.commentShow = false;
      // comment.formData.commentContent.$setPristine());
    }
    $timeout($scope.submitDelay, 1200);
    console.log(comment);
  }

  $scope.playClicked = false;
  $scope.startParty = function(){
    var start = {
      content: 'start'
    }
    consumer.send(start, 'start');
    console.log("start party");
    $scope.playClicked = true;
    $scope.partyPlay = true;
  }

});


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


});
  // start of POP stuff //



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
    //   $http.get('https://wp-spoileralert.herokuapp.com/doctor_who/9/12/posts.json').then(function(response){
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

//FILTER WE MAY OR MAY NOT NEED
// // inspiration from: https://codedump.io/share/Eunu1YNUTbAO/1/angular-ng-repeat-in-reverse //
// watchParty.filter('missyElliot', function() {
//   return function(items) {
//   return items.slice().reverse();
// };
// });
