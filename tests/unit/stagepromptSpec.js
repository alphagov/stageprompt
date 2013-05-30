describe("stageprompt", function () {

  afterEach(function () {
    document.getElementById('sandbox').innerHTML = "";
  });

  it("should exist in a namespace", function () {
    expect(GOVUK.performance.stageprompt).not.toBeNull();
  });

  it("should not blow up if there are no data-journey tags", function () {
    expect($("[data-journey]").length).toBe(0);
    GOVUK.performance.stageprompt.setup(function () {});
    // should not blow up
  });

  describe("fire the analytics callback when a data-journey tag is found", function () {
    
    var analyticsCallback;
    
    beforeEach(function () {
      analyticsCallback = jasmine.createSpy();
    });

    afterEach(function () {
      document.getElementsByTagName('body')[0].removeAttribute('data-journey');
      document.getElementById('sandbox').removeAttribute('data-journey');
      document.getElementById('sandbox').innerHtml = "";
    });

    it("should send an event if the page has a journey-data tag on the body", function () {
      document.getElementsByTagName('body')[0].setAttribute('data-journey', 'test-journey:someStage');
      var spy = jasmine.createSpy();
      GOVUK.performance.stageprompt.setup(analyticsCallback);

      expect(analyticsCallback).toHaveBeenCalledWith("test-journey:someStage");
    });

    it("should send an event if the page has a journey-data tag on another tag", function () {
      document.getElementById('sandbox').setAttribute('data-journey', 'test-journey:nextStep');

      GOVUK.performance.stageprompt.setup(analyticsCallback);

      expect(analyticsCallback).toHaveBeenCalledWith("test-journey:nextStep");
    });

    it("should send one event if the page has multiple elements with data-journey attribute", function () {
      document.getElementById('sandbox').setAttribute('data-journey', 'test-journey:stuff');
      document.getElementById('sandbox').innerHTML = 
        "<p id='foo' data-journey='test-journey:moreStuff'>something</p>";

      GOVUK.performance.stageprompt.setup(analyticsCallback);

      expect(analyticsCallback.callCount).toBe(1);
    });

  })
});
