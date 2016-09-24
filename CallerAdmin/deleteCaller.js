var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callersClick=require('../Helpers/clickCallers');
var getCaller=require('../Helpers/getCallers');
var searchCaller=require('../Helpers/searchCallerWithUsername');
var changePassword=require('../Helpers/changePassword');

describe('Call Center Admin', function() {
    it('Delete Caller', function () {
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
        browser.waitForAngular();
        browser.sleep(300);
        element(by.linkText('Callers')).click();
        browser.waitForAngular();
        browser.sleep(500);
        getCaller.getCallers().then(function(caller){
            searchCaller.searchCallerWithUsername(caller);
            browser.sleep(300);
            browser.driver.findElement(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[5]")).click();
            browser.sleep(300);
            element(by.linkText('Yes')).click();
            browser.sleep(300);
            browser.driver.findElement(by.css('[class="modal fade ng-scope in"]')).isDisplayed().then(function (viewModel) {
                console.log('viewModel : '+viewModel);
                if(viewModel){
                    browser.driver.findElement(by.linkText('Yes')).click();
                }
            });
            browser.sleep(200);
            searchCaller.searchCallerWithUsername(caller,'aa');
            browser.driver.findElement(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/dir-pagination-controls/div[2]")).getText().then(function(noCaller){
                expect(noCaller.substring(noCaller.lastIndexOf('of')+3, noCaller.lastIndexOf('records')-1)).toEqual('0');
            })
        })
    })
});