var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');
var localReport=require('../Helpers/getLocalReport.js');
var noCaller=require('../Helpers/callerNA');
var logout=require('../Helpers/toLogout');

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

    it('Release Patient for Single', function () {
        element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[10]/span/a[1]")).isDisplayed().then(function (isRelease) {
            if(isRelease){
                element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[10]/span/a[1]")).click();
                browser.waitForAngular();
                browser.sleep(300);
                element(by.linkText('Release')).click();
                expect(element(by.xpath("//*[@id='page-wrapper']/div/div/div[1]/div/div/div")).isDisplayed()).toBe(true);
                logout.logout();
                noCaller.callerNotAvail(localReportNumber[0]);
            }
        })
    });
});