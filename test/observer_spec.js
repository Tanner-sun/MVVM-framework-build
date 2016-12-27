'use strict';

var _ = require('lodash');
var observer = require('../js/Observer.js');

describe('observer', function() {
  var vm, data;
  beforeEach(function(){
    vm = {
      watchers: {},
      nowWatcher: {},
      $scope: {}
    };
    data = {
      a: 1,
      b: 'a',
      c: true
    };
    observer(vm, data)
  })

  it('can observer data on scope by getter function', function() {
    var aValue = vm.$scope['a'];
    expect(aValue).toBe(2);
    expect(vm.watchers['a']).toEqual([{}]);
  });

  it('can observer data on scope by setter function', function() {
    vm.$scope['a'] = 2;
    expect(vm.$scope['a']).toBe(3);
  });
});
