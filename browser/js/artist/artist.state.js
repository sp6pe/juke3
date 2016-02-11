juke.config(function($stateProvider, $urlRouterProvider, $locationProvider ) {

    $urlRouterProvider.when('/artist/:id', '/artist/:id/albums');


    $stateProvider.state('artistList', {
        url: '/artists',
        templateUrl: '/temps/artists.html',
        resolve: {artists: function(ArtistFactory){
        	return ArtistFactory.fetchAll();
        }},
        controller: function($scope, $log, $rootScope, artists) {

            // $scope.$on('viewSwap', function (event, data) {
            //   if (data.name !== 'allArtists') return $scope.showMe = false;
            //   $scope.showMe = true;
            // });

            // $scope.viewOneArtist = function (artist) {
            //   $rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: artist._id });
            // };

            
                console.log(artists);
			$scope.artists = artists;
                

        }
    });

    // $stateProvider.state('artistList', {
    //     url: '/artists',
    //     templateUrl: '/temps/artists.html',
    //     controller: function($scope, $log, $rootScope, ArtistFactory) {

    //         // $scope.$on('viewSwap', function (event, data) {
    //         //   if (data.name !== 'allArtists') return $scope.showMe = false;
    //         //   $scope.showMe = true;
    //         // });

    //         // $scope.viewOneArtist = function (artist) {
    //         //   $rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: artist._id });
    //         // };

    //         ArtistFactory.fetchAll()
    //             .then(artists => {
    //                 $scope.artists = artists;
    //             })
    //             .catch($log.error);

    //     }
    // });

    $stateProvider.state('artist', {
        url: '/artist/:id',
        templateUrl: '/temps/artist.html',
        controller: function($scope, $log, ArtistFactory, PlayerFactory, $rootScope,$stateParams) {


            // $scope.$on('viewSwap', function(event, data) {

            //     if (data.name !== 'oneArtist') return $scope.showMe = false;
            //     $scope.showMe = true;

                ArtistFactory.fetchById($stateParams.id)
                    .then(artist => {
                        $scope.artist = artist;
                    })
                    .catch($log.error);

            // });

    console.log("Parent --- ",$scope);

            $scope.getCurrentSong = function() {
                return PlayerFactory.getCurrentSong();
            };

            $scope.isPlaying = function(song) {
                return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
            };

            $scope.toggle = function(song) {
                if (song !== PlayerFactory.getCurrentSong()) {
                    PlayerFactory.start(song, $scope.artist.songs);
                } else if (PlayerFactory.isPlaying()) {
                    PlayerFactory.pause();
                } else {
                    PlayerFactory.resume();
                }
            };

            $scope.viewOneAlbum = function(album) {
                $rootScope.$broadcast('viewSwap', {
                    name: 'oneAlbum',
                    id: album._id
                });
            };

        }
    });


//all albums for one artist 

    $stateProvider.state('artist.albums', {
        url: '/albums',
        templateUrl: '/temps/artist_album.html'
      
    });

     $stateProvider.state('artist.songs', {
        url: '/songs',
        templateUrl: '/temps/artist_songs.html'
      
    });

     
     
     $locationProvider.html5Mode(true); 

});










