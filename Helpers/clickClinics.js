exports.clickClinics=function(){
    browser.waitForAngular();
    element(by.linkText('Clinics')).click();
    browser.waitForAngular();
};