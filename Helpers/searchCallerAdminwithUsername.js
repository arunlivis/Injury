exports.searchCallerAdminWithUsername=function(callerAdmin) {
    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys(callerAdmin);
    browser.waitForAngular();
    element.all(by.repeater('callerAdmin in callerAdmins').column('callerAdmin.username')).getText().then(function (value) {
        expect(value).toContain(callerAdmin);
    })

};
