var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var fileDate=new Date().toJSON().slice(0,10);

var reporter = new HtmlScreenshotReporter({

  dest: './screenshots/all',
  cleanDestination: false,
  showConfiguration: false,
  filename: 'all '+fileDate+'.html'
});

exports.config = {
  framework: 'jasmine',

  directConnect: true,

  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['clinics.js'],

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
        //protractor.viewDetailsHelper=require('/Protractor/Helpers/viewDetails.js');
        //protractor.disableHelper=require('/Protractor/Helpers/disable.js');
        //protractor.disabledUserHelper=require('/Protractor/Helpers/disabledUser.js');
        //protractor.logoutHelper = require('/Protractor/Helpers/logout.js');
        //protractor.fillMineralHelper = require('/Protractor/Helpers/fillMineral.js');
        // protractor.xpathHelper = require('/Protractor/Helpers/xpath.js');
       // protractor.tooltipHelper = require('/Tooltip/tooltip.js');
      jasmine.getEnv().addReporter(reporter);
  },
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};