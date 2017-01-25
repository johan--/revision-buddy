var rbuddy_baseurl = "http://localhost:2222";
angular.module('revisionbuddyApp')
  .constant('myConfig', {
      getAccountValidationUrl:function(){
          return "account validation url";
      },
      loginWithUserNameUrl:function(){
          return rbuddy_baseurl+"/api/account/login";
      },
      'accountValidationUrl': function (token) {
      return rbuddy_baseurl + '/api/account/verify?token=' + token;
    },
  });
