'use strict';

/**
 * @ngdoc function
 * @name revisionbuddyApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the revisionbuddyApp
 */
angular.module('revisionbuddyApp')
  .controller('HomeCtrl', function ($scope,$location,buddyapi,courseViewService) {
    $scope.revisionPackData = {}
    $scope.rowWiseRevisionPackas = {};
    buddyapi.getRevisionPackData()
      .then(function(data){
        $scope.revisionPackData = data;
        $scope.rowWiseRevisionPackas = chunk(data,4);
        console.log($scope.revisionPackData)
      },function(err){
        //handle error
        console.log(err);
      });
    //onload fetch courseDetails from api
    $scope.getSubjectIcon = function(subject){
      var _sbuName = subject.subject.toLowerCase();
      if(_sbuName == "maths"){
        return "/images/math.png"
      }
      else if(_sbuName == "physics"){
        return "/images/physics.png"
      }
      else if(_sbuName == "biology"){
        return "/images/biology.png"
      }
      else if(_sbuName == "chemistry"){
        return "/images/chemistry.png"
      }
      else{
        //TODO: reutrn soem default course icons.
        return "/images/maths.png";
      }
    }
    $scope.selectSubject = function(subject){
      console.log(subject);
      courseViewService.selectRevisionPack(subject);
      $location.path("/courseview");
    }
    /**
     * board : "CBSE",
      class : "10",
      subject: "Maths",
     */


  var chunk = function(arr, size) {
      var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
        }
      return newArr;
    };
  });
