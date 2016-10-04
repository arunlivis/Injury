var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var checkPatient=require('../Helpers/checkPatients');

describe('Caller Admin', function() {
    it('Search with Tier', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        patientsClick.clickPatients();
        var randTierID;
        browser.sleep(1000);
        element.all(by.css('[ng-model="patient.tier"] option')).getAttribute('value').then(function(tiers){
            randTierID=Math.floor(Math.random()*tiers.length);
            console.log('randTierID : '+randTierID);
            element(by.css('select[ng-model="patient.tier"]')).$('[value="'+tiers[randTierID]+'"]').click();
            console.log('All Tiers : '+tiers);
            console.log('Tiers : '+tiers[randTierID]);
        });
        element(by.linkText('Search')).click();
        browser.waitForAngular();
        element(by.model('patient.tier')).$('option:checked').getText().then(function (result) {
            console.log('Tier Name : '+result);
            if(randTierID!=0){
                checkPatient.checkPatient('calleradmin', 8, result);
            }
        });
    },1000000);
});