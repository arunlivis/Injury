var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');

exports.countyName=function(){
    var county=[];
    it('Get County', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();

        browser.sleep(200);
        element.all(by.css('select[ng-model="patient.countyId"] option')).getText().then(function (value) {
            console.log('Counties : '+value);
            console.log('Counties length : '+value.length);
            var randCounty = Math.floor(Math.random() * value.length);
            while(randCounty==0){
                console.log('randCounty0 : '+randCounty);
                randCounty = Math.floor(Math.random() * value.length);
                console.log('randCounty1 : '+randCounty);
            }
            county.push(value[randCounty]);
            console.log('randCounty : '+randCounty);
        });
    });

    it('Search Crash Report', function () {
        browser.sleep(100);
        element(by.cssContainingText('option', county[0])).click();
        browser.sleep(100);
        element(by.model('patient.countyId')).$('option:checked').getText().then(function (result) {
            console.log('County Name: '+result);
        });

        browser.sleep(500);
        element(by.linkText('Search')).click();
        browser.waitForAngular();
        //checkPatient(1, counties);
        checkPatient.checkPatient(1,county[0]);
    });

};
/*exports.countyList=function(){
    var county=[];
    browser.sleep(200);
    element.all(by.css('select[ng-model="patient.countyId"] option')).getText().then(function (value) {
        console.log('Counties : '+value);
        console.log('Counties length : '+value.length);
        var randCounty = Math.floor(Math.random() * value.length);
        while(randCounty==0){
            console.log('randCounty0 : '+randCounty);
            randCounty = Math.floor(Math.random() * value.length);
            console.log('randCounty1 : '+randCounty);
        }
        county.push(value[randCounty]);
        console.log('randCounty : '+randCounty);
    });
    return county;
};*/

/*
exports.countyName=function(){

    browser.sleep(100);
    element(by.cssContainingText('option', countyName.countList())).click();
    browser.sleep(100);
    element(by.model('patient.countyId')).$('option:checked').getText().then(function (result) {
        console.log('County Name: '+result);
    });

    browser.sleep(500);
    element(by.linkText('Search')).click();
    browser.waitForAngular();
    checkPatient(1, countyName.countList());
};*/
