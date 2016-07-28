
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
            // KEEPS OUT FUCKING DOUBLES OF ALL KINDS
            if (newName.length < 3) {
              if (newName.substr(newName.length-(rules[rule]).length, newName.length) != rules[rule]) 
                newName += rules[rule];
            } else {
              if (newName.substr(newName.length-(rules[rule]).length, newName.length-1) != rules[rule]) 
                newName += rules[rule];
            }

            name = name.replace(rule, '');
            found = true;
            break;
          }
        }
        if(!found){
          // YOU FUCKERS TOO, NO DOUBLES
          if (newName[newName.length-1] != name[0])
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



