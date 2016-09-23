exports.fillCallers=function(status, existName){
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
    lastName.sendKeys('Nine');

    if(status=='add'){
        userName.sendKeys('12@#');
        expect(element(by.css('[ng-show="myForm.username.$error.pattern"]')).isDisplayed()).toBe(true);
        userName.clear();
        expect(element(by.css('[ng-show="myForm.username.$error.required"]')).isDisplayed()).toBe(true);
        userName.sendKeys(existName);
        expect(element(by.css('[ng-show="myForm.username.$error.usernameexists"]')).isDisplayed()).toBe(true);
        userName.clear();
        userName.sendKeys('caller9');
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
    email.sendKeys('caller9@gmail.com');

    notes.sendKeys('Notes');

    browser.waitForAngular();
};