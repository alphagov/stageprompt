[![Build Status](https://travis-ci.org/alphagov/stageprompt.png?branch=master)](https://travis-ci.org/alphagov/stageprompt?branch=master)

# stageprompt.js

`stageprompt.js` is a JavaScript snippet for wiring up a user journey to an
analytics service.

## Download

Latest version: [stageprompt.2.0.0.js](https://github.com/alphagov/stageprompt/releases/v2.0.0/1799/stageprompt.2.0.0.js)

## Dependencies

- jQuery (currently mirroring the version from https://github.com/alphagov/static/tree/master/app/assets/javascripts/libs/jquery)

## Running tests

You can run the tests using [Rake](http://rake.rubyforge.org/) and [Jasmine](http://pivotal.github.io/jasmine/). 

Setup your environment:
 
* Install Ruby 1.9.3
* in the project folder, run: `bundle install`

To run the tests in a browser:

* run: `bundle exec rake jasmine`
* open in your browser: [http://localhost:8888](http://localhost:8888)

To run the tests from the command line:

* run: `bundle exec rake jasmine:ci`

## Setup

Include `stageprompt.js` in your HTML, and set it up by providing a function to be called at each stage. Either use the "out of the box" setup

    GOVUK.performance.stageprompt.setupForGoogleAnalytics();

Or configure the callback yourself. In the example below an event is sent to Google Analytics for each stage.

    $(function () {
      GOVUK.performance.stageprompt.setup(function (category, event, label) {
        _gaq.push(['_trackEvent', category, event, label, undefined, true]);
      });
    });

## Sending events when a user reaches a page in your user journey

Add `data-journey` attributes to your HTML to indicate the flow of your
transaction. For example:

On `/pay-register-birth-abroad/start`:

    <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:start">
        [...]
    </div>

The user clicks "Calculate total" and is sent to `/pay-register-birth-abroad/confirm` which has the html:

    <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:confirm">
        [...]
    </div>

After clicking "Pay" and entering their details at the provider's site, the
user is redirected back to GOV.UK at `/pay-register-birth-abroad/done`:

    <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:done">
        [...]
    </div>

## Sending events when a user clicks on a page element

Add `data-journey-click` attributes to the element clicked by the user. This will only work if the user is
not sent to a new page on click. Example:

    <a class="help-button" href="#" data-journey-click="stage:help:info">See more info...</a>
