/*jslint indent: 2 */
var GOVUK = GOVUK || {};
GOVUK.performance = GOVUK.performance || {};

GOVUK.performance.addToNamespace = function (name, obj) {
  if (GOVUK.performance[name] === undefined) {
    GOVUK.performance[name] = obj;
  }
};
