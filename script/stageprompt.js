/* Stageprompt 2.0.1
*  =================
*
*  What is it?       Stageprompt is code for wiring up an analytics service to a user journey
*  How does it work? The user journey is described by adding data-journey attributes to tags in the html
*                    the attribute values are then parsed and use to fire a callback sending data to
*                    Google Analytics or some other provider.
*  Why use it?       Seperates the concerns of instumenting your user journey and sending that data
*                    to your analytics provider. 
*
*  SEE HERE FOR MORE INFORMATION - https://github.com/alphagov/stageprompt
*/

var GOVUK = GOVUK || {};

GOVUK.performance = GOVUK.performance || {};

GOVUK.performance.stageprompt = (function () {

  var setup, setupForGoogleAnalytics, splitAction;

  splitAction = function (action) {
    var parts = action.split(':');
    if (parts.length <= 3) return parts;
    return [parts.shift(), parts.shift(), parts.join(':')];
  };

  setup = function (analyticsCallback) {
    var journeyStage = $('[data-journey]').attr('data-journey'),
        journeyHelpers = $('[data-journey-click]');

    if (journeyStage) {
      analyticsCallback.apply(null, splitAction(journeyStage));
    }
    
    journeyHelpers.on('click', function (event) {
      analyticsCallback.apply(null, splitAction($(this).data('journey-click')));
    });
  };
  
  setupForGoogleAnalytics = function () {
    setup(GOVUK.performance.sendGoogleAnalyticsEvent);
  };

  return {
    setup: setup,
    setupForGoogleAnalytics: setupForGoogleAnalytics
  };
}());

GOVUK.performance.sendGoogleAnalyticsEvent = function (category, event, label) {
  _gaq.push(['_trackEvent', category, event, label, undefined, true]);
};
