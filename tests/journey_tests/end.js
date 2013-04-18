describe("the end of the user journey", function () {

  it("should have sent an end event", function () {
    expect(stubAnalyticsService.messages()).toContain("test-journey:end");
  });
  
});