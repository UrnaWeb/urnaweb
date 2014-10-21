'use strict';

angular.module('UrnaWeb').controller('ResultsController', function($scope, $filter, $state, User, Auth, totalVotes) {
  $scope.logout = function() {
    Auth.logout();
  }

  $scope.total_votes = totalVotes;

  $scope.pt_percentage = $filter('number')($scope.total_votes.pt);
  // (100*total_votes.none/total_votes.total)| number:2

});