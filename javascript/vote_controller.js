'use strict';

angular.module('UrnaWeb').controller('VoteController', function($scope, $state, Vote, User, Auth) {
  $scope.vote = {};
  $scope.confirm_vote = function(party) {
    $scope.show_confirmation = true;
    $scope.vote.party = party;
  }
  $scope.set_vote = Vote.set;

  $scope.submit_vote = function() {
    User.get_auth_payload().then(function(user) {
      if(user === null) {
        $scope.login_required = true;
        $scope.$on("$firebaseSimpleLogin:login", function(e, user) {
          console.log("User " + user.uid + " successfully logged in!");
        });
      } else {
        $scope.set_vote = Vote.set({});
      }
    });
  }

  $scope.login = function() {
    Auth.login();
  }

  $scope.logout = function() {
    Auth.logout();
  }

  $scope.cancel_vote = function() {
    $scope.vote = {};
    $scope.show_confirmation = false;
  }
});