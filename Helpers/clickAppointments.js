exports.clickAppointments=function(){
    browser.waitForAngular();
    element(by.linkText('Appointments')).click();
    browser.waitForAngular();
    browser.sleep(500);
};