var callerAdmin, lawyerAdmin, crashReport, patient;
var str;


describe('Exercise Management', function() {

    protractor.urlHelper.urlPage();
    protractor.loginHelper.loginPage('superadmin','superadmin');



    it('Dashboard', function(){
        //browser.waitForAngular();

        browser.driver.getTitle().then(function (value) {
            console.log(value);
        });
        
        browser.sleep(500);
        //browser.driver.waitForAngular();
        for(var i=1; i<5;i++ ){
            var func=(function(){
                var j=i;
                return function(value){
                    if(j==1){
                        callerAdmin=value;
                        console.log('Count of Call Center Admin '+callerAdmin);
                    }
                    else if(j==2){
                        lawyerAdmin=value;
                        console.log('Count of Lawyer Admin '+lawyerAdmin);

                    }
                    else if(j==3){
                        crashReport=value;
                        console.log('Count of Crash Report '+crashReport);
                    }
                    else if(j==4){
                        patient=value;
                        console.log('Count of Patient '+patient);
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
                            if(j==1){
                                expect(callerAdmin).toEqual(str);
                            }
                            else if(j==2){
                                expect(lawyerAdmin).toEqual(str);
                            }
                            else if(j==3){
                                expect(crashReport).toEqual(str);
                            }
                            else if(j==4){
                                expect(patient).toEqual(str);
                            }
                        });

                    }

                        if(j==1||j==2){
                            var adminCount=element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/dir-pagination-controls/div[2]'));
                            count(adminCount);
                        }
                        else if(j==3||j==4){
                            var reportCount=element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/dir-pagination-controls/div[2]'));
                            browser.sleep(5000);
                            browser.driver.executeScript('window.scrollTo(0,10000);');
                            browser.sleep(100);
                            count(reportCount);

                        }

                    element(by.partialLinkText('Dashboard')).click();
                    browser.sleep(5000);
                }})();
            element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div['+i+']/div/div/div/div[2]/div[1]')).getText().then(func);

        }


    });
});