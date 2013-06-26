/*jslint indent: 2 */
/*global $ */

var GOVUK = GOVUK || {};

GOVUK.performance = GOVUK.performance || {};

GOVUK.performance.stageprompt = (function () {
  var setup;

  setup = function (analyticsCallback) {
    var journeyStage = $('[data-journey]').attr('data-journey'),
        journeyHelpers = $('[data-journey-helper]');
    if (journeyStage) {
      analyticsCallback(journeyStage);
    }
    
    if (journeyHelpers.length) {
      journeyHelpers.on('click', function (event) {
        analyticsCallback($(this).data('journey-helper'));
      });
    }
  };

  return {
    setup: setup
  };
}());
