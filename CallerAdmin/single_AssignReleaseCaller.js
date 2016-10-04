var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var localReport=require('../Helpers/getLocalReport.js');
var assignCaller=require('../Helpers/assignCaller');

describe('Caller Admin', function() {
    it('Assign/Release Caller for Single', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        localReport.localReport();
        element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/span/a[2]")).isDisplayed().then(function(assign){
            element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[2]/span/a")).getText().then(function (name) {
                //console.log('assign : '+assign);
                if(assign){
                    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/span/a[2]")).click();
                    browser.waitForAngular();
                    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[2]/span/a")).getText().then(function (nameInModel) {
                        expect(name).toContain(nameInModel);
                    });
                    assignCaller.assignCaller();
                }
                else{
                    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/span/a[1]")).click();
                    browser.waitForAngular();
                    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[2]/span/a")).getText().then(function (nameInModel) {
                        expect(name).toContain(nameInModel);
                    });
                    assignCaller.assignCaller();
                }
            })
        })

    });
});