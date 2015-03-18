'use strict';
define([ 'require',
         'angular',
         'angularfire',
         'common/firebase-service'], function(require) {

  return angular
  .module('createVote', [
  	'firebase',
  	'voteFireRefServiceModule'
  ]).
  controller('createVoteCtrl', [
    '$scope',
    '$firebase',
    'voteFireRef',
    function(
      $scope,
      $firebase,
      voteFireRef
    ) {
      var votes = voteFireRef().child('v');
      $scope.title = 'My Vote';
      $scope.slug = 'vote-1';
      $scope.mode = 'single';
      $scope.options = [
        {'text': 'Option 1'},
        {'text': 'Option 2'}
      ];

      $scope.check = function(){
        return exists($firebase(votes.child($scope.slug)))
      }

      var exists = function(vote){
        return false // data.$value === null
      }

      var createResult = function(vote) {
        var results = $firebase(voteFireRef().child('r'));
        return results.$push({
          'voteId': vote.$id,
          'results': vote.options
        });
      }

      $scope.save = function(){
        var promise = $firebase(votes.child($scope.slug)).$asObject().$loaded();
        promise.then(function(vote){
          if (exists(vote)) {
            console.log('already exists!!')
            return
          }
          vote.title = $scope.title;
          vote.mode = $scope.mode;
          vote.options = $scope.options;
          createResult(vote).then(function(result){
            vote.resultId = result.key();
            vote.$save();
            $scope.vote = vote;
            console.log('saved');
          });
        });
        promise.catch(function(error){
          console.log('error')
        });
      };
    }
  ]);
});
