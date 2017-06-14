
var app = angular.module('edgerhApp', []);

app.controller('GeneratorController', function($scope, $filter, NounList) {

  $scope.name = '';
  $scope.display = '';
  $scope.calculation = '';
  $scope.noun = 'Popcorn';
  $scope.ultimate = 'Popxorhn';
  $scope.ultimateCalc = '';

  var rules = {
    i: 'y',
    s: 'z',
    tt: 'xt',
    ohn: 'aughn',
    o: 'au',
    cks: 'x',
    ck: 'x',
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

  var letters = {
    a: 1, e: 1, i: 1, o: 1, u: 1, r: 1, s: 1, t: 1, l: 1, n: 1, 
    d: 2, g: 2, b: 3, c: 3, m: 3, p: 3, f: 4, h: 4, v: 4, w: 4, 
    y: 4, k: 5, j: 8, x: 8, q: 10, z: 10
  };

 $scope.sayName = function(name){
    responsiveVoice.speak(name, "UK English Female");
  }

  function generateEdgerhName(name, type) {
    var newName = "";
    var copyName = name;
    var changeCounter = 0;

      while(name.length > 0) {
        var found = false;
        for(var rule in rules) {
          if(name.indexOf(rule) === 0){
            // KEEPS OUT DOUBLES OF ALL KINDS
            if (newName.length < 3) {
              if (newName.substr(newName.length-(rules[rule]).length, newName.length) != rules[rule]) 
                newName += rules[rule];
            } else {
              if (newName.substr(newName.length-(rules[rule]).length, newName.length-1) != rules[rule]) 
                newName += rules[rule];
            }
            changeCounter++;
            name = name.replace(rule, '');
            found = true;
            break;
          }
        }
        if(!found){
          // YOU TOO, NO DOUBLES
          if (newName[newName.length-1] != name[0]) {
            newName += name[0];
          }

          name = name.replace(name[0], '');
        }
      }
      // Checks which edgerh part is generating a name first to assign it to the proper variable
      if (type != "random")
        $scope.calculation = calculateEdgerhScore(copyName, newName, changeCounter);
      else
        $scope.ultimateCalc = calculateEdgerhScore(copyName, newName, changeCounter);

      return  newName.charAt(0).toUpperCase() + newName.slice(1);
  }

// Calculates how much edgier Edgerh made your name
  function calculateEdgerhScore(name, newName, changes) {
    if (name.length >= 30)
      return "Name is too long to be edgy";

    if (name === NaN || name === undefined || name.length === 0)
      return "";

    var newScore = 0;
    var score = 0;

    // Calculates the difference in length, if the newName is longer, there is an ever increasing penalty
    newScore = name.length - newName.length;
    if (newScore < 0)
      newScore * 2;

    // There's an increase for each change made
    newScore += changes;

    // Calculates the values of the letters in the name
    for( var i = 0; i < name.length; i++) {
      if (letters[name[i]] >= 0)
        score += letters[name[i]];
    }

    for (var i = 0; i < newName.length; i++) {
      if (letters[newName[i]] >= 0) 
        newScore += letters[newName[i]];
    }

    // Calculates the new edginess as a multiplier on the old name
    var totalEdge = Math.round(newScore/score * 100)/100;

    // If a name is 1 or less times edgier, then their name was already edgy.
    name = name.charAt(0).toUpperCase() + name.slice(1)
    if (totalEdge <= 1)
      return name + " is already as edgy as it gets. Congrats!";

    // Else they return the final score
    newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    return newName + " is " + totalEdge + " times edgierh than the old version. Awesome!";
  };

  $scope.getRandomNoun = function() {
    var randomIndex = Math.floor(Math.random() * (NounList.length + 1));
    $scope.noun = (NounList[randomIndex]).charAt(0).toUpperCase() + (NounList[randomIndex]).slice(1);
    $scope.ultimate = generateEdgerhName($scope.noun, "random");
  }

  $scope.$watch('name', function(newValue, oldValue) {
    $scope.display = generateEdgerhName(newValue.toLowerCase(), "written");
  });


});



