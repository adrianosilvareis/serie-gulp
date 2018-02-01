angular.module('app.home')
  .config(routing)

routing.$inject = ['$routeProvider'];
function routing($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'hc'
    })
}