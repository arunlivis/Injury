var login=require('../Helpers/toLoginPage');

exports.callerNotAvail=function(lRN){
    login.loginPage('calleradmin', 'calleradmin');
    element(by.linkText('Patients')).click();
    browser.waitForAngular();
    element(by.model('patient.localReportNumber')).sendKeys(lRN);
    element(by.linkText('Search')).click();
    browser.waitForAngular();
    element(by.repeater('patient in resultData.patientSearchLists').column('patient.caller')).getText().then(function (callers) {
        expect(callers).toContain('N/A');
    })
};