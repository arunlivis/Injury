var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');

describe('Caller', function() {
    it('Search with Patient Name', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        patient.patientName('calleradmin').then(function(patName){
            browser.sleep(1000);
            browser.driver.executeScript('window.scrollTo(0,0);');
            element(by.partialLinkText('Reset')).click();
            browser.waitForAngular();
            element(by.model('patient.patientName')).sendKeys(patName);
            browser.waitForAngular();
            checkPatient.checkPatient('calleradmin',5, patName);
        });
    });
});