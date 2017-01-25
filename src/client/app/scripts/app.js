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
      .when('/tutorinfo', {
        templateUrl: 'views/tutorinfo.html',
        controller: 'TutorinfoCtrl',
        controllerAs: 'tutorinfo'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope,$location,buddyapi){
      // register listener to watch route changes
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {   
        if(!buddyapi.getLoggedInUser()){
          $location.path('/login')
        }
    });
  })
  .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);;;
