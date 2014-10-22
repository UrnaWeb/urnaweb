'use strict';

angular.module('UrnaWeb').controller('HomeController', function(FIREBASE_URL, $scope, $state, Vote, Auth) {
  var firebaseReference = new Firebase(FIREBASE_URL);

  Auth.get_auth_payload().then(function(user){
    var parties = ['pt','psdb','none'];
    _.forEach(parties, function(party) {
      firebaseReference.child('votes').child(party).child(user.uid).once('value', function(snapshot) {
        if(snapshot.val() !== null) {
          $state.transitionTo('application.results');
        }
      });
    });
  }, function(error) {});
});