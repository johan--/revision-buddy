'use strict';

/**
 * @ngdoc service
 * @name revisionbuddyApp.courseViewService
 * @description
 * # courseViewService
 * Service in the revisionbuddyApp.
 */
angular.module('revisionbuddyApp')
  .service('courseViewService', function ($rootScope, $filter) {
    // see if there is course selected by user
    var revisionPacks = [];
    this.selectedPack = {};
    
    this.updateRevisionPackList = function(rpacks){
      revisionPacks = rpacks;
    }
    this.getAvailableRevisionPacks = function(){
      return revisionPacks;
    }
    //TODO: figure out how to select a course
    this.selectRevisionPack = function(revisionPack){
          console.log("pack changed");
          console.log(revisionPack);
          this.selectedPack = revisionPack;
          $rootScope.$broadcast('revisionPackageChanged');
    }
    this.getSelectedRevisionPack = function(){
      return this.selectedPack;
    }
    
  });
