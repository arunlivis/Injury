var appointmentsClick=require('../Helpers/clickAppointments');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var checkPatient=require('../Helpers/checkPatients');

describe('Caller Admin', function() {
    it('Change Status', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        appointmentsClick.clickAppointments();
        element.all(by.repeater('appointment in appointments').column('appointment.patientName')).getText().then(function (names) {
            randName=Math.floor(Math.random()*names.length);
            console.log('Name : '+names[randName]);
            element(by.model('searchAppointment.patientName')).sendKeys(names[randName]);
            checkPatient.checkPatient('appointment',11,names[randName]);
            element(by.css('select[ng-model="appointment.status"]')).$$('option:checked').getAttribute('value').then(function (selectedStatus) {
                element.all(by.css('select[ng-model="appointment.status"] option')).getAttribute('value').then(function (apptStatus) {
                    console.log('apptStatus : '+apptStatus);
                    var randNo=Math.floor(Math.random()*apptStatus.length);
                    console.log('randNo : '+randNo);
                    element(by.css('select[ng-model="appointment.status"]')).$('[value="'+apptStatus[randNo]+'"]').click();
                    if(selectedStatus!=apptStatus[randNo]){
                        browser.sleep(200);
                        expect(element(by.xpath("//*[@id='page-wrapper']/div/div/div[1]/div/div/div")).isDisplayed()).toBe(true);
                    }
                })
            })
        });
    });
});