'use strict';
define(['require',
        'angular',
        'angularfire',
        'common/firebase-service'], function(require) {

    angular
      .module('usersFactoryModule', [
      'firebase',
      'voteFireRefServiceModule'
      ])
      .factory('User',[
        '$firebase',
        'voteFireRef',
        '$q',
        function(
          $firebase,
          voteFireRef,
          $q
        ) {
          return function() {
            var ref = voteFireRef()
            var deferred = $q.defer();

            if (ref.getAuth()) {
              deferred.resolve(ref.getAuth().uid);
            } else{
              ref.authAnonymously(function(error, authData) {
                if (error) {
                  deferred.reject(error);
                }
                deferred.resolve(authData.uid);
              });
            }

            return deferred.promise;
          }
        }
      ])
});
