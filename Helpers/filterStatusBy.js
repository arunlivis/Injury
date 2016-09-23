var checkPatient=require('../Helpers/checkPatients');

exports.filterStatusBy=function(){
    var randStatusID;
    browser.sleep(1000);
    element.all(by.css('[ng-model="patient.patientStatus"] option')).getAttribute('value').then(function(status){
        randStatusID=Math.floor(Math.random()*status.length);
        console.log('randTierID : '+randStatusID);
        element(by.css('select[ng-model="patient.patientStatus"]')).$('[value="'+status[randStatusID]+'"]').click();
        console.log('All Status : '+status);
        console.log('Status : '+status[randStatusID]);
    });
    browser.waitForAngular();
    element(by.model('patient.patientStatus')).$('option:checked').getText().then(function (result) {
        console.log('Status Name : '+result);
        if(randStatusID!=0){
            checkPatient.checkPatient(9, result);
        }
    });
};