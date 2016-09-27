exports.fillDr=function(txt){
    
        element(by.repeater('doctorInput in clinic.doctorsForms')).isPresent().then(function (isDrDisplay) {
            if(isDrDisplay){
                element.all(by.repeater('doctorInput in clinic.doctorsForms')).count().then(function(count) {
                    for(n=0;n<count;n++){
                        element(by.name('doctorName'+n)).sendKeys('Doctor1@#43');
                        browser.sleep(300);
                        expect(element(by.css('[ng-show="!myForm.doctorName0.$error.required&&myForm.doctorName0.$error.validateName"]')).isDisplayed()).toBe(true);
                        element(by.name('doctorName'+n)).clear();
                        browser.sleep(300);
                        expect(element(by.css('[ng-show="myForm.doctorName0.$error.required"]')).isDisplayed()).toBe(true);
                        element(by.name('doctorName'+n)).sendKeys('Doctor');
                        for(o=0;o<2;o++){
                            var randDr= Math.floor(Math.random() * 2);
                            if(randDr==0){
                                element(by.model('doctorInput.titleDr')).click();
                            }
                            else if(randDr==1){
                                element(by.model('doctorInput.titleDc')).click();
                            }
                        }
                    }
                    if(count>=1){
                        var randRemove=Math.floor(Math.random() * 2);
                        if(randRemove=1){
                            browser.sleep(100);
                                
                            if(txt==""){
                                element(by.partialLinkText('Remove')).click();
                                browser.sleep(300);
                            }
                            else{
                                    element(by.partialLinkText('Remove')).click();
                                    browser.sleep(300);
                                    element(by.partialLinkText("Yes")).click();
                                    browser.sleep(100);
                            }
                        }
                    }

                    if(count>1){
                        element.all(by.repeater('doctorInput in clinic.doctorsForms')).count().then(function(count1) {
                            expect(count1).toEqual(count-1);
                        })
                    }
                });
            }
            else {
                expect(isDrDisplay).toBe(false);
            }
        })
};