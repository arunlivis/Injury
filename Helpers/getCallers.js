exports.getCallers=function(){
    browser.sleep(200);
    return element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (value) {
        var randCaller = Math.floor(Math.random() * value.length);
        return value[randCaller];
    })
};