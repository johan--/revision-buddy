# revisionbuddy

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

Once you get the code run
npm install -g gulp bower yo generator-karma generator-angular
npm install

## Build & development
run gulp bower for adding bower compoents


Run `gulp` for building and `gulp serve` for preview.

## Testing

Running `gulp test` will run the unit tests with karma.


To add any angular component, yo angular documentation and add accordingly example.
Route

Generates a controller and view, and configures a route in app/scripts/app.js connecting them.

Example:

yo angular:route myroute
Produces app/scripts/controllers/myroute.js:

angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
Produces app/views/myroute.html:

<p>This is the myroute view</p>
Explicitly provide route URI

Example:

yo angular:route myRoute --uri=my/route
Produces controller and view as above and adds a route to app/scripts/app.js with URI my/route

Controller

Generates a controller in app/scripts/controllers.

Example:

yo angular:controller user
Produces app/scripts/controllers/user.js:

angular.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
Directive

Generates a directive in app/scripts/directives.

Example:

yo angular:directive myDirective
Produces app/scripts/directives/myDirective.js:

angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});