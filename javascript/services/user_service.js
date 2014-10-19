'use strict';
angular.module('UrnaWeb').factory('User', function(FIREBASE_URL, $q, $rootScope, $firebase, $firebaseSimpleLogin) {
  var firebaseReference = new Firebase(FIREBASE_URL);
  var firebaseUsersReference = new Firebase(FIREBASE_URL + 'users');
  var simpleLogin = $firebaseSimpleLogin(firebaseReference);
  var users = $firebase(firebaseUsersReference);

  var User = {
    get_profile: function () {
      var deferred = $q.defer();
      this.get_auth_payload().then(function (payload) {
        deferred.resolve(payload ? $firebase(firebaseUsersReference.child(payload.uid)).$asObject() : null);
      }, deferred.reject);
      return deferred.promise;
    },
    get_auth_payload: function () {
      var deferred = $q.defer();
      simpleLogin.$getCurrentUser().then(deferred.resolve, deferred.reject);
      return deferred.promise;
    },
    find_by_id: function (uid) {
      if (uid) {
        return $firebase(ref.child(uid)).$asObject();
      }
    }
  };

  return User;
});