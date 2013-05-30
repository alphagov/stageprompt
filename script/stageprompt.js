/*global GOVUK: true*/
/*global Sizzle: true*/
/*jslint indent: 2 */

GOVUK.performance.addToNamespace("stageprompt", (function () {
  var setup;

  setup = function (config) {
    /*jslint newcap: false*/

    var nodeWithJourneyTag = GOVUK.performance.getElementsByAttribute("data-journey")[0];
    if (nodeWithJourneyTag) {
      config.analyticsFunction(nodeWithJourneyTag.getAttribute("data-journey"));
    }
  };

  return {
    setup: setup
  };
}()));
