var checkPatient=require('../Helpers/checkPatients');
exports.callLogs=function(){
    var randResponseID;
    var randClinicID;

    element.all(by.css('[ng-model="calllogs.response"] option')).getAttribute('value').then(function(response){
        //callers.push(-1);
        randResponseID=Math.floor(Math.random()*(response.length-1)+1);
        console.log('randResponseID : '+randResponseID);
        browser.sleep(200);
        element(by.css('select[ng-model="calllogs.response"]')).$('[value="'+response[randResponseID]+'"]').click();
        console.log('All responses : '+response);
        console.log('Response : '+response[randResponseID]);
        if(response[randResponseID]==4){
            browser.waitForAngular();
            element.all(by.css('[ng-model="calllogs.appointmentsForm.clinicId"] option')).getText().then(function(clinic) {
                //callers.push(-1);
                randClinicID = Math.floor(Math.random() * (clinic.length-1)+1);
                console.log('randClinicID : ' + randClinicID);
                element(by.cssContainingText('option', clinic[randClinicID])).click();
                //element(by.css('select[ng-model="calllogs.response"]')).$('[value="' + clinic[randClinicID] + '"]').click();
                console.log('All Clinics : ' + clinic);
                console.log('Clinic : '+clinic[randClinicID]);


                element.all(by.css('[ng-model="calllogs.appointmentsForm.doctorId"] option')).getText().then(function(doctor) {
                    //callers.push(-1);
                    randDoctorID = Math.floor(Math.random() * (doctor.length-1));
                    console.log('randDoctorID : ' + randDoctorID);
                    element(by.cssContainingText('option', doctor[randDoctorID])).click();
                    //element(by.css('select[ng-model="calllogs.response"]')).$('[value="' + clinic[randClinicID] + '"]').click();
                    console.log('All Doctors : ' + doctor);
                    console.log('Doctor : '+doctor[randDoctorID]);
                });

                element(by.model('calllogs.appointmentsForm.scheduledDateTime')).click();

            });
        }
        element(by.model('calllogs.response')).$('option:checked').getAttribute('value').then(function (result) {
            console.log('Response Name : '+result);
            element(by.model('calllogs.notes')).sendKeys(result);
            browser.waitForAngular();
            element(by.buttonText('Add')).click();
            var status;
            if(result==2){
                status='Not Interested/Injured';
            }
            else if(result==3){
                status='Voice Mail';
            }
            else if(result==4){
                status='Appointment Scheduled';
            }
            else if(result==5){
                status='Do Not Call';
            }
            else if(result==8){
                status='Call Back';
            }
            else if(result==9){
                status='Unable To Reach';
            }
            checkPatient.checkPatient(9, status)
        });
    });
};