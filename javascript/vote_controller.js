'use strict';

angular.module('UrnaWeb').controller('VoteController', function($scope, $state, Vote) {
  $scope.vote = {};
  $scope.confirm_vote = function(party) {
    $scope.show_confirmation = true;
    $scope.vote.party = party;
  }
  $scope.set_vote = Vote.set;
});