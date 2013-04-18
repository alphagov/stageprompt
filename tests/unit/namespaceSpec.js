describe("namespacing", function () {
  
  it("should add to the namespace", function () {
    GOVUK.performance.addToNamespace("foo", function () { return "bar"; });
    expect(GOVUK.performance.foo()).toBe("bar");
  });
  
  
  it("should not add to the name is already taken", function () {
    expect(function () { GOVUK.performance.addToNamespace("foo", "blah blah blah"); })
    expect(GOVUK.performance.foo()).toBe("bar");
  });

});
