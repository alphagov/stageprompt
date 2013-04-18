/*jslint indent: 2 */
var GOVUK = GOVUK || {};
GOVUK.performance = {};

GOVUK.performance.addToNamespace = function (name, obj) {
  if (GOVUK.performance[name] === undefined) {
    GOVUK.performance[name] = obj;
  } 
  else {
    throw new Error("There is already a key: '" + name + "' in the namespace.");
  }
};


GOVUK.performance.close = function () {
  GOVUK.performance.addToNamespace = undefined;
  GOVUK.performance.close = undefined;
};
