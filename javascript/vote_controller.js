'use strict';

angular.module('UrnaWeb').controller('VoteController', function($scope, $state, Vote) {
  $scope.vote = {};
  $scope.confirm_vote = function(party) {
    $scope.show_confirmation = true;
    $scope.vote.party = party;
  }
  $scope.set_vote = Vote.set;

  $scope.submit_vote = function() {
    $scope.set_vote = Vote.set({});
  }

  $scope.cancel_vote = function() {
    $scope.vote = {};
    $scope.show_confirmation = false;
  }
});