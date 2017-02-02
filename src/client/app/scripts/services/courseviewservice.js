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
    var activeContent =null;
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
          activeContent = null;
          // dataLayer.push({
          //           'event': 'courseSelected',
          //           'board': selectedPack.board,
          //           'class': selectedPack.class,
          //           'course_id': selectedPack.course_id,
          //           'subject':selectedPack.subject
          //       });
          $rootScope.$broadcast('revisionPackageChanged');
    }
    this.getSelectedRevisionPack = function(){
      return this.selectedPack;
    }
    this.setActiveContent = function(contentNode){
      activeContent = contentNode;
    }
    this.getActiveContent = function(){
      return this.activeContent;
    }
    this.getActiveContentParentName = function(){
      if(!activeContent) return null;
      return activeContent.parent_name || activeContent.node_name;
    }
  });
