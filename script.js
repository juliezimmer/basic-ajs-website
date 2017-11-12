/*Main app.js file
  Everything in angular js can be considered a module, including the main application.
  The first thing that should be done in an angularjs app is to declare the main application.
  "computer" is the name  of the application. 
  This first line of code initializes the application.
  "computer" should be what ng-app is set equal to in index.html.
  the opening <html> tag should contain ng-app="computer"
  all app dependencies go in the [ ]in angular.module
  declaring ngRoute as a dependency allows the use of $routeProvider in the application. 
  */
var app = angular.module('computerApp', ['ngRoute']); 

/*Routes are defined in this file using a config             function/object.
  This is usually dony by chaining to the angular.module.
  .config could be preceded with app.config.
  ng-route is used for routing and needs to be claimed as a
  dependency in the angular.module. 
  $routeProvider is a dependency injection.
  $routeProvider is being injected into the config method or function.
  $routeProvider also needs too be a parameter or argument in the function that follows the dependency injection.
*/

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    /*This is the first defined route of the application
      The route instructs: when the user goes to /main, load the template, main.html, and use the MainController. */
    .when('/main', {
      templateUrl: "main.html",
      controller: "MainController"
    })
    .when('/about', {
      templateUrl: "about.html",
      controller: "MainController"
    })
    .when('/services', {
      templateUrl: "services.html",
      controller: "ServicesController"
    })
    .when('/contact', {
      templateUrl: "contact.html",
      controller: "ContactController"
    })
    .otherwise({
      redirectTo:'/main'
    })
}])

/*The MainController can also be defined in this same file.
  The first parameter is the controller name: MainController.
  Controller name should have capital letters on all parts of the name.
  The second parameter is the dependency array. 
  In the body of the function is where the logic ofo the controller goes.
  These are all the actions that occur when the controller is called.
          ****************** $SCOPE **********************     
  To use the controller, it needs to have $scope passed into the function as a parameter (injected as a dependency). $scope also needs to be claimed as a dependency for the controller .  
  Different values can ba assigned to the $scope object in the controller.
  $scope can also be accessed in tot view by using {{ }} and putting what is being access in the curly braces. 
        ******************* $HTTP REQUESTS *********************
  $http requests go in the controller and use the $http service, which must be included in the controller as a dependency and injected into the function parameters. 
*/
app.controller("MainController", ["$scope","$http", function ($scope, $http){
      $scope.services = [];
    $http({
      method: 'GET',
      url: '/services.json'
    }).then(function (response){
        $scope.services = response.data;
        console.log(response.data);
    },function error (response) {
        alert("Things didn't go well with this GET request. You'll have to try it again."); 
        console.log(response);
    }); 
}])

app.controller("ServicesController", ["$scope", "$http", function ($scope, $http){
    /*.get defines the http service that is being used
      The first thing in the parens is what the http service should get: the services.json file information.
      .then is followed by a callback function, which only runs after the http.get function has been executed successfully.
      The callback function takes a parameter of response.
      */
      $scope.services = [];
    $http({
      method: 'GET',
      url: '/services.json'
    }).then(function (response){
        console.log(response.data);
    /*This $scope variable is used to display the data (services,    name, id in each object of the array) on the services.html     page. This variable makes the information available for the    services.html view. */
        $scope.services = response.data
      },function error (response) {
        alert("Things didn't go well with this GET request. You'll have to try it again."); 
        console.log(response);
      });
    }])

    
app.controller("ContactController", ["$scope","$http", function($scope, $http){  
  
  $scope.locations = [];
    $http({
      method: 'GET',
      url: '/locations.json'
    }).then(function (response){
        $scope.locations = response.data;
        console.log(response.data);
    },function error (response) {
          alert("Things didn't go well with this GET request. You'll have to try it again."); 
          console.log(response);
      }); 
   }]);