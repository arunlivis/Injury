var login=require('../Helpers/toLoginPage');
var appointmentsClick=require('../Helpers/clickAppointments');
var urlPage=require('../Helpers/urlPage');
var checkPatient=require('../Helpers/checkPatients');

describe('Call Center Admin', function () {
    it('Click on Appointments', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        appointmentsClick.clickAppointments();
    });

    //protractor.countReportHelper.countReport('Appointments', 'appointment');

    it('Search with Patient Name', function () {
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

       // browser.pause();
    });

    /*it('Filter Appointments', function(){
        var correctMonth;
        element.all(by.css('select[ng-model="searchAppointment.month"] option')).getAttribute('value').then(function (month) {
            console.log('Month : '+month);
            var randMonth=Math.floor(Math.random()*13);
            console.log('randMonth : '+randMonth);
            console.log('month[randMonth] : '+month[randMonth]);
            if(month[randMonth]<10){
                correctMonth='0'+month[randMonth];
            }
            else{
                correctMonth=month[randMonth];
            }
            element(by.css('select[ng-model="searchAppointment.month"]')).$('[value="'+month[randMonth]+'"]').click();

            element.all(by.css('select[ng-model="searchAppointment.status"] option')).getAttribute('value').then(function (status) {
                console.log('Status : '+status);
                var randStatus=Math.floor(Math.random()*4);
                console.log('status[randStatus] : '+status[randStatus]);
                element(by.css('select[ng-model="searchAppointment.status"]')).$('[value="'+status[randStatus]+'"]').click();
                element(by.css('tbody[ng-show="appointments.length==0"]')).isDisplayed().then(function (noRecord) {
                    if(!noRecord){
                        if(month[randMonth]!=13){
                            element.all(by.repeater('appointment in appointments').column('appointment.scheduledDateTime')).getText().then(function (appointmentTime) {
                                for (i=0;i<appointmentTime.length;i++){
                                    expect(correctMonth).toContain(appointmentTime[i].substring(0,appointmentTime[i].indexOf('/')));
                                }
                            })
                        }
                        if(status[randStatus]!=0){
                            element.all(by.repeater('appointment in appointments')).$$('option:checked').getAttribute('value').then(function (appointmentStatus) {
                                console.log('appointmentStatus : '+appointmentStatus);
                                expect(status[randStatus]).toContain(appointmentStatus);
                            })
                        }

                    }
                });
            });

        });

    })*/
});