exports.getCallerAdmins=function(){
    return element.all(by.repeater('callerAdmin in callerAdmins').column('callerAdmin.username')).getText().then(function (names) {
        var randName = Math.floor(Math.random() * names.length);
        return names[randName];
    });
};