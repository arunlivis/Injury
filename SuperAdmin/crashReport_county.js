var checkPatient=require('../Helpers/checkPatients');
var crashReportClick=require('../Helpers/clickCrashReport');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var countyName=require('../Helpers/getCounty');

describe('Super Admin', function() {
    it('Search Crash Report with County', function () {
        urlPage.urlPage();
        login.loginPage('superadmin', 'superadmin');
        crashReportClick.clickCrashReport();

        countyName.countyName('crashReport').then(function (county) {
            browser.sleep(100);
            element(by.cssContainingText('option', county)).click();
            browser.sleep(100);
            element(by.model('crashreport.county')).$('option:checked').getText().then(function (result) {
                console.log('County Name: '+result);
            });

            browser.sleep(500);
            element(by.linkText('Search')).click();
            browser.waitForAngular();
            checkPatient.checkPatient('crashreport',1,county);
        })

    });
});
