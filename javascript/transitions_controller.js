'use strict';

angular.module('UrnaWeb').controller('TransitionsController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $scope.transitionTo = 'to' + toState.name.charAt(0).toUpperCase() + toState.name.substring(1);
    $scope.transitionFrom = 'from' + fromState.name.charAt(0).toUpperCase() + fromState.name.substring(1);
    $scope.resolvingData = true;
    $scope.header_map = toState.header_map;
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.pageTitle = $state.current.title;
    $rootScope.subTitle = $state.current.sub_title;
    $rootScope.$hasPreviousState = _.isEmpty(fromState.name) === false;
    $rootScope.$previousState = fromState;
    $rootScope.$currentState = toState;
    $scope.resolvingData = false;
  });

  $rootScope.$on('toggle_sidebar', function(event, expanded_sidebar) {
    $scope.expanded_sidebar = expanded_sidebar;
  });
}]);
