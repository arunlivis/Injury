exports.clickCallerAdmin=function(){
    browser.waitForAngular();
    element(by.linkText('Call Center Admin')).click();
    browser.waitForAngular();
};