exports.clickCrashReport=function(){
    browser.waitForAngular();
    element(by.linkText('Crash Report')).click();
    browser.waitForAngular();
};