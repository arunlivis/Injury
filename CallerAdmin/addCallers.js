var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callersClick=require('../Helpers/clickCallers');
var callersFill=require('../Helpers/fillCallers');

describe('Call Center Admin', function() {
    it('Add Callers', function(){
        var saveButton=element(by.linkText('Save'));
        //var callersName=element.all(by.repeater('caller in callers').column('caller.username')).getText();
        var randName;
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
        element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (names) {
            console.log('username : '+names);
            randName=Math.floor(Math.random()*names.length);
            element(by.linkText('Add Caller')).click();

            callersFill.fillCallers('add', names[randName]);
        });

        saveButton.isDisplayed().then(function(saveStatus){

            if(saveStatus){
                saveButton.click();
            }
        });
        browser.waitForAngular();
        element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (value) {
            expect(value).toContain('caller5');
        })
    });
});