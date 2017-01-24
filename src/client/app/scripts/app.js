'use strict';

/**
 * @ngdoc overview
 * @name revisionbuddyApp
 * @description
 * # revisionbuddyApp
 *
 * Main module of the application.
 */
angular
  .module('revisionbuddyApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular.filter'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/courseview', {
        templateUrl: 'views/courseview.html',
        controller: 'CourseviewCtrl',
        controllerAs: 'courseview'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
