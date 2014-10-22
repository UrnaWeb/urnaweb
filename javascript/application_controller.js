'use strict';

angular.module('UrnaWeb').controller('ApplicationController', function($scope, $rootScope, $state, Auth, User) {
  $scope.login = Auth.login;
  $scope.logout = Auth.logout;
  $rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
    $state.transitionTo('application.home');
  });
});