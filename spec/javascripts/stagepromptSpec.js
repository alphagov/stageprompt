describe("stageprompt", function () {
  beforeEach(function () {
    $("<div id='sandbox'></div>").appendTo('body');
  });

  afterEach(function () {
    $("#sandbox").remove();
    // document.getElementById('sandbox').innerHTML = "";
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
      $("<div id='sandbox'></div>").appendTo('body');
    });

    afterEach(function () {
      $('#sandbox').remove();
      $('[data-journey]').removeAttr('data-journey');
    });

    it("should send an event if the page has a data-journey tag on the body", function () {
      $('body').attr('data-journey', 'test-journey:someStage');
      var spy = jasmine.createSpy();
      GOVUK.performance.stageprompt.setup(analyticsCallback);

      expect(analyticsCallback).toHaveBeenCalledWith("test-journey:someStage");
    });

    it("should send an event if the page has a data-journey tag on another tag", function () {
      $('#sandbox').attr('data-journey', 'test-journey:nextStep');

      GOVUK.performance.stageprompt.setup(analyticsCallback);

      expect(analyticsCallback).toHaveBeenCalledWith("test-journey:nextStep");
    });

    it("should send one event if the page has multiple elements with data-journey attribute", function () {
      $('#sandbox').attr('data-journey', 'test-journey:stuff');
      $('#sandbox').html("<p id='foo' data-journey='test-journey:moreStuff'>something</p>");

      GOVUK.performance.stageprompt.setup(analyticsCallback);

      expect(analyticsCallback.callCount).toBe(1);
    });
    
    it("should send an event when a help link is clicked", function () {
      $('#sandbox').attr('data-journey-helper', 'test-journey:stuff:help');
      GOVUK.performance.stageprompt.setup(analyticsCallback);
      
      $('#sandbox').click();
      
      expect(analyticsCallback).toHaveBeenCalledWith("test-journey:stuff:help");
    });

  })
});
