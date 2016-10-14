var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callerAdminClick=require('../Helpers/clickCallCenterAdmin');
var getCallerAdmin=require('../Helpers/getCallerAdmins');
var searchCallerAdmin=require('../Helpers/searchCallerAdminwithUsername');
var logout=require('../Helpers/toLogout');
var changePassword=require('../Helpers/changePassword');

describe('Super Admin', function() {
    it('Change and Reset Password', function(){
        urlPage.urlPage();
        login.loginPage('superadmin', 'superadmin');
        callerAdminClick.clickCallerAdmin();
        getCallerAdmin.getCallerAdmins().then(function(callerAdmin){
            logout.logout();
            browser.sleep(200);
            login.loginPage(callerAdmin, callerAdmin);
            changePassword.changePassword(callerAdmin,'password');

            logout.logout();
            browser.sleep(200);
            login.loginPage('superadmin', 'superadmin');
            callerAdminClick.clickCallerAdmin();
            searchCallerAdmin.searchCallerAdminWithUsername(callerAdmin);
            browser.waitForAngular();
            element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[4]")).click();
            browser.waitForAngular();
            element(by.linkText('Yes')).click();
            browser.sleep(300);
            expect(element(by.xpath("//*[@id='page-wrapper']/div/div[1]/div/div/div")).isDisplayed()).toBe(true);
            logout.logout();
            browser.sleep(200);
            login.loginPage(callerAdmin,'password');
            browser.sleep(200);
            expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);
        })
    });
});