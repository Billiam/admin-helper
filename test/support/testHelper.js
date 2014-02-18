/**
 * @module Spec
 * @class TestHelper
 */

/**
 * Add memoized 'local' test helper
 *
 * Previously, `let`, but unusable due to reserved status
 *
 * @method local
 * @param {callback} callback Method returning a value to memoize
 * @param {callback} [teardown] Optional teardown method. Receives value
 * @returns {function}
 * @example
 *     var element = local(function() {
 *       return $('<div id="foobar">').appendTo('body');
 *     }, function($myDiv) {
 *       //cleanup task
 *       $myDiv.delete();
 *     });
 *
 *     //...
 *     it('does something', function() {
 *        var $div = element();
 *     });
 */
var local = function (callback, teardown) {
  var value, called = false;

  var memoizer = function() {
    if (called) {
      return value;
    } else {
      called = true;
    }
 
    return value = callback();
  };

  afterEach(function() {
    if (typeof teardown === 'function') {
        teardown(value);
    }

    value  = undefined;
    called = false;
  });
 
  return memoizer;
};