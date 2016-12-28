'use strict';

var _ = require('lodash');
var complier = require('../js/Complier.js');

describe('observer', function() {
  var vm, data;
  beforeEach(function(){
    vm = {
      watchers: {},
      nowWatcher: {},
      $scope: {}
    };
    template = document.createElement('div');
    div = document.createElement('div')
    template.appendChild(div);
    div.setAttribute("m-text","text1")
    div.setAttribute("m-modle","text2")
    div.setAttribute("display","block")
    div.setAttribute("class","divclass")

    complier(vm, template)
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
