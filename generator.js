'use strict';

var Generator = {
  rules: {
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
  },

  generate: function(name) {
    var newName = "";
    while(name.length > 0) {
      var found = false;
      for(var rule in this.rules) {
        if(name.indexOf(rule) === 0){
          newName += this.rules[rule];
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
  },

  buttonClicked: function() {
    var input = document.querySelector('#name');
    var name = input.value.toLowerCase();

    document.querySelector('.title span').textContent = this.generate(name);
  },
  keyup: function(event) {
    if(event.keyCode === 13) {
      this.buttonClicked();
    }
  }
};
