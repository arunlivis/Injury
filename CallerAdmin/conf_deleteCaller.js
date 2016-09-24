var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var fileDate=new Date().toJSON().slice(0,10);

var reporter = new HtmlScreenshotReporter({

    dest: './screenshots/deleteCaller',
    cleanDestination: false,
    showConfiguration: false,
    filename: 'deleteCaller '+fileDate+'.html'
});

exports.config = {
    framework: 'jasmine',

    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['deleteCaller.js'],

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