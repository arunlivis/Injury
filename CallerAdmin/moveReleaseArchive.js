var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var localReport=require('../Helpers/getLocalReport.js');
var checkPatient=require('../Helpers/checkPatients');

describe('Caller Admin', function() {
    it('Move to Archive / Release from Archive', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        localReport.localReport().then(function (localReportNumber) {
            element(by.id(localReportNumber)).click();
            element(by.linkText('Move to Archive')).click();
            browser.waitForAngular();
            element(by.css('select[ng-model="patient.isArchived"]')).$('[value="1"]').click();
            browser.waitForAngular();
            checkPatient.checkPatient('calleradmin', 6,localReportNumber);
            element(by.id(localReportNumber)).click();
            element(by.linkText('Release from Archive')).click();
            browser.waitForAngular();
            element(by.css('select[ng-model="patient.isArchived"]')).$('[value="0"]').click();
            checkPatient.checkPatient('calleradmin', 6,localReportNumber);
        })

    })
});