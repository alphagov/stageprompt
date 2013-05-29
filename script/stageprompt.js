/*global GOVUK: true*/
/*global Sizzle: true*/
/*jslint indent: 2 */

GOVUK.performance.addToNamespace("stageprompt", (function () {
  var analyticsService,
      setup;

  setup = function (config) {
    /*jslint newcap: false*/
    
    analyticsService = config.analyticsFunction;
  
    var nodeWithJourneyTag = GOVUK.performance.getElementsByAttribute("data-journey")[0];
    if (nodeWithJourneyTag) {
      if (nodeWithJourneyTag.nodeName === "BODY") {
        analyticsService(nodeWithJourneyTag.getAttribute("data-journey"));
      }
    }
  };

  return {
    setup: setup
  };
}()));
