
juke.config(function ($stateProvider,$urlRouterProvider, $locationProvider) {

	$urlRouterProvider.when('/', '/albums');

    $stateProvider.state('albumList', {
        url: '/albums',
        templateUrl: '/temps/albums.html',
        controller: function ($scope, $log, $rootScope, PlayerFactory, AlbumFactory) {

			  // $scope.showMe = true;

			  // $scope.$on('viewSwap', function (event, data) {
			  //   $scope.showMe = (data.name === 'allAlbums');
			  // });

			  // $scope.viewOneAlbum = function (album) {
			  //   $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: album._id });
			  // };

			  AlbumFactory.fetchAll()
			  .then(albums => {
			    $scope.albums = albums;
			  })
			  .catch($log.error); // $log service can be turned on and off; also, pre-bound

			}
    });


      $stateProvider.state('album', {
        url: '/album/:id',
        templateUrl: '/temps/album.html',
        controller: function ($scope, $log, PlayerFactory, AlbumFactory,$stateParams) {

          //this is how we access

		    AlbumFactory.fetchById( $stateParams.id)
		    .then(album => {
		      $scope.album = album;
		    })
		    .catch($log.error);

		    $scope.MailShare =function(album){

		     window.location.href = "mailto:foo@bar.com?subject=" + album.name +"subject&body=" + window.location;
		    }

		  // $scope.$on('viewSwap', function (event, data) {
		  //   if (data.name !== 'oneAlbum') return $scope.showMe = false;
		  //   $scope.showMe = true;
		  // });

		  // main toggle
		  $scope.toggle = function (song) {
		    if (song !== PlayerFactory.getCurrentSong()) {
		      PlayerFactory.start(song, $scope.album.songs);
		    } else if ( PlayerFactory.isPlaying() ) {
		      PlayerFactory.pause();
		    } else {
		      PlayerFactory.resume();
		    }
		  };

		  $scope.getCurrentSong = function () {
		    return PlayerFactory.getCurrentSong();
		  };

		  $scope.isPlaying = function (song) {
		    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
		  };

		}
 	});
  $locationProvider.html5Mode(true); 

});
