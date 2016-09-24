var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callersClick=require('../Helpers/clickCallers');
var getCaller=require('../Helpers/getCallers');
var searchCaller=require('../Helpers/searchCallerWithUsername');
var callersFill=require('../Helpers/fillCallers');

describe('Call Center Admin', function() {
    it('Edit Callers', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
        var updateButton=element(by.linkText('Update'));
        getCaller.getCallers().then(function(caller){
            searchCaller.searchCallerWithUsername(caller);
            element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr[1]/td[6]/a[1]')).click();

            callersFill.fillCallers('edit');

            updateButton.isDisplayed().then(function(updateStatus){
                if(updateStatus){
                    updateButton.click();
                }
            });
            browser.waitForAngular();
            element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (value) {
                expect(value).toContain(caller);
            })
        });
    });
});