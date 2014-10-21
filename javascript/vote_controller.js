'use strict';

angular.module('UrnaWeb').controller('VoteController', function($scope, $state, Vote, User, Auth, totalVotes) {
  User.get_auth_payload().then(function(user) {
    if(user === null) {
      $scope.login_required = true;
    }
  });
  $scope.vote = {
    is_private: false
  };
  $scope.confirm_vote = function(party) {
    $scope.show_confirmation = true;
    $scope.vote.party = party;
  }
  $scope.set_vote = Vote.set;

  $scope.submit_vote = function() {
    $scope.set_vote = Vote.set({
      party: $scope.vote.party,
      is_private: $scope.vote.is_private
    }, function() {
      $scope.vote_confirmed = true;
      var audio = new Audio('urna.mp3');
      audio.play();
    });
  }

  $scope.login = function() {
    Auth.login(function() {
      $scope.set_vote = Vote.set({
        party: $scope.vote.party,
        is_private: $scope.vote.is_private
      }, function() {
        $scope.vote_confirmed = true;
        var audio = new Audio('urna.mp3');
        audio.play();
      });
    });
  }

  $scope.logout = function() {
    Auth.logout();
  }

  $scope.cancel_vote = function() {
    $scope.vote = {is_private: false};
    $scope.show_confirmation = false;
  }

  Vote.total().then(function(something){
    $scope.total_votes = something;
  });
});