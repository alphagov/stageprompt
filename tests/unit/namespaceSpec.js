describe("namespacing", function () {
  
  it("should add to the namespace", function () {
    GOVUK.performance.addToNamespace("foo", function () { return "bar"; });
    expect(GOVUK.performance.foo()).toBe("bar");
  });
  
  
  it("should throw an exception if the name already exists and not add to the namespace", function () {
    expect(function () { GOVUK.performance.addToNamespace("foo", "blah blah blah"); })
      .toThrow(new Error("There is already a key: 'foo' in the namespace."));
    expect(GOVUK.performance.foo()).toBe("bar");
  });
  
  
  it("should remove namespace helpers when closed", function () {
    GOVUK.performance.close();
    expect(function () { GOVUK.performance.addToNamespace("test", {}); }).toThrow("Property 'addToNamespace' of object #<Object> is not a function");
    expect(function () { GOVUK.performance.close(); }).toThrow("Property 'close' of object #<Object> is not a function");
  });
  
});
