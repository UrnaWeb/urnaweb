'use strict';

angular.module('UrnaWeb').controller('VoteController', function($scope, $state, Vote) {
  $scope.vote_data = {};
  $scope.set_vote = Vote.set;
});