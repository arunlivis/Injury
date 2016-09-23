exports.searchCallerWithUsername=function(caller,txt) {
    element(by.model('search.username')).clear();
    element(by.model('search.username')).sendKeys(caller);
        browser.waitForAngular();
    if(txt!='aa'){
        element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (value) {
            expect(value).toContain(caller);
        })
    }

};
