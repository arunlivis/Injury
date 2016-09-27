exports.disableClinic=function(clinic){
    element.all(by.css('select[ng-model="calllogs.appointmentsForm.clinicId"] option')).getAttribute('value').then(function (clinics) {
        expect(clinics).not.toContain('number:'+clinic);
    });
};
