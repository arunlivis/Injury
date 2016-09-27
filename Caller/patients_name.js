var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');

describe('Caller', function() {
    it('Search with Patient Name', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
        patient.patientName().then(function(patName){
            var randName=Math.floor(Math.random() * patName.length);
            console.log('randName : '+randName);
            browser.sleep(1000);
            browser.driver.executeScript('window.scrollTo(0,0);');
            element(by.partialLinkText('Reset')).click();
            browser.waitForAngular();
            element(by.model('patient.patientName')).sendKeys(patName[randName]);
            browser.waitForAngular();
            checkPatient.checkPatient('caller',5, patName[randName]);
        });
    });
});