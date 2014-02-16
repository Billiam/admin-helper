/**
 * Add memoized 'local' test helper
 *
 * Previously, `let`, but unusable due to reserved status
 *
 * @param {callback} callback
 * @returns {function}
 */
var local = function (callback) {
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
    value  = undefined;
    called = false;
  });
 
  return memoizer;
};