var callerAdminClick=require('../Helpers/clickCallCenterAdmin');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var getCallerAdmin=require('../Helpers/getCallerAdmins');
var searchCallerAdmin=require('../Helpers/searchCallerAdminwithUsername');
var logout=require('../Helpers/toLogout');

describe('Super Admin', function() {
    it('Disable and Enable Call Center Admin', function(){
        urlPage.urlPage();
        login.loginPage('superadmin','superadmin');
        callerAdminClick.clickCallerAdmin();
        browser.sleep(500);

        var enableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[2]"));
        var disableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[3]"));
        getCallerAdmin.getCallerAdmins().then(function(callerAdmin){
            searchCallerAdmin.searchCallerAdminWithUsername(callerAdmin);
            enableButton.isDisplayed().then(function (enable) {
                if(enable){
                    enableButton.click();
                    browser.waitForAngular();
                    expect(disableButton.isDisplayed()).toBe(true);

                    logout.logout();
                    login.loginPage(callerAdmin,callerAdmin);
                    browser.sleep(200);
                    expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);
                    login.loginPage('superadmin', 'superadmin');
                }
                else{
                    expect(disableButton.isDisplayed()).toBe(true);
                    logout.logout();
                    login.loginPage(callerAdmin,callerAdmin);
                    browser.sleep(200);
                    expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);

                    login.loginPage('superadmin', 'superadmin');
                    browser.waitForAngular();
                    callerAdminClick.clickCallerAdmin();
                    searchCallerAdmin.searchCallerAdminWithUsername(callerAdmin);
                    disableButton.click();
                    browser.waitForAngular();
                    expect(enableButton.isDisplayed()).toBe(true);
                    logout.logout();
                    login.loginPage(callerAdmin,callerAdmin);
                    browser.waitForAngular();
                    expect(element(by.xpath("//*[@id='page-wrapper']/div/div/div[1]/div/h2")).isDisplayed()).toBe(true);

                    browser.sleep(200);
                }
            })
        })
    });
});