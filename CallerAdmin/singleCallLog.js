var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');
var localReport=require('../Helpers/getLocalReport.js');
var callLog=require('../Helpers/callLogs');

describe('Caller', function() {
    it('Check with Local Report Number', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        localReport.localReport().then(function(localReportNumber){
            checkPatient.checkPatient('calleradmin',6, localReportNumber);
            element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr[2]/td[1]/input')).click();
            element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr[2]/td[1]/input')).isSelected().then(function (selected) {
                if(selected){
                    element(by.linkText("Add Call Log")).isDisplayed().then(function (display) {
                        if(display){
                            element(by.linkText("Add Call Log")).click();
                            browser.waitForAngular();
                        }
                    })
                }
            });
        });
        callLog.callLogs('calleradmin');
    });
});