describe("Google Analytics callback", function () {
  
  _gaq = [];
  
  beforeEach(function () {
    spyOn(_gaq, 'push');
  });
  
  it("should push an event onto the google analytics que", function () {
    GOVUK.performance.sendGoogleAnalyticsEvent('test');
    
    expect(_gaq.push).toHaveBeenCalled();
    expect(_gaq.push.argsForCall[0][0][0]).toEqual('_trackEvent');
  });
  
  it("should use sensible default values... eg. non interaction events so as not to mess with bounce rate", function () {
    GOVUK.performance.sendGoogleAnalyticsEvent('test event')
    
    var category = _gaq.push.argsForCall[0][0][1],
        action = _gaq.push.argsForCall[0][0][2],
        label = _gaq.push.argsForCall[0][0][3],
        value = _gaq.push.argsForCall[0][0][4],
        nonInteraction = _gaq.push.argsForCall[0][0][5];
    
    expect(category).toEqual('stagePrompt');
    expect(action).toEqual('test event');
    expect(label).toBe(undefined);
    expect(value).toBe(undefined);
    expect(nonInteraction).toEqual(true);
  })
});
