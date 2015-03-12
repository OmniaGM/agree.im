"use strict";
define([ 'require',
         'angular',
         'view-vote/vote',
         'create-vote/create-vote',
         'angular-route'], function(require) {

  angular
    .module("routeConfig", [
    "ngRoute",
    "viewVote",
    "createVote"
    ])
    .config([
      "$routeProvider",
      function($routeProvider) {
        $routeProvider
          .when("/", {
            templateUrl: "assets/js/create-vote/create-vote.html",
            controller: "createVoteCtrl",
            controllerAs: "createVoteCtrl"
          })
          .when("/v/:slug", {
            templateUrl: "assets/js/view-vote/vote.html",
            controller: "voteViewCtrl",
            controllerAs: "voteCtrl"
          })
          .otherwise({
            redirectTo: "/"
          });
      }
    ]);
  });
