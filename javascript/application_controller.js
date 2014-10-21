'use strict';

angular.module('UrnaWeb').controller('ApplicationController', function($scope, $state, Auth, User) {
  // User.get_profile().then(function(user) {
  //   if(user === null) {
  //     console.log("não logado");
  //   } else {
  //     $scope.user_signed_in = true;
  //   }
  // }, function(error){
  //   $scope.user_signed_in = false;
  // })

  $scope.login = Auth.login;

  $scope.logout = Auth.logout;
});