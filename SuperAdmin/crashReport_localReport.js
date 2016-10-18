var checkPatient=require('../Helpers/checkPatients');
var crashReportClick=require('../Helpers/clickCrashReport');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var localReport=require('../Helpers/getLocalReport.js');

describe('Super Admin', function() {
    it('Check with Local Report Number', function () {
        urlPage.urlPage();
        login.loginPage('superadmin', 'superadmin');
        crashReportClick.clickCrashReport();
        localReport.localReport('crashReport');
        element(by.model('crashreport.localReportNumber')).getAttribute('value').then(function (LRNtext) {
            checkPatient.checkPatient('crashreport',6, LRNtext);
        });
    });
});
