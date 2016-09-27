exports.enableClinic=function(clinic){
    element.all(by.css('select[ng-model="calllogs.appointmentsForm.clinicId"] option')).getAttribute('value').then(function (clinics) {
        expect(clinics).toContain('number:'+clinic);
    });
};