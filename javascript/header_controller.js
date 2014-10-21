'use strict';

angular.module('UrnaWeb').controller('HeaderController', function($scope, Vote) {
  Vote.total().then(function(total_votes){
    $scope.total_votes = total_votes;
  });
});