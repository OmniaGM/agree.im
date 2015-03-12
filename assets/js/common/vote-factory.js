'use strict';
define(['require',
        'angular',
        'angularfire',
        'common/firebase-service',
        'underscore'], function(require) {
  angular
    .module('voteFactoryModule', [
    'firebase',
    'voteFireRefServiceModule'
    ])
    .factory("Vote",
      function(
        $FirebaseObject,
        $firebase,
        voteFireRef
      ) {

        function voteMultipleOptType (option, voterId, selected) {
          if (selected) option.voters[voterId] = 1;
          else delete option.voters[voterId];
        };

        function voteSingleOptType (option, voterId, selected) {
          option.voters[voterId] = selected ? 1 : 0;
        };

        var VoteFactory = $FirebaseObject.$extendFactory({
          // methods exist on the prototype
          voteForThis: function(selected, voterId) {
            var vote = this;
            vote.options.map(function(option, i){
              if (!option.voters) option.voters = {}
              if (vote.mode === 'multi') voteMultipleOptType(option, voterId, selected[i])
              else voteSingleOptType(option, voterId, i === selected);
            });
            vote.$save();
          },
          
          getTotalVoters: function() {
            var vote = this,
                totalVoters = 0,
                voters = [];
            _.forEach(this.options, function(option){
              _.forEach(option.voters, function(i, key){
                if (voters.indexOf(key) === -1) {
                  voters.push(key);
                  totalVoters++
                }
              })
            })
            return totalVoters
          },

          getVotersDetails: function(optionIndex){
            var obj = this.options[optionIndex].voters,
                totalVoters = this.getTotalVoters(),
                agreeSize = 0,
                key;

            for (key in obj) {
              if (obj[key] === 1) agreeSize++;
            }

            return {
              "agreeSize": agreeSize,
              "percent": totalVoters !== 0 ? (agreeSize/ totalVoters) * 100 : 0
            }
          }
        });
        return function(slug) {
          var ref = voteFireRef().child("v/" + slug),
              sync = $firebase(ref, { objectFactory: VoteFactory });

          return sync.$asObject().$loaded();
        }
      }
    )
});
