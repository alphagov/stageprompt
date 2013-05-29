# stageprompt.js

`stageprompt.js` is a javascript snippet for wiring up a user journey to an analytics service. Examples to follow.

## How to minify:

1. Install and set up juicer if you don't already have it. 
    - `gem install juicer`
    - `juicer install JsLint`
    - `juicer install closure_compiler`
2. Add any new dependencies to `release_templates/stagepromptTemplate.js`
3. In the `stageprompt` directory run `juicer merge -m "closure_compiler" -o "release/stageprompt.VERSION.min.js" release_templates/stagepromptTemplate.js` and 
`juicer merge -o "release/stageprompt.VERSION.js" release_templates/stagepromptTemplate.js`. Make sure that you bump the version number as appropriate. This will
run JsLint against your code and then minify and combine as necessary.

## How to run tests:

Because we're using cookies you'll need to serve up the assets over local host for the tests to pass on some browsers. The easiest way to do this is `python -m SimpleHTTPServer`