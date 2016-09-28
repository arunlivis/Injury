var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var getPhone=require('../Helpers/getPhoneNumber');

describe('Caller', function() {
    it('Search with Patient Phone Number', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        getPhone.getPhone('calleradmin').then(function(phoneNumber){
            browser.sleep(1000);
            browser.driver.executeScript('window.scrollTo(0,0);');
            element(by.partialLinkText('Reset')).click();
            browser.waitForAngular();
            element(by.model('patient.phoneNumber')).sendKeys(phoneNumber);
            browser.waitForAngular();
            browser.sleep(1500);
            checkPatient.checkPatient('calleradmin', 4, phoneNumber);
        })

    });
});
