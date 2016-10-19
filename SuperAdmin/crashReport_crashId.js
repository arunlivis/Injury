var checkPatient=require('../Helpers/checkPatients');
var crashReportClick=require('../Helpers/clickCrashReport');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var crashID=require('../Helpers/getCrashId.js');

describe('Super Admin', function() {
    it('Check with Local Report Number', function () {
        urlPage.urlPage();
        login.loginPage('superadmin', 'superadmin');
        crashReportClick.clickCrashReport();
        browser.sleep(1000);
        element.all(by.repeater('crashReport in crashSearchData').column('crashReport.crashId')).getText().then(function (crashID) {
            console.log('crashID : '+crashID);
            var randCrashID=Math.floor(Math.random()*crashID.length);
            browser.driver.executeScript('window.scrollTo(0,0);');
            element(by.partialLinkText('Reset')).click();
            browser.waitForAngular();
            element(by.name('crashId')).sendKeys(crashID[randCrashID]);
            element(by.linkText('Search')).click();
            browser.waitForAngular();
        });
        //crashID.crashId();
        element(by.model('crashreport.crashId')).getAttribute('value').then(function (crashIDtxt) {
            checkPatient.checkPatient('crashreport',12, crashIDtxt);
        });
    });
});
