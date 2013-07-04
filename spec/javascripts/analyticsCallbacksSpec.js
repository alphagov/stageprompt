describe("Google Analytics callback", function () {

  beforeEach(function () {
    _gaq = { push: function() {} };
    spyOn(_gaq, 'push');
  });

  it("should push an event onto the google analytics que", function () {
    GOVUK.performance.sendGoogleAnalyticsEvent('test');
    
    expect(_gaq.push).toHaveBeenCalled();
    expect(method(_gaq.push.argsForCall)).toEqual('_trackEvent');
  });

  it("should use arguments as category, event, label", function() {
    GOVUK.performance.sendGoogleAnalyticsEvent('arg-1', 'arg-2', 'arg-3');

    expect(_gaq.push).toHaveBeenCalled();
    expect(category(_gaq.push.argsForCall)).toEqual('arg-1');
    expect(action(_gaq.push.argsForCall)).toEqual('arg-2');
    expect(label(_gaq.push.argsForCall)).toEqual('arg-3');
  });
  
  it("should use sensible default values... eg. non interaction events so as not to mess with bounce rate", function () {
    GOVUK.performance.sendGoogleAnalyticsEvent('test event')

    expect(category(_gaq.push.argsForCall)).toEqual('test event');
    expect(action(_gaq.push.argsForCall)).toEqual(undefined);
    expect(label(_gaq.push.argsForCall)).toBe(undefined);
    expect(value(_gaq.push.argsForCall)).toBe(undefined);
    expect(nonInteraction(_gaq.push.argsForCall)).toEqual(true);
  })

  function method(args)         { return args[0][0][0]; }
  function category(args)       { return args[0][0][1]; }
  function action(args)         { return args[0][0][2]; }
  function label(args)          { return args[0][0][3]; }
  function value(args)          { return args[0][0][4]; }
  function nonInteraction(args) { return args[0][0][5]; }

});
