'use strict';

angular.module('UrnaWeb').controller('HeaderController', function($scope, Vote, Auth) {
  $scope.login = Auth.login;
  $scope.logout = Auth.logout;
  Vote.total().then(function(total_votes){
    $scope.total_votes = total_votes;
  });
  Auth.get_auth_payload().then(function(user){
    if(user === null) {
      $scope.signed_in = false;
    } else {
      $scope.signed_in = true;
      $scope.user = user;
    }
  });
  $scope.$on("$firebaseSimpleLogin:logout", function(e, user) {
    $scope.signed_in = false;
  });
  $scope.$on("$firebaseSimpleLogin:login", function(e, user) {
    $scope.signed_in = true;
  });
});