angular.module('app.cardapio')
  .config(routeConfig)

routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {

  $routeProvider
    .when('/cardapio', {
      templateUrl: 'app/cardapio/cardapio.html',
      controller: 'CardapioController'
    })
}