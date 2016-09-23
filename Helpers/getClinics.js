exports.getClinics=function(){
    browser.sleep(200);
    return element.all(by.repeater('clinic in clinicFilter').column('clinic.clinicName')).getText().then(function (value) {
        return value;
    })
};