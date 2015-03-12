"use strict";
define([ 'require',
         'angular',
         'route-config',
         'angular-route'], function(require) {
  angular
    .module("voteNowApp", [
      "routeConfig"
    ])
  angular
    .bootstrap(document, ["voteNowApp"])
});
