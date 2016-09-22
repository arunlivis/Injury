var urlPage=require('../Helpers/urlPage');
var logout=require('../Helpers/toLogout');
var login=require('../Helpers/toLoginPage');
var clinicsClick=require('../Helpers/clickClinics');
var clinics=require('../Helpers/getClinics');

describe('Caller', function () {
    it('Disable or Enable Clinic', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        clinicsClick.clickClinics();
        clinics.getClinics().then(function (clinicList) {
            var randClinic = Math.floor(Math.random() * clinicList.length);
            logout.logout();
            login.loginPage('calleradmin', 'calleradmin');
            browser.waitForAngular();
            clinicsClick.clickClinics();
            element(by.model('search.clinicName')).clear();
            element(by.model('search.clinicName')).sendKeys(clinicList[randClinic]);
            browser.waitForAngular();
            element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[4]")).isDisplayed().then(function (isDisable) {
                logout.logout();
                login.loginPage('caller4', 'caller4');
                browser.waitForAngular();
                clinicsClick.clickClinics();
                element(by.model('search.clinicName')).clear();
                element(by.model('search.clinicName')).sendKeys(clinicList[randClinic]);
                browser.waitForAngular();
                if(isDisable){
                    expect(element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/span[2]")).getText()).toEqual('Disabled');
                }
                else{
                    expect(element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/span[1]")).getText()).toEqual('Enabled');
                }
            })
        });
    })
});