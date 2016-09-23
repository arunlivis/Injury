var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');
var localReport=require('../Helpers/getLocalReport.js');
var callLog=require('../Helpers/callLogs');

describe('Caller', function() {

    var localReportNumber=[];
    it('Check with Local Report Number', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
        localReport.localReport();
        element(by.model('patient.localReportNumber')).getAttribute('value').then(function (LRNtext) {
            localReportNumber.push(LRNtext);
            console.log('localReportNumber[0] : '+localReportNumber[0]);
            checkPatient.checkPatient(6, localReportNumber[0]);
        });
    });

    it('Add Log for Group', function(){
        element(by.id(localReportNumber[0])).click();
        element(by.id(localReportNumber[0])).isSelected().then(function (selected) {
            if(selected){
                element(by.id('addCallLog'+localReportNumber[0])).isDisplayed().then(function (display) {
                    if(display){
                        element(by.id('addCallLog'+localReportNumber[0])).click();
                        browser.waitForAngular();
                    }
                })
            }
        });

        callLog.callLogs();
    });
});