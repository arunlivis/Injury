var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var checkPatient=require('../Helpers/checkPatients');

describe('Caller Admin', function() {
    it('Search with Caller', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        var randCallerID;
        browser.sleep(1000);
        element.all(by.css('[ng-model="patient.callerId"] option')).getAttribute('value').then(function(callers){
            randCallerID=Math.floor(Math.random()*callers.length);
            element(by.css('select[ng-model="patient.callerId"]')).$('[value="'+callers[randCallerID]+'"]').click();
        });
        element(by.linkText('Search')).click();
        browser.waitForAngular();
        element(by.model('patient.callerId')).$('option:checked').getText().then(function (result) {
            if(randCallerID!=0){
                checkPatient.checkPatient('calleradmin',7, result);
            }

        });
    });
});