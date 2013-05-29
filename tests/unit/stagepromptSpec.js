describe("stageprompt", function () {
  
  afterEach(function () {
    document.getElementById('sandbox').innerHTML = "";
  });
  
  it("should exist... probably", function () {
    expect(GOVUK.performance.stageprompt).not.toBeNull();
  });
  
  it("should not blow up if there are no data-journey tags", function () {
    expect(Sizzle("[data-journey]").length).toBe(0);
    GOVUK.performance.stageprompt.setup({
      analyticsFunction: function () {}
    });
    // should not blow up
  });
  
  describe("journey events from landing on a page", function () {
    
    afterEach(function () {
      document.getElementsByTagName('body')[0].removeAttribute('data-journey');
      document.getElementById('sandbox').removeAttribute('data-journey');
    });
    
    it("should send an event if the page has a journey-data tag on the body", function () {
      document.getElementsByTagName('body')[0].setAttribute('data-journey','test-journey:someStage');
      var spy = jasmine.createSpy();
      GOVUK.performance.stageprompt.setup({
        analyticsFunction: spy
      });
      
      expect(spy).toHaveBeenCalledWith("test-journey:someStage");
    });
    
    it("should not send an event if the data-journey tag is not on the body", function () {
      document.getElementById('sandbox').setAttribute('data-journey','test-journey:no-sendy');
      
      var spy = jasmine.createSpy();
      GOVUK.performance.stageprompt.setup({
        analyticsFunction: spy
      });
      
      expect(spy).not.toHaveBeenCalled();
    })
    
    it("should NOT send an event if the journey-data tag was on the link", function () {
      document.getElementById("sandbox").innerHTML += "<a id='link' data-journey='test-journey:start'>Link</a>";      
      
      var spy = jasmine.createSpy();
      GOVUK.performance.stageprompt.setup({
        analyticsFunction: spy
      });
      
      expect(spy).not.toHaveBeenCalled();
    });
  })
});
