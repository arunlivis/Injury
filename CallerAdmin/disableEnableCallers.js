var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callersClick=require('../Helpers/clickCallers');
var getCaller=require('../Helpers/getCallers');
var searchCaller=require('../Helpers/searchCallerWithUsername');
var logout=require('../Helpers/toLogout');

describe('Call Center Admin', function() {
    it('Disable and Enable Callers', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
        
        var enableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[2]"));
        var disableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[3]"));
        getCaller.getCallers().then(function(caller){
            searchCaller.searchCallerWithUsername(caller);
            enableButton.isDisplayed().then(function (enable) {
                if(enable){
                    enableButton.click();
                    browser.waitForAngular();
                    expect(disableButton.isDisplayed()).toBe(true);

                    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[1]")).getAttribute('href').then(function (str) {
                        console.log('str : '+str);
                        var callerID=str.lastIndexOf("/")+1;
                        browser.sleep(500);
                        element(by.linkText('Patients')).click();
                        console.log('Caller ID : '+str.substring(callerID));

                        browser.sleep(200);
                        //browser.waitForAngular();
                        element(by.model('isCheckedAllGroupPatients')).click();
                        element(by.id('assign')).click();

                        element.all(by.css('select[ng-model="myForm.callerId"] option')).getAttribute('value').then(function (callers0) {
                            expect(callers0).not.toContain(str.substring(callerID));
                        });
                    });
                    browser.sleep(500);
                    element(by.buttonText('Cancel')).click();
                    logout.logout();
                    login.loginPage(caller,caller);
                    browser.sleep(200);
                    expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);
                    login.loginPage('calleradmin', 'calleradmin');
                }
                else{
                    expect(disableButton.isDisplayed()).toBe(true);

                    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[1]")).getAttribute('href').then(function (str) {
                        console.log('str : '+str);
                        var callerID=str.lastIndexOf("/")+1;
                        browser.sleep(500);
                        element(by.linkText('Patients')).click();
                        console.log('Caller ID : '+str.substring(callerID));

                        browser.sleep(200);
                        element(by.model('isCheckedAllGroupPatients')).click();
                        element(by.id('assign')).click();
                        browser.sleep(500);
                        element.all(by.css('select[ng-model="myForm.callerId"] option')).getAttribute('value').then(function (callers1) {
                            expect(callers1).not.toContain(str.substring(callerID));
                        });
                        browser.sleep(500);
                        element(by.buttonText('Cancel')).click();
                        logout.logout();
                        login.loginPage(caller,caller);
                        browser.sleep(200);
                        expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);

                        login.loginPage('calleradmin', 'calleradmin');
                        browser.waitForAngular();
                        element(by.linkText('Callers')).click();
                        browser.waitForAngular();
                        searchCaller.searchCallerWithUsername(caller);
                        disableButton.click();
                        browser.waitForAngular();
                        expect(enableButton.isDisplayed()).toBe(true);
                        browser.sleep(500);
                        element(by.linkText('Patients')).click();
                        browser.sleep(200);
                        element(by.model('isCheckedAllGroupPatients')).click();
                        element(by.id('assign')).click();
                        browser.waitForAngular();
                        browser.sleep(200);

                        element.all(by.css('select[ng-model="myForm.callerId"] option')).getAttribute('value').then(function (callers2) {
                            expect(callers2).toContain(str.substring(callerID));
                        });
                    });
                    browser.sleep(200);
                }
            })
        })
    });
});