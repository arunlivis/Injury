var login=require('../Helpers/toLoginPage');
var changePassword=require('../Helpers/changePassword');
var logout=require('../Helpers/toLogout');
var clinics, patients;
var str;


describe('Caller', function() {

    protractor.urlHelper.urlPage();

    it('Dashboard', function(){
        //browser.waitForAngular();
        login.loginPage('caller4', 'caller4');
        browser.driver.getTitle().then(function (value) {
            console.log(value);
        });
        browser.sleep(500);
        for(var i=11; i<13;i++ ){
            var func=(function(){
                var j=i;
                return function(value){
                    if(j==11){
                        patients=value;
                        console.log('Count of Patients '+patients);
                    }
                    else if(j==12){
                        clinics=value;
                        console.log('Count of Clinics '+clinics);
                    }
                    else{
                        console.log("Unknown "+j);
                    }
                    element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div['+j+']/div/a/div/span[1]')).click();
                    browser.sleep(200);
                    browser.driver.executeScript('window.scrollTo(0,10000);');

                    function count(elem){
                        elem.getText().then(function (value) {
                            console.log("Count "+value);
                            str=value.substring(value.lastIndexOf(" "), value.lastIndexOf(" ",17)).trim();
                            console.log("str "+str);
                            if(j==11){
                                expect(patients).toEqual(str);
                            }
                            else if(j==12){
                                expect(clinics).toEqual(str);
                            }
                        });

                    }

                        if(j==12){
                            var clinicCount=element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/dir-pagination-controls/div[2]'));
                            count(clinicCount);
                        }
                        else if(j==9){
                            var patientCount=element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/dir-pagination-controls/div[2]'));
                            count(patientCount);
                        }
                    element(by.partialLinkText('Dashboard')).click();
                    browser.sleep(1000);
                }})();
            element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div['+i+']/div/div/div/div[2]/div[1]')).getText().then(func);
        }
    });

    /*it('Check changed Password Admin', function () {
        changePassword.changePassword('password','caller4');
        logout.logout();
        login.loginPage('caller4', 'caller4');
        browser.driver.findElement(by.css('[class="fa fa-exclamation-triangle"]')).isDisplayed().then(function (value) {
            if(value){
                browser.driver.findElement(by.css('div[style="color:#FF0000;"]')).getText().then(function (result) {
                    console.log('result '+result);
                })
            }
        })
    });*/
});