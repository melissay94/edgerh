(function(){
  angular.module('generator', [])
    .controller('GeneratorController', GeneratorController);

  function GeneratorController($scope){
    var rules = {
      i: 'y',
      s: 'z',
      tt: 'xt',
      ohn: 'aughn',
      o: 'au',
      c: 'x',
      en: 'aughn',
      an: 'aughn',
      r: 'rh',
      ph: 'f',
      f: 'ph',
      ew: 'u',
      y: 'i',
      k: 'qu'
    };

    $scope.name = '';

    function generate(name) {
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

    $scope.$watch('name', function(newValue, oldValue) {
      $scope.display = generate(newValue.toLowerCase());
    });
  }
})();
