var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './screenshots/addedDate',
    filename: 'addedDate.html'
});

exports.config = {
    framework: 'jasmine',

    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['patients_addedDate.js'],

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
        protractor.urlHelper = require('../Helpers/urlPage.js');
        protractor.loginHelper = require('../Helpers/toLoginPage.js');
        protractor.countReportHelper=require('../Helpers/countReport.js');
        protractor.logoutHelper = require('../Helpers/toLogout.js');
        protractor.changePasswordelper = require('../Helpers/changePassword.js');
        protractor.countyHelper = require('../Helpers/getCounty');
        jasmine.getEnv().addReporter(reporter);
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};