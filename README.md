# stageprompt.js

`stageprompt.js` is a JavaScript snippet for wiring up a user journey to an
analytics service.

## Dependencies

- jQuery (currently mirroring the version from https://github.com/alphagov/static/tree/master/app/assets/javascripts/libs/jquery)

## Running tests

Open `unit_tests.html` in your desired browser. You might want to serve files
up via `python -m SimpleHTTPServer` for a more realistic testing environment.

## Example

Include `stageprompt.js` in your HTML, and set it up by providing a function to be called at each stage. In the example below an event is sent to Google Analytics for each stage.

    $(function () {
      GOVUK.performance.stageprompt.setup(function (journeyStage) {
        _gaq.push(['_trackEvent', journeyStage , 'n/a', undefined, undefined, true]);
      })
    });

Add `data-journey` attributes to your HTML to indicate the flow of your
transaction. For example:

On `/pay-register-birth-abroad/start`:

    <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:start">
        [...]
    </div>

The user clicks "Calculate total" and is sent to `/pay-register-birth-abroad/confirm`:

    <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:confirm">
        [...]
    </div>

After clicking "Pay" and entering their details at the provider's site, the
user is redirected back to GOV.UK at `/pay-register-birth-abroad/done`:

    <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:done">
        [...]
    </div>
