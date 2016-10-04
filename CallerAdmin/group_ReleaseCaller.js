var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var localReport=require('../Helpers/getLocalReport.js');
var assignCaller=require('../Helpers/assignCaller');
var checkPatient=require('../Helpers/checkPatients');

describe('Caller Admin', function() {
    it('Release Caller for Group', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        localReport.localReport().then(function (localReportNumber) {
            element(by.id(localReportNumber)).click();
            element(by.linkText('Release From Caller')).click();
            browser.waitForAngular();
            checkPatient.checkPatient('calleradmin',7,'N/A');
        })
    })
});