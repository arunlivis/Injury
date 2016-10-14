

exports.countyName=function(user){
    var crashID;
    if(user='patient'){
        crashID=element.all(by.css('select[ng-model="patient.countyId"] option'));
    }
    if(user='crashReport'){
        crashID=element.all(by.css('select[ng-model="crashreport.county"] option'));
    }
    browser.sleep(200);
        return crashID.getText().then(function (value) {
            var randCounty = Math.floor(Math.random() * value.length);
            while(randCounty==0){
                randCounty = Math.floor(Math.random() * value.length);
            }
            return value[randCounty];
        });
};
