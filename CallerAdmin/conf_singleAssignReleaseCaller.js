var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var fileDate=new Date().toJSON().slice(0,10);

var reporter = new HtmlScreenshotReporter({

    dest: './screenshots/single_AssignReleaseCaller',
    cleanDestination: false,
    showConfiguration: false,
    filename: 'single_AssignReleaseCaller '+fileDate+'.html'
});

exports.config = {
    framework: 'jasmine',

    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['single_AssignReleaseCaller.js'],

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true
    },
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },
    onPrepare: function(){
        jasmine.getEnv().addReporter(reporter);
    },
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};