var appointmentsClick=require('../Helpers/clickAppointments');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');

describe('Caller Admin', function() {
    it('Filter Appointments', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        appointmentsClick.clickAppointments();
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

    })
});