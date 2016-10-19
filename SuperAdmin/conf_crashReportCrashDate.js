var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var fileDate=new Date().toJSON().slice(0,10);

var reporter = new HtmlScreenshotReporter({

    dest: './screenshots/crashReportCrashDate',
    cleanDestination: false,
    showConfiguration: false,
    filename: 'crashReportCrashDate '+fileDate+'.html'
});

exports.config = {
    framework: 'jasmine',

    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['crashReport_crashDate.js'],

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