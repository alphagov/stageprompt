describe("the middle of the user journey", function () {
  
  var failCount = 0;
  
  afterEach(function () {
    if(this.results_.failedCount !== 0) {
      failCount++;
    }
  });
  
  it("should have sent the stored start event from the previous page", function () {
    expect(stubAnalyticsService.messages()).toContain("test-journey:start");
  });
  
  
  it("should send a journey middle event", function () {
    expect(stubAnalyticsService.messages()).toContain("test-journey:middle");
  });
  
  
  it("should wait for 0.5 seconds and then navigate to the end of the journey", function () {
    if (failCount === 0) {
      window.setTimeout(function () {
        var middleLink = document.getElementById("middle_link");
        middleLink.click();  
      }, 500);
    }
  });
  
});