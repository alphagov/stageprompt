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
		
	describe("sending events from cookies and then delete them", function () {

	  it("should send events", function () {
  	  GOVUK.performance.cookieUtils.setSessionCookie(
  	    {key: "journey_events", value: "test-journey:start"}
  	  );

  	  GOVUK.performance.stageprompt
  	    .setup({
  	      analyticsFunction: stubAnalyticsService.post
  	    });

  	  expect(stubAnalyticsService.count()).toBe(1);
  	  expect(stubAnalyticsService.messages()[0]).toBe("test-journey:start");
  	  expect(document.cookie).not.toContain("journey_events=test-journey:start");
  	});
  	  
	});
	
	
	describe("journey events from clicks", function () {
	
		it("should add a start string to the cookie when the link is clicked", function () {
		  document.getElementById("sandbox").innerHTML += "<a id='link' data-journey='test-journey:start'>Link</a>";		  
		  GOVUK.performance.stageprompt.setup({
		    analyticsFunction: function () {}
		  });
		  
		  document.getElementById("link").click();
		  
			expect(document.cookie).toContain('journey_events=test-journey:start');
		});
		
		it("should not overwrite other onclick functions", function () {
		  document.getElementById("sandbox").innerHTML += "<a id='link' data-journey='test-journey:start'>Link</a>";		  
		  spy = jasmine.createSpy();
		  document.getElementById("link").onclick = spy;
		  
		  GOVUK.performance.stageprompt.setup({
		    analyticsFunction: function () {}
		  });
		  
		  document.getElementById("link").click();
		  
		  expect(spy).toHaveBeenCalled();
		});
		
	});
	
	
	describe("journey events from landing on a page", function () {
	  
	  afterEach(function () {
	    document.getElementsByTagName('body')[0].removeAttribute('data-journey');
	  });
	  
	  it("should send an event if the page has a journey-data tag", function () {
	    document.getElementsByTagName('body')[0].setAttribute('data-journey','test-journey:someStage');
	    var spy = jasmine.createSpy();
	    GOVUK.performance.stageprompt.setup({
		    analyticsFunction: spy
		  });
		  
		  expect(spy).toHaveBeenCalledWith("test-journey:someStage");
	  });
	  
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
