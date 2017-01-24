'use strict';

/**
 * @ngdoc service
 * @name revisionbuddyApp.courseViewService
 * @description
 * # courseViewService
 * Service in the revisionbuddyApp.
 */
angular.module('revisionbuddyApp')
  .service('courseViewService', function ($filter) {
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
      
          // var found = $filter('filter')(revisionPacks, {course_id: course_id}, true);
          // if (found.length) { 
          //     selectedPack = found[0];
          // } else {
          //     toastr.error("Revision package for course_id "+course_id+" not available.");
          // }
          this.selectedPack = revisionPack;
    }
    this.getSelectedRevisionPack = function(){
      return this.selectedPack;
    }
  });
