"use strict";
define([ 'require',
         'angular',
         'angularfire',
         'common/vote-factory',
         'common/auth-user'], function(require) {

  angular
    .module("viewVote", [
    	"firebase",
      "usersFactoryModule",
      "voteFactoryModule"
      ])
    .controller("voteViewCtrl",[
        "$scope",
        "$document",
        "$firebase",
        "$routeParams",
        "User",
        "Vote",
        function(
          $scope,
          $document,
          $firebase,
          $routeParams,
          User,
          Vote
        ) {

          $scope.slug = $routeParams.slug;
          var authPromise = User().catch(function(error){
            $scope.errorHappened = "Authentication Error";
          });

          var votePromise = Vote($scope.slug).then(
            function (vote) {
              $scope.vote = vote
              $document[0].title += " - " + $scope.vote.title
              $scope.isMulti = vote.mode === 'multi'
              $scope.notFound = !$scope.vote.$value
              if ($scope.notFound) $scope.errorHappened = "404"
            },
            function(error) {
              $scope.errorHappened = "Opps, there is an error happened";
            }
          )

          $scope.voteMe = function () {
            authPromise.then(function(voterId){
              $scope.vote.voteForThis($scope.selected, voterId);
            });
          };
          $scope.getTotalVoters = function() {
            if ($scope.vote) {
              return $scope.vote.getTotalVoters()
            }
          };
          $scope.getVotersDetails = function(index) {
            if ($scope.vote) {
              var votersDetails = $scope.vote.getVotersDetails(index)
              return {
                votersAgree: votersDetails.agreeSize,
                percent: {
                  width: votersDetails.percent  + "%"
                }
              }
            }
          };
        }

      ]

    );
});
