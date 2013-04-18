describe("the end of the user journey", function () {

  it("should tag cookie as the user clicks the start link", function () {
    if (this.results_.failedCount === 0) {
      var startLink = document.getElementById("start");
      startLink.click();
    }
  });

});