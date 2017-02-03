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
    var service = this;
    var revisionPacks = [];
    service.selectedPack = {};
    var activeContent =null;
    service.updateRevisionPackList = function(rpacks){
      revisionPacks = rpacks;
    }
    service.getAvailableRevisionPacks = function(){
      return revisionPacks;
    }
    //TODO: figure out how to select a course
    service.selectRevisionPack = function(revisionPack){
          service.selectedPack = revisionPack;
          activeContent = null;
          dataLayer.push({
                    'event': 'courseSelected',
                    'board': service.selectedPack.board,
                    'class': service.selectedPack.class,
                    'course_id': service.selectedPack.course_id,
                    'subject':service.selectedPack.subject
                });
          $rootScope.$broadcast('revisionPackageChanged');
    }
    service.getSelectedRevisionPack = function(){
      return service.selectedPack;
    }
    service.setActiveContent = function(contentNode){
      activeContent = contentNode;
    }
    service.getActiveContent = function(){
      return service.activeContent;
    }
    service.getActiveContentParentName = function(){
      if(!activeContent) return null;
      return activeContent.parent_name || activeContent.node_name;
    }
  });
