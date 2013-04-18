describe("cookie utils", function () {
  
  var cookieUtils = GOVUK.performance.cookieUtils;
  
  beforeEach(function () {
    document.cookie = 'foo="bar"' + '; Path=/';
    document.cookie = ' zap = "pow"' + '; Path=/';
    document.cookie = ' zig="zag"' + '; Path=/';  
  });
  
  
  afterEach(function () {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      cookieUtils.deleteCookieNamed(cookies[i].split('=')[0]);
    }
  });
  
  
  it("should extract cookies as key values with trimmed white space", function () {
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'foo', value: '"bar"' });
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'zap', value: '"pow"' });
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'zig', value: '"zag"' });
  });
  
  
  it("should extract a single cookie by name", function () {
    var retrievedCookie = cookieUtils.getCookieNamed('zap');
    expect(retrievedCookie.key).toBe('zap');
    expect(retrievedCookie.value).toBe('"pow"');
  });
  
  
  it("should convert strings that look suspiciously like arrays into arrays", function () {
    var arrayFromString = cookieUtils.arrayify('foo');
    expect(arrayFromString[0]).toBe('foo');
  });
  
  
  it("should set a cookie", function () {
    cookieUtils.setSessionCookie({key:"name", value:"foo"});
    expect(document.cookie).toContain("name=foo");
  });
  
  
  it("should delete cookies set by itself", function () {
    cookieUtils.setSessionCookie({key:'a', value:'b'});
    cookieUtils.deleteCookieNamed('a');
    expect(cookieUtils.getCookieNamed('a')).toBe(undefined);
  });
  
  
  it("should not complain if a cookie does not have a value", function () {
    document.cookie = "cookieWithoutValue=" + "; Path=/";
    cookieUtils.cookiesAsKeyValues();
    // should pass
  });
  
  
  it("should not complain if a cookie does not have a key", function () {
    document.cookie = "=wookieWithoutCause" + "; Path=/";
    cookieUtils.cookiesAsKeyValues();
    // should pass
  });
  
});