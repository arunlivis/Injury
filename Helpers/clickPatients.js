exports.clickPatients=function(){
    element(by.linkText('Patients')).click();
    browser.waitForAngular();
};