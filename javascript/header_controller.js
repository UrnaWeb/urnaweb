'use strict';

angular.module('UrnaWeb').controller('HeaderController', function($scope, Vote, Auth) {
  $scope.login = Auth.login;
  $scope.logout = Auth.logout;
  Vote.total().then(function(total_votes){
    $scope.total_votes = total_votes;
  });
});