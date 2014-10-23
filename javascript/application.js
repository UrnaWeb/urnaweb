'use strict';
angular.module('UrnaWeb', ['firebase','ngCookies','ngResource','ngSanitize','ngAnimate','ui.router'])
// Makes Lo-dash / Underscore avaiable at constant level
.constant('_', window._)
.constant('ga', window.ga)
.constant('FIREBASE_URL', 'https://urnaweb.firebaseio.com/')
// Angular app configuration
.config(function($httpProvider, $stateProvider, $urlRouterProvider,$locationProvider) {
  $httpProvider.defaults.headers.common['X-Requested-With'];
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");

  // Application states
  $stateProvider
    .state('application', {
      abstract: true,
      controller: 'ApplicationController',
      templateUrl: 'templates/application/show.html'
    })
      .state('application.home', {
        url: '/',
        templateUrl: 'templates/application/home/show.html',
        controller: 'HomeController'
      })
      .state('application.vote', {
        url: '/votar',
        resolve: {
          totalVotes: function(Vote) {
            return Vote.total();
          }
        },
        controller: 'VoteController',
        templateUrl: 'templates/application/vote/show.html'
      })
      .state('application.results', {
        url: '/resultados',
        resolve: {
          totalVotes: function(Vote) {
            return Vote.total();
          }
        },
        controller: 'ResultsController',
        templateUrl: 'templates/application/results/show.html'
      })
})