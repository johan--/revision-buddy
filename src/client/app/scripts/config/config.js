var rbuddy_baseurl = "http://35.154.115.164:2222";
// var rbuddy_baseurl = "http://localhost:2222";
angular.module('revisionbuddyApp')
  .constant('myConfig', {
      getAccountValidationUrl:function(){
          return "account validation url";
      },
      loginWithUserNameUrl:function(){
          return rbuddy_baseurl+"/api/account/login";
      },
      'accountValidationUrl': function (token) {
        return rbuddy_baseurl + '/api/account/token?token=' + token;
      },
      getTocUrl: function(course_id){
          return rbuddy_baseurl+'/api/revisionpack/toc/course/'+course_id;
      },
      getTocpdfUrl:function(filename){
          return rbuddy_baseurl+'/api/revisionpack/s3readrequest/sign?filename='+filename;
      },
      getTutorInfoUrl:function(tutor_id){
          return rbuddy_baseurl+'/api/tutorinformation/details/tutorid/'+tutor_id;
      }
  });
