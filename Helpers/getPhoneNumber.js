var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');

exports.getPhone=function(){
    var phoneNumber = [];
    it('Get Patient Phone Number', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
        browser.sleep(500);
        element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.phoneNumber')).getText().then(function (phone) {
            phoneNumber.push(phone.filter(String));
            phoneNumber=phoneNumber[0].toString().split(",");
        })
    });

    it('Search with Patient Phone Number', function () {
        var randPhone=Math.floor(Math.random() * phoneNumber.length);
        console.log('randPhone : '+randPhone);
        browser.sleep(1000);
        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.model('patient.phoneNumber')).sendKeys(phoneNumber[randPhone]);
        browser.waitForAngular();
        browser.sleep(1500);
        checkPatient.checkPatient(4, phoneNumber[randPhone]);
    });
};