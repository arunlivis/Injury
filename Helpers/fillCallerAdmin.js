exports.fillCallerAdmin=function(status, existName){
    var firstName=element(by.name('firstName'));
    var lastName=element(by.name('lastName'));
    var address=element(by.name('address'));
    var city=element(by.name('city'));
    var state=element(by.name('state'));
    var zipcode=element(by.name('zipcode'));
    var userName=element(by.name('username'));
    var phoneNumber=element(by.name('phoneNumber'));
    var email=element(by.name('emailAddress'));
    var notes=element(by.name('notes'));

    
    browser.sleep(500);
    firstName.sendKeys('12@#');
    expect(element(by.css('[ng-show="!myForm.firstName.$error.required&&myForm.firstName.$error.validateName"]')).isDisplayed()).toBe(true);
    firstName.clear();
    expect(element(by.css('[ng-show="myForm.firstName.$error.required"]')).isDisplayed()).toBe(true);
    firstName.sendKeys('Admin');
    lastName.sendKeys('12@#');
    expect(element(by.css('[ng-show="!myForm.lastName.$error.required&&myForm.lastName.$error.validateName"]')).isDisplayed()).toBe(true);
    lastName.clear();
    expect(element(by.css('[ng-show="myForm.lastName.$error.required"]')).isDisplayed()).toBe(true);
    lastName.sendKeys('Two');
    address.sendKeys('12@#');
    address.clear();
    expect(element(by.css('[ng-show="myForm.address.$error.required"]')).isDisplayed()).toBe(true);
    address.sendKeys('Medavakkam');
    city.sendKeys('12@#');
    expect(element(by.css('[ng-show="!myForm.city.$error.required&&myForm.city.$error.validateName"]')).isDisplayed()).toBe(true);
    city.clear();
    expect(element(by.css('[ng-show="myForm.city.$error.required"]')).isDisplayed()).toBe(true);
    city.sendKeys('Chennai');
    state.sendKeys('12@#');
    expect(element(by.css('[ng-show="!myForm.state.$error.required&&myForm.state.$error.validateName"]')).isDisplayed()).toBe(true);
    state.clear();
    expect(element(by.css('[ng-show="myForm.state.$error.required"]')).isDisplayed()).toBe(true);
    state.sendKeys('Tamilnadu');
    zipcode.sendKeys('12@#');
    expect(element(by.css('[ng-show="!myForm.zipcode.$error.required&&myForm.zipcode.$error.validateZipcode"]')).isDisplayed()).toBe(true);
    zipcode.clear();
    expect(element(by.css('[ng-show="myForm.zipcode.$error.required"]')).isDisplayed()).toBe(true);
    zipcode.sendKeys('12345');
    if(status=='add'){
        userName.sendKeys(existName);
        expect(element(by.css('[ng-show="myForm.username.$error.usernameexists"]')).isDisplayed()).toBe(true);
        userName.sendKeys('12@#');
        expect(element(by.css('[ng-show="myForm.username.$error.pattern"]')).isDisplayed()).toBe(true);
        userName.clear();
        expect(element(by.css('[ng-show="myForm.username.$error.required"]')).isDisplayed()).toBe(true);
        userName.sendKeys('admin2');
    }
    else{
        expect(element(by.css('[ng-model="callerAdmin.username"][readonly="readonly"]')).isDisplayed()).toBe(true);
    }

    phoneNumber.sendKeys('12@#');
    expect(element(by.css('[ng-show="!myForm.phoneNumber.$error.required&&myForm.phoneNumber.$error.validateMobile"]')).isDisplayed()).toBe(true);
    phoneNumber.clear();
    expect(element(by.css('[ng-show="myForm.phoneNumber.$error.required"]')).isDisplayed()).toBe(true);
    phoneNumber.sendKeys('1234567890');
    email.sendKeys('12@#');
    expect(element(by.css('[ng-show="myForm.emailAddress.$error.email"]')).isDisplayed()).toBe(true);
    email.clear();
    expect(element(by.css('[ng-show="myForm.emailAddress.$error.required"]')).isDisplayed()).toBe(true);
    email.sendKeys('admin2@gmail.com');
    notes.sendKeys('admin2@gmail.com');

    browser.waitForAngular();

    
    var clickID;
    var clickable=0;
    var arrID=[];
    var arrCorrectID = [];
    var arrOldCheckedID=[];
    for(i=0;i<10;i++){
        var randID = Math.floor(Math.random()*89);
        if(randID==0){
            clickID='checkAll';
        }
        else{
            clickID=randID.toString();
        }
        element(by.id(clickID)).click();

        if(randID==0){
            clickable++;
            if(clickable%2==1){
                arrID=[];
                for(j=1;j<89;j++){
                    arrID.push(j);
                }
            }
            else{
                arrID=[];
            }
        }
        else{
            arrID.push(randID);
        }
    }

    return element(by.id('1')).isSelected().then(function (value) {
        if(status=='update'){
            arrID=arrID.concat(arrOldCheckedID);
        }
        
        arrID.sort(function(c, d){return c-d});

        var current = null;
        var cnt = 0;
        for (var i = 0; i < arrID.length; i++) {
            if (arrID[i] != current) {
                if (cnt > 0) {
                    if(cnt%2==1){
                        arrCorrectID.push(current);
                    }
                }
                current = arrID[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            if(cnt%2==1){
                arrCorrectID.push(current);
            }
        }
        return arrCorrectID;
    });
};