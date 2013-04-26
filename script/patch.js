/*jslint indent: 2 */
/*global GOVUK: true*/
/*global document: true*/
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys

if (!Object.keys) {
  Object.keys = (function () {
    var hasProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;
 
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
        throw new TypeError('Object.keys called on non-object');
      }
 
      var result = [],
        prop, i;
 
      for (prop in obj) {
        if (hasProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; (i += 1)) {
          if (hasProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

GOVUK.performance.addToNamespace("getElementsByAttributeFallback", function (attr) {
  var elements = document.getElementsByTagName('*'), i = 0, len, results = [];
  for (i = 0, len = elements.length; i < len; (i += 1)) {
    if (elements[i].getAttribute(attr)) {
      results.push(elements[i]);
    }
  }
  return results;
});

GOVUK.performance.addToNamespace("getElementsByAttribute", function (attr) {
  var results;
  
  if (document.querySelectorAll) {
    results = document.querySelectorAll('[' + attr + ']');
  } else {
    results = GOVUK.performance.getElementsByAttributeFallback(attr);
  }
  
  return results;
});
