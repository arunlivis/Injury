var localReportNumber=require('../Helpers/getLocalReport.js');
var logout=require('../Helpers/toLogout');
var login=require('../Helpers/toLoginPage');
var searchCaller=require('../Helpers/searchCallerWithUsername');
var changePassword=require('../Helpers/changePassword');
var callersClick=require('../Helpers/clickCallers');
var urlPage=require('../Helpers/urlPage');
var callersFill=require('../Helpers/fillCallers');
var getCaller=require('../Helpers/getCallers');

describe('Call Center Admin', function() {

    it('Click on Callers', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
    });

    /*function fillCallers(status) {
        var firstName=element(by.model('caller.firstName'));
        var lastName=element(by.model('caller.lastName'));
        var userName=element(by.model('caller.username'));
        var phoneNumber=element(by.model('caller.phoneNumber'));
        var email=element(by.model('caller.emailAddress'));
        var notes=element(by.model('caller.notes'));

        browser.waitForAngular();

        firstName.sendKeys('12@#');
        expect(element(by.css('[ng-show="!myForm.firstName.$error.required&&myForm.firstName.$error.validateName"]')).isDisplayed()).toBe(true);
        firstName.clear();
        expect(element(by.css('[ng-show="myForm.firstName.$error.required"]')).isDisplayed()).toBe(true);
        firstName.sendKeys('Caller');

        lastName.sendKeys('12@#');
        expect(element(by.css('[ng-show="!myForm.lastName.$error.required&&myForm.lastName.$error.validateName"]')).isDisplayed()).toBe(true);
        lastName.clear();
        expect(element(by.css('[ng-show="myForm.lastName.$error.required"]')).isDisplayed()).toBe(true);
        lastName.sendKeys('Six');

        if(status=='add'){
            userName.sendKeys('12@#');
            expect(element(by.css('[ng-show="myForm.username.$error.pattern"]')).isDisplayed()).toBe(true);
            userName.clear();
            expect(element(by.css('[ng-show="myForm.username.$error.required"]')).isDisplayed()).toBe(true);
            userName.sendKeys('caller4');
            expect(element(by.css('[ng-show="myForm.username.$error.usernameexists"]')).isDisplayed()).toBe(true);
            userName.clear();
            userName.sendKeys('caller6');
        }
        else{
            expect(element(by.css('[ng-model="caller.username"][readonly="readonly"]')).isDisplayed()).toBe(true);
        }
        phoneNumber.sendKeys('caller3');
        expect(element(by.css('[ng-show="!myForm.phoneNumber.$error.required&&myForm.phoneNumber.$error.validateMobile"]')).isDisplayed()).toBe(true);
        phoneNumber.clear();
        phoneNumber.sendKeys('6325987413');

        email.sendKeys('caller3');
        expect(element(by.css('[ng-show="myForm.emailAddress.$error.email"]')).isDisplayed()).toBe(true);
        email.clear();
        email.sendKeys('caller6@gmail.com');

        notes.sendKeys('Notes');

        browser.waitForAngular();
    }*/

    /*it('Add Callers', function(){
        var saveButton=element(by.linkText('Save'));

        element(by.linkText('Add Caller')).click();

        fillCallers('add');
        saveButton.isDisplayed().then(function(saveStatus){
            if(saveStatus){
                saveButton.click();
            }
        });
        browser.waitForAngular();
        element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (value) {
            expect(value).toContain('caller5');
        })
    });*/

    /*var caller=[];
    it('Get Callers Username', function () {
        browser.sleep(200);
        element.all(by.repeater('caller in callers').column('caller.username')).getText().then(function (value) {
            console.log('Callers : '+value);
            console.log('Callers length : '+value.length);
            var randNoOfDays = Math.floor(Math.random() * value.length);
            caller.push(value[randNoOfDays]);
        })
    });

    it('Search Caller with Username', function(){
        searchCaller.searchCallerWithUsername(caller[0]);
    });*/

    /*it('Edit Callers', function(){
        var updateButton=element(by.linkText('Update'));
        getCaller.getCallers().then(function(caller){
            searchCaller.searchCallerWithUsername(caller);
            element(by.xpath('//!*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr[1]/td[6]/a[1]')).click();

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
    });*/


    it('Disable and Enable Callers', function(){
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

    /*it('Change Password', function(){
        logout.logout();
        browser.sleep(200);
        login.loginPage(caller[0], caller[0]);
        changePassword.changePassword(caller[0],'password');
    });

    it('Reset Password', function(){
        logout.logout();
        browser.sleep(200);
        login.loginPage('calleradmin', 'calleradmin');
        browser.waitForAngular();
        element(by.linkText('Callers')).click();
        browser.waitForAngular();
        searchCaller.searchCallerWithUsername(caller[0]);
        browser.waitForAngular();
        element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[4]")).click();
        browser.waitForAngular();
        element(by.linkText('Yes')).click();
        browser.sleep(300);
        expect(element(by.xpath("//!*[@id='page-wrapper']/div/div[1]/div/div/div")).isDisplayed()).toBe(true);
        logout.logout();
        browser.sleep(200);
        login.loginPage(caller[0],'password');
        browser.sleep(200);
        expect(browser.driver.findElement(by.xpath("//!*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);
    });*/

    /*it('Delete Caller', function () {
        browser.waitForAngular();
        browser.sleep(300);
        element(by.linkText('Callers')).click();
        browser.waitForAngular();
        browser.sleep(500);
        searchCaller.searchCallerWithUsername(caller[0]);
        //browser.waitForAngular();
        browser.sleep(300);
        browser.driver.findElement(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[6]/a[5]")).click();
        browser.sleep(300);
        element(by.linkText('Yes')).click();
        browser.sleep(300);
        browser.driver.findElement(by.xpath("//!*[@id='deleteCallerConfirmTwo']/div/div")).isDisplayed().then(function (viewModel) {
            console.log('viewModel : '+viewModel);
            if(viewModel){
                browser.driver.findElement(by.linkText('Yes')).click();
            }
        });
        browser.sleep(200);
        searchCaller.searchCallerWithUsername(caller[0],'aa');
        //browser.pause();
        browser.driver.findElement(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/dir-pagination-controls/div[2]")).getText().then(function(noCaller){
            expect(noCaller.substring(noCaller.lastIndexOf('of')+3, noCaller.lastIndexOf('records')-1)).toEqual('0');
        })
    })*/
});