var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');

describe('Caller', function() {

    it('Search with Tier', function () {
        var randTierID;

        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
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
                checkPatient.checkPatient(8, result);
            }

        });
    },1000000);
});