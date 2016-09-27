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

    it('View Call Logs', function () {
        browser.waitForAngular();
        element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr/td/center/strong")).isDisplayed().then(function(value){
            if(!value){
                element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[8]")).getText().then(function(status){
                    element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[9]/span")).getText().then(function(statusOn){
                        console.log('statusOn first : '+statusOn);
                        if(statusOn=='-'){
                            element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[10]/span/a[2]")).click();
                            browser.waitForAngular();
                            var callLogRow=element(by.xpath("//*[@id='viewCallLogsListModal']/div/div/div[2]/table/tbody[2]/tr/td"));
                            expect(callLogRow.isDisplayed()).toBe(true);
                        }
                        else{
                            element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[9]/b")).getText().then(function(statusOn1){
                                console.log('statusOn Second : '+statusOn1);
                                console.log('status Second : '+status);
                                element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[10]/span/a[2]")).click();
                                browser.waitForAngular();
                                var rows=element.all(by.repeater('callLog in callLogsFilter'));
                                var rowElems=rows.last().$$('td');
                                rowElems.get(0).getText().then(function (dateTime) {
                                    expect(dateTime.toLocaleLowerCase()).toContain(statusOn1.toLowerCase());
                                });
                                rowElems.get(1).getText().then(function (dateTime) {
                                    expect(dateTime.toLocaleLowerCase()).toContain(status.toLowerCase());
                                });

                                element.all(by.repeater('callLog in callLogsFilter')).count().then(function(count) {
                                    for(i=1;i<=count;i++){
                                        var func=(function(){
                                            var j=i;
                                            return function(statusResponse){
                                                if(statusResponse=='Appointment Scheduled'){
                                                    browser.sleep(500);
                                                    element(by.xpath("//*[@id='viewCallLogsListModal']/div/div/div[2]/table/tbody[1]/tr["+j+"]/td[5]/a")).click();
                                                    browser.sleep(500);
                                                    element(by.xpath("//*[@id='viewAppointmentsModal']/div/div/div[1]/h4")).getText().then(function (resultText) {
                                                        expect(resultText).toEqual('View Appointment');
                                                    });
                                                    element(by.xpath("//*[@id='viewAppointmentsModal']/div/div/div[2]/div/button")).click();
                                                }
                                            }
                                        })();
                                        element(by.xpath("//*[@id='viewCallLogsListModal']/div/div/div[2]/table/tbody[1]/tr["+i+"]/td[2]")).getText().then(func);
                                    }

                                });
                            });
                        }
                        browser.sleep(500);
                        browser.driver.executeScript('window.scrollTo(0,10000);');
                        element(by.xpath("//*[@id='viewCallLogsListModal']/div/div/div[3]/button")).click();

                        browser.sleep(500);
                        browser.driver.executeScript('window.scrollTo(0,0);');
                        element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div/table/tbody/tr[2]/td[10]/span/a[2]")).click();
                        browser.waitForAngular();
                        element(by.linkText('Add Call Logs')).click();
                        browser.waitForAngular();
                        callLog.callLogs();
                    });
                });
            }
            else{
                browser.executeScript("alert('No record found for given data');");
            }
        });
    });
});