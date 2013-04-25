describe("getElementsByAttribute", function () {
  
  describe("getElementsByAttributeFallback", function () {
    beforeEach(function () {
      document.getElementById('sandbox').innerHTML = '<div data-foo="a">A</div>' + 
      '<div data-bar="b">B</div>' + '<div data-bar="c">C</div>';
    });
    
    afterEach(function () {
      document.getElementById('sandbox').innerHTML = "";
    });
    
    it("should get an the element with the given attribute", function () {
      var elements = GOVUK.performance.getElementsByAttributeFallback('data-foo');
      expect(elements.length).toBe(1);
      expect(elements[0].innerHTML).toBe('A');
    });

    it("should get multiple elements if they have the given attribute", function () {
      var elements = GOVUK.performance.getElementsByAttributeFallback('data-bar');
      expect(elements.length).toBe(2);
      expect(elements[0].innerHTML).toBe('B');
      expect(elements[1].innerHTML).toBe('C');
    });
    
  });
  
  it("should use querySelectorAll if available", function () {
    var spy = spyOn(document, "querySelectorAll");
    GOVUK.performance.getElementsByAttribute("don't-care");
    expect(spy).toHaveBeenCalled();
  });
  
});