exports.getPhone=function(user){
    var phoneNumber = [];
    var data;

    if(user=='caller'){
        data='callerData';
    }
    else if(user=='calleradmin'){
        data='patient';
    }
        browser.sleep(500);
        return element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.phoneNumber')).getText().then(function (phone) {
            phoneNumber.push(phone.filter(String));
            phoneNumber=phoneNumber[0].toString().split(",");
            var randPhone=Math.floor(Math.random() * phoneNumber.length);
            return phoneNumber[randPhone];
        });
};