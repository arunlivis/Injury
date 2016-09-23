exports.patientName=function(){
    browser.sleep(500);
    return element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.name')).getText().then(function (name) {
        return name;
    });
};