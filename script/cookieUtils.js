/*global document:true*/
/*global GOVUK: true*/
/*jslint indent: 2 */

GOVUK.performance.addToNamespace("cookieUtils", (function () {
  
  var cookiesAsKeyValues, getCookieNamed, setSessionCookie, deleteCookieNamed, arrayify; 
  
  
  cookiesAsKeyValues = function () {
    var bakedCookies = [], rawCookies = document.cookie.split(';'), i = 0, keyValue;
    for (i = 0; i < rawCookies.length; (i += 1)) {
      keyValue = rawCookies[i].split('=');
      bakedCookies.push({
        key: keyValue[0].trim(),
        value: keyValue[1] ? keyValue[1].trim() : undefined
      });
    }
    return bakedCookies;
  };


  getCookieNamed = function (name) {
    var allCookies = cookiesAsKeyValues(), i = 0;
    for (i = 0; i < allCookies.length; (i += 1)) {
      if (allCookies[i].key === name) {
        return allCookies[i];
      }
    }
  };


  setSessionCookie = function (cookie) {
    var path = (cookie.path === undefined) ? "; Path=/" : "; Path=" + cookie.path;
    document.cookie = cookie.key + "=" + cookie.value + path;
  };


  deleteCookieNamed = function (name) {
    document.cookie = name.trim() + "=" + "deleted" + ";expires=" + new Date(0).toUTCString() + "; Path=/";
  };


  arrayify = function (obj) {
    return (Object.prototype.toString.call(obj) !== '[object Array]') ? [obj] : obj;
  };


  return {
    cookiesAsKeyValues: cookiesAsKeyValues,
    getCookieNamed: getCookieNamed,
    setSessionCookie: setSessionCookie,
    deleteCookieNamed: deleteCookieNamed,
    arrayify: arrayify
  };

}()));
