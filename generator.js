'use strict';

var Generator = {
  rules: {
    i: 'y',
    s: 'z',
    tt: 'xt',
    o: 'au',
    c: 'x',
    en: 'aughn',
    ohn: 'aughn',
    an: 'aughn',
    r: 'rh',
    ph: 'f',
    f: 'ph',
    ew: 'u',
    y: 'i'
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
      if(!found){
        newName += name[0];
        name = name.replace(name[0], '');
      }
    }
    return newName;
  }
};
