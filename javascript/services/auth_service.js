'use strict';
angular.module('UrnaWeb').factory('Auth', function(FIREBASE_URL, $q, $firebaseSimpleLogin, $rootScope, $state) {
  var firebaseReference = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(firebaseReference);
  var facebookLoginScope = "email, user_friends, public_profile, publish_actions";

  var Auth = {
    get_auth_payload: function () {
      var deferred = $q.defer();
      simpleLogin.$getCurrentUser().then(deferred.resolve, deferred.reject);
      return deferred.promise;
    },
    login: function (callback) {
      simpleLogin.$login("facebook", {scope: facebookLoginScope}).then(function(userData) {
        firebaseReference.child('users').child(userData.uid).once('value', function(snapshot) {
          if(snapshot.val() !== null) {
            console.log("ja existe");
          } else {
            firebaseReference.child('users').child(userData.uid).set({
              email: userData.thirdPartyUserData.email,
              gender: userData.thirdPartyUserData.gender,
              first_name: userData.thirdPartyUserData.first_name,
              last_name: userData.thirdPartyUserData.last_name,
              picture: userData.thirdPartyUserData.picture.data.url,
              locale: userData.thirdPartyUserData.locale
            });
          };
        });
        if(callback) {
          callback();
        }
      }, function(error) {
        console.error("Login failed: " + error);
      })
    },
    logout: function () {
      simpleLogin.$logout();
    }
  };

  $rootScope.signedIn = function () {
    return Auth.signedIn();
  };

  return Auth;
})