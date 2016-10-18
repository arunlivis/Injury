var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var countyName=require('../Helpers/getCounty');

describe('Caller Admin', function() {
    it('Search Crash Report with County', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        console.log('Before County : ');
        countyName.countyName('patient').then(function (county) {
            browser.sleep(100);
            element(by.cssContainingText('option', county)).click();
            browser.sleep(100);
            element(by.model('patient.countyId')).$('option:checked').getText().then(function (result) {
                console.log('County Name: '+result);
            });

            browser.sleep(500);
            element(by.linkText('Search')).click();
            browser.waitForAngular();
            checkPatient.checkPatient('calleradmin',1,county);
        })

    });
});
