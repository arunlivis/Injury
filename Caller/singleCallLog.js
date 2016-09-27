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
            checkPatient.checkPatient('caller',6, localReportNumber[0]);
        });
    });

    it('Add Log for a Patient', function(){

        element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/table/tbody/tr[2]/td[1]/input')).click();
        element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/table/tbody/tr[2]/td[1]/input')).isSelected().then(function (selected) {
            //console.log('Selected : '+selected)
            if(selected){
                element(by.linkText("Add Call Log")).isDisplayed().then(function (display) {
                    //console.log('Display : '+display);
                    if(display){
                        element(by.linkText("Add Call Log")).click();
                        browser.waitForAngular();
                    }
                })
            }
        });
        callLog.callLogs();
    });
});