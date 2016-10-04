var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var localReport=require('../Helpers/getLocalReport.js');
var assignCaller=require('../Helpers/assignCaller');

describe('Caller Admin', function() {
    it('Assign Caller for Group', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        localReport.localReport().then(function (localReportNumber) {
            element(by.id(localReportNumber)).click();
            element(by.linkText('Assign Caller')).click();
            browser.waitForAngular();
            assignCaller.assignCaller();
        })

    })
});