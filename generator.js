
var app = angular.module('edgerhApp', []);

app.controller('GeneratorController', function($scope, $filter, NounList) {

  $scope.name = '';
  $scope.display = '';
  $scope.noun = 'Popcorn';
  $scope.ultimate = 'Popxorhn';

  var rules = {
    i: 'y',
    s: 'z',
    tt: 'xt',
    ohn: 'aughn',
    o: 'au',
    c: 'x',
    en: 'aughn',
    an: 'aun',
    r: 'rh',
    ph: 'f',
    f: 'ph',
    ew: 'u',
    y: 'i',
    k: 'qu'
  }; 

  function generateEdgerhName(name) {
    var newName = "";
      while(name.length > 0) {
        var found = false;
        for(var rule in rules) {
          if(name.indexOf(rule) === 0){
            newName += rules[rule];
            name = name.replace(rule, '');
            found = true;
            break;
          }
        }
        if(name[0] === name[1]){
          name = name.slice(1);
        }
        if(!found){
          newName += name[0];
          name = name.replace(name[0], '');
        }
      }
      return  newName.charAt(0).toUpperCase() + newName.slice(1);
  }

  $scope.getRandomNoun = function() {
    var randomIndex = Math.floor(Math.random() * (NounList.length + 1));
    $scope.noun = (NounList[randomIndex]).charAt(0).toUpperCase() + (NounList[randomIndex]).slice(1);
    $scope.ultimate = generateEdgerhName($scope.noun);
  }

  $scope.$watch('name', function(newValue, oldValue) {
    $scope.display = generateEdgerhName(newValue.toLowerCase());
      
  });


});



