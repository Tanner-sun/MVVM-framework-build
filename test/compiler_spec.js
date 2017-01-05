'use strict';

var _ = require('lodash');
var complier = require('../js/Complier.js');

describe('MVVM', function() {
  var vm, data;
  beforeEach(function(){
    var script = document.createElement('script')
    script.src = './JSpringMin.js';
    document.body.appendChild(script);
  })

  it('can complier template on HTML and return  new watcher for each directive', function() {
    var aValue = vm.$scope['a'];
    var bValue = vm.$scope['b'];
    var cValue = vm.$scope['c'];
    expect(aValue).toBe(1);
    expect(bValue).toBe('a');
    expect(cValue).toBe(true);
    expect(vm.watchers['a']).toEqual([{}]);
  });


});
