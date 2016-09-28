exports.patientName=function(user){
    if(user=='caller'){
        data='callerData';
    }
    else if(user=='calleradmin'){
        data='patient';
    }
    browser.sleep(500);
    return element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.name')).getText().then(function (name) {
        var randName=Math.floor(Math.random() * name.length);
        return name[randName];
    });
};