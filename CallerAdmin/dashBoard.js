var callers, clinics, appointments, patients;
var str;


describe('Call Center Admin', function() {

    protractor.urlHelper.urlPage();
    protractor.loginHelper.loginPage('gfnvn','gfnvn');



    it('Dashboard', function(){
        //browser.waitForAngular();

        browser.driver.getTitle().then(function (value) {
            console.log(value);
        });
        
        browser.sleep(500);
        //browser.driver.waitForAngular();
        for(var i=7; i<11;i++ ){
            var func=(function(){
                var j=i;
                return function(value){
                    if(j==7){
                        callers=value;
                        console.log('Count of Callers '+callers);
                    }
                    else if(j==8){
                        clinics=value;
                        console.log('Count of Clinics '+clinics);

                    }
                    else if(j==9){
                        appointments=value;
                        console.log('Count of Appointments '+appointments);
                    }
                    else if(j==10){
                        patients=value;
                        console.log('Count of Patients '+patients);
                    }
                    else{
                        console.log("Unknown "+j);
                    }

                    element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div['+j+']/div/a/div/span[1]')).click();
                    //browser.pause();
                    browser.sleep(200);
                    browser.driver.executeScript('window.scrollTo(0,10000);');

                    function count(elem){
                        elem.getText().then(function (value) {
                            console.log("Count "+value);
                            str=value.substring(value.lastIndexOf(" "), value.lastIndexOf(" ",17)).trim();
                            console.log("str "+str);
                            if(j==7){
                                expect(callers).toEqual(str);
                            }
                            else if(j==8){
                                expect(clinics).toEqual(str);
                            }
                            else if(j==9){
                                expect(appointments).toEqual(str);
                            }
                            else if(j==10){
                                expect(patients).toEqual(str);
                            }
                        });

                    }

                        if(j==7||j==8||j==10){
                            var adminCount=element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/dir-pagination-controls/div[2]'));
                            count(adminCount);
                        }
                        else if(j==9){
                            var reportCount=element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/div[4]/dir-pagination-controls/div[2]'));
                            //browser.sleep(5000);
                            // browser.driver.executeScript('window.scrollTo(0,10000);');
                            // browser.sleep(100);
                            count(reportCount);

                        }

                    element(by.partialLinkText('Dashboard')).click();
                    browser.sleep(1000);
                }})();
            element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div['+i+']/div/div/div/div[2]/div[1]')).getText().then(func);

        }


    });

    protractor.changePasswordelper.changePassword('gfnvn', 'password')
    protractor.logoutHelper.logout();
    protractor.loginHelper.loginPage('gfnvn', 'gfnvn');

    it('Check changed Password Admin', function () {
        browser.driver.findElement(by.css('[class="fa fa-exclamation-triangle"]')).isDisplayed().then(function (value) {
            if(value){
                browser.driver.findElement(by.css('div[style="color:#FF0000;"]')).getText().then(function (result) {
                    console.log('result '+result);
                })
            }
        })
    })
});