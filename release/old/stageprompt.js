/*jslint indent: 2 */
/*global $ */

var GOVUK = GOVUK || {};

GOVUK.performance = GOVUK.performance || {};

GOVUK.performance.stageprompt = (function () {
  var setup;

  setup = function (analyticsCallback) {
    var journeyStage = $('[data-journey]').attr('data-journey');
    if (journeyStage) {
      analyticsCallback(journeyStage);
    }
  };

  return {
    setup: setup
  };
}());
