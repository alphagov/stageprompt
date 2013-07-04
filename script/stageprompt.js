var GOVUK = GOVUK || {};

GOVUK.performance = GOVUK.performance || {};

GOVUK.performance.stageprompt = (function () {
  var setup, setupForGoogleAnalytics;

  var splitAction = function (action) {
    var parts = action.split(':');
    if (parts.length <= 3) return parts;
    return [parts.shift(), parts.shift(), parts.join(':')];
  };

  setup = function (analyticsCallback) {
    var journeyStage = $('[data-journey]').attr('data-journey'),
        journeyHelpers = $('[data-journey-helper]');

    if (journeyStage) {
      analyticsCallback.apply(null, splitAction(journeyStage));
    }
    
    if (journeyHelpers.length) {
      journeyHelpers.on('click', function (event) {
        analyticsCallback($(this).data('journey-helper'));
      });
    }
  };
  
  setupForGoogleAnalytics = function () {
    setup(GOVUK.performance.sendGoogleAnalyticsEvent);
  };

  return {
    setup: setup,
    setupForGoogleAnalytics: setupForGoogleAnalytics
  };
}());

GOVUK.performance.sendGoogleAnalyticsEvent = function (action) {
  _gaq.push(['_trackEvent', 'stagePrompt', action, undefined, undefined, true]);
};
