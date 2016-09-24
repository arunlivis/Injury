var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callersClick=require('../Helpers/clickCallers');
var getCaller=require('../Helpers/getCallers');
var searchCaller=require('../Helpers/searchCallerWithUsername');
var logout=require('../Helpers/toLogout');
var changePassword=require('../Helpers/changePassword');

describe('Call Center Admin', function() {
    it('Change and Reset Password', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
        getCaller.getCallers().then(function(caller){
            logout.logout();
            browser.sleep(200);
            login.loginPage(caller, caller);
            changePassword.changePassword(caller,'password');

            logout.logout();
            browser.sleep(200);
            login.loginPage('calleradmin', 'calleradmin');
            browser.waitForAngular();
            element(by.linkText('Callers')).click();
            browser.waitForAngular();
            searchCaller.searchCallerWithUsername(caller);
            browser.waitForAngular();
            element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[4]")).click();
            browser.waitForAngular();
            element(by.linkText('Yes')).click();
            browser.sleep(300);
            expect(element(by.xpath("//*[@id='page-wrapper']/div/div[1]/div/div/div")).isDisplayed()).toBe(true);
            logout.logout();
            browser.sleep(200);
            login.loginPage(caller,'password');
            browser.sleep(200);
            expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);
        })
    });
});