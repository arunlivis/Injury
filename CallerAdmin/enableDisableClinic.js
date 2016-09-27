var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var clinicsClick=require('../Helpers/clickClinics');
var clinicsStatus=require('../Helpers/clinicStatus');
var clinics=require('../Helpers/getClinics');

describe('Call Center Admin', function () {
    it('Disable and Enable Clinics', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        clinicsClick.clickClinics();

        var enableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[3]"));
        var disableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[4]"));

        browser.waitForAngular();
        clinics.getClinics().then(function (clinicList) {
            var randClinic = Math.floor(Math.random() * clinicList.length);
            element(by.model('search.clinicName')).sendKeys(clinicList[randClinic]);
            enableButton.isDisplayed().then(function (isEnable) {
                if(isEnable){
                    clinicsStatus.clinicStatus('enable');
                    clinicsClick.clickClinics();
                    element(by.model('search.clinicName')).sendKeys(clinicList[randClinic]);
                    enableButton.click();
                    browser.waitForAngular();
                    expect(disableButton.isDisplayed()).toBe(true);
                    clinicsStatus.clinicStatus('disable');
                }
                else{
                    clinicsStatus.clinicStatus('disable');
                    clinicsClick.clickClinics();
                    element(by.model('search.clinicName')).sendKeys(clinicList[randClinic]);
                    disableButton.click();
                    browser.waitForAngular();
                    expect(enableButton.isDisplayed()).toBe(true);
                    clinicsStatus.clinicStatus('enable');
                }
            })
        });

    });
});
