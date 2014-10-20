'use strict';
angular.module('UrnaWeb').factory('Vote', function(FIREBASE_URL, $q, $firebaseSimpleLogin, $rootScope, $state) {
  var firebaseReference = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(firebaseReference);

  var get_auth_payload = function () {
      var deferred = $q.defer();
      simpleLogin.$getCurrentUser().then(deferred.resolve, deferred.reject);
      return deferred.promise;
    }

  var Vote = {
    set: function (vote_hash, callback) {
      get_auth_payload().then(function (payload) {
        firebaseReference.child('votes').child(payload.uid).set({
          "party": vote_hash.party,
          "is_private": vote_hash.is_private
        })
        if(callback) {
          callback();
        }
      });
    }
  };

  return Vote;
})