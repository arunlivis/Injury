var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');
var localReport=require('../Helpers/getLocalReport.js');

describe('Caller Admin', function() {
    it('Check with Local Report Number', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        localReport.localReport('patient');
        element(by.model('patient.localReportNumber')).getAttribute('value').then(function (LRNtext) {
            checkPatient.checkPatient('calleradmin',6, LRNtext);
        });
    });
});
