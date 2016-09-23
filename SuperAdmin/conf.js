
exports.config = {
  framework: 'jasmine',

  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['callCenterAdmin.js'],

  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true
  },
  onPrepare: function(){
    protractor.urlHelper = require('../Helpers/urlPage.js');
    protractor.loginHelper = require('../Helpers/toLoginPage.js');
    protractor.countReportHelper=require('../Helpers/countReport.js');
    protractor.logoutHelper = require('../Helpers/toLogout.js');
    //protractor.viewDetailsHelper=require('/Protractor/Helpers/viewDetails.js');
    //protractor.disableHelper=require('/Protractor/Helpers/disable.js');
    //protractor.disabledUserHelper=require('/Protractor/Helpers/disabledUser.js');
    //protractor.logoutHelper = require('/Protractor/Helpers/logout.js');
    //protractor.fillMineralHelper = require('/Protractor/Helpers/fillMineral.js');
    //protractor.xpathHelper = require('/Protractor/Helpers/xpath.js');
   // protractor.tooltipHelper = require('/Tooltip/tooltip.js');
  }
};