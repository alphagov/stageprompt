/*global GOVUK: true*/
/*global Sizzle: true*/
/*jslint indent: 2 */

GOVUK.performance.addToNamespace("stageprompt", (function () {
  var nameOfCookie = "journey_events",
    analyticsService,
    privateMethods = {},
    setup;


  privateMethods.addStartStringToCookie = function (journeyValue) {
    var cookie = {key: nameOfCookie, value: journeyValue, path: "/"};
    GOVUK.performance.cookieUtils.setSessionCookie(cookie);
  };


  privateMethods.sendCookieEvents = function () {
    var existingCookie = GOVUK.performance.cookieUtils.getCookieNamed(nameOfCookie), events, i = 0;

    if (existingCookie && existingCookie.value) {
      analyticsService(existingCookie.value);
      GOVUK.performance.cookieUtils.deleteCookieNamed(nameOfCookie);
    }
  };

  setup = function (config) {
    /*jslint newcap: false*/
    
    analyticsService = config.analyticsFunction;
  
    privateMethods.sendCookieEvents();
  
    var nodeWithJourneyTag = Sizzle("[data-journey]")[0],
      oldOnclick;
    if (nodeWithJourneyTag) {
      if (nodeWithJourneyTag.nodeName === "A") {
        oldOnclick = nodeWithJourneyTag.onclick;
        nodeWithJourneyTag.onclick = function () {
          if (oldOnclick) {
            oldOnclick();
          }
          privateMethods.addStartStringToCookie(nodeWithJourneyTag.getAttribute("data-journey"));
        };
      } 
      else if (nodeWithJourneyTag.nodeName === "BODY") {
        analyticsService(nodeWithJourneyTag.getAttribute("data-journey"));
      }
    }
  };

  return {
    setup: setup
  };
}()));
