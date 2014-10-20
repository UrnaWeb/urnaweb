'use strict';

angular.module('UrnaWeb').controller('VoteController', function($scope, $state, Vote, User, Auth) {
  $scope.vote = {
    is_private: false
  };
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
          $scope.set_vote = Vote.set({
            party: $scope.vote.party,
            is_private: $scope.vote.is_private
          }, function() {
            $state.transitionTo('application.results');
          });
        });
      } else {
        $scope.set_vote = Vote.set({
          party: $scope.vote.party,
          is_private: $scope.vote.is_private
        }, function() {
          alert('votou');
        });
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
    $scope.vote = {is_private: false};
    $scope.show_confirmation = false;
  }
});