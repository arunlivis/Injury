var logout=require('../Helpers/toLogout');
var login=require('../Helpers/toLoginPage');

describe('Call Center Admin', function () {
    protractor.urlHelper.urlPage();

    it('Click on Clinics', function(){
        login.loginPage('calleradmin', 'calleradmin');
        browser.waitForAngular();
        element(by.linkText('Clinics')).click();
        browser.waitForAngular();
    });

    var arrWorking=[];
    function fillClinics(status) {
        var name=element(by.model('clinic.clinicName'));
        var address=element(by.model('clinic.address'));
        var city=element(by.model('clinic.city'));
        var zip=element(by.model('clinic.zipcode'));
        var officeNo=element(by.model('clinic.officeNumber'));
        var faxNo=element(by.model('clinic.faxNumber'));
        var serviceArea=element(by.model('clinic.serviceArea'));

        browser.sleep(200);
        name.sendKeys('Name');
        name.clear();
        expect(element(by.css('[ng-show="myForm.clinicName.$error.required"]')).isDisplayed()).toBe(true);
        if(status=='save'){
            name.sendKeys('Clinic Three');
        }
        else if(status=='update'){
            name.sendKeys(clinicName[0]);
        }
        address.sendKeys('Clinic Address');
        address.clear();
        expect(element(by.css('[ng-show="myForm.address.$error.required"]')).isDisplayed()).toBe(true);
        address.sendKeys('Clinic Address');
        city.sendKeys('Columbiana23@');
        expect(element(by.css('[ng-show="!myForm.city.$error.required&&myForm.city.$error.validateName"]')).isDisplayed()).toBe(true);
        city.clear();
        expect(element(by.css('[ng-show="myForm.city.$error.required"]')).isDisplayed()).toBe(true);
        city.sendKeys('Columbiana');
        element(by.css('select[ng-model="clinic.country"]')).$('[value="United States"]').click();
        element(by.cssContainingText('option', '-- Select Country --')).click();
        expect(element(by.css('[ng-show="myForm.country.$error.required"]')).isDisplayed()).toBe(true);
        element(by.css('select[ng-model="clinic.country"]')).$('[value="United States"]').click();
        element(by.css('select[ng-model="clinic.state"]')).$('[value="Ohio"]').click();
        element(by.cssContainingText('option', '-- Select State --')).click();
        expect(element(by.css('[ng-show="myForm.state.$error.required"]')).isDisplayed()).toBe(true);
        element(by.css('select[ng-model="clinic.state"]')).$('[value="Ohio"]').click();
        element.all(by.css('select[ng-model="clinic.county"] option')).getAttribute('value').then(function (counties) {
            var randCountyID = Math.floor(Math.random() * (counties.length-1))+1;
            console.log('County : '+counties[randCountyID]);
            element(by.css('select[ng-model="clinic.county"]')).$('[value="'+counties[randCountyID]+'"]').click();
        });
        element(by.cssContainingText('option', '-- Select County --')).click();
        expect(element(by.css('[ng-show="myForm.county.$error.required"]')).isDisplayed()).toBe(true);
        element.all(by.css('select[ng-model="clinic.county"] option')).getAttribute('value').then(function (counties) {
            var randCountyID = Math.floor(Math.random() * (counties.length-1))+1;
            console.log('County : '+counties[randCountyID]);
            element(by.css('select[ng-model="clinic.county"]')).$('[value="'+counties[randCountyID]+'"]').click();
        });
        element(by.model('clinic.county')).$('option:checked').getAttribute('value').then(function (result) {
            console.log('Selected County : '+result);
        });
        zip.clear();
        zip.sendKeys('as3@3');
        expect(element(by.css('[ng-show="!myForm.zip.$error.required&&myForm.zip.$error.validateNumber"]')).isDisplayed()).toBe(true);
        zip.clear();
        expect(element(by.css('[ng-show="myForm.zip.$error.required"]')).isDisplayed()).toBe(true);
        zip.sendKeys('44408');
        officeNo.sendKeys('e236547890');
        expect(element(by.css('[ng-show="!myForm.officeNumber.$error.required&&myForm.officeNumber.$error.validateMobile"]')).isDisplayed()).toBe(true);
        officeNo.clear();
        expect(element(by.css('[ng-show="myForm.officeNumber.$error.required"]')).isDisplayed()).toBe(true);
        officeNo.sendKeys('1236547890');
        faxNo.sendKeys('sd36547890');
        expect(element(by.css('[ng-show="myForm.faxNumber.$error.validateMobile"]')).isDisplayed()).toBe(true);
        faxNo.clear();
        faxNo.sendKeys('1236547890');
        serviceArea.sendKeys('Clinic Two23');
        expect(element(by.css('[ng-show="!myForm.serviceArea.$error.required&&myForm.serviceArea.$error.validateName"]')).isDisplayed()).toBe(true);
        serviceArea.clear();
        expect(element(by.css('[ng-show="myForm.serviceArea.$error.required"]')).isDisplayed()).toBe(true);
        serviceArea.sendKeys('Clinic Two');
        for(i=1;i<8;i++){
            var randWorking=Math.floor(Math.random() * 7);
            //console.log('randWorking : '+randWorking);
            element(by.model('clinic.clinicTimingList['+randWorking+'].isWorkingDay')).click();
        }
        for(i=1;i<8;i++){
            var randAppointment=Math.floor(Math.random() * 7);
            //console.log('randAppointment : '+randAppointment);
            element(by.model('clinic.clinicTimingList['+randAppointment+'].isAppointmentDay')).click();
        }
        for(i=0;i<7;i++){
            var func=(function () {
                var j=i;
                return function (isWorking) {
                    if(isWorking){
                        arrWorking.push('clinic.clinicTimingList['+j+'].isWorkingDay');
                    }
                };
            })();
            element(by.model('clinic.clinicTimingList['+i+'].isWorkingDay')).isSelected().then(func);
        }
    }

   /* it('Add Clinic', function(){
        element(by.linkText('Add Clinic')).click();
        fillClinics('save');
    });*/

    var clinicName=[];
    it('Get Clinics Name', function () {
        browser.sleep(200);
        element.all(by.repeater('clinic in clinicFilter').column('clinic.clinicName')).getText().then(function (value) {
            console.log('Clinics : '+value);
            console.log('Clinics length : '+value.length);
            var randCinic = Math.floor(Math.random() * value.length);
            clinicName.push(value[randCinic]);
        })
    });

    it('Edit Clinic', function(){
        element(by.model('search.clinicName')).sendKeys(clinicName[0]);
        element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[2]")).click();
        fillClinics('update');
    });

    var workingID=[];
    var workingStart=[];

    function fillDr(rand) {
        element(by.repeater('doctorInput in clinic.doctorsForms')).isDisplayed().then(function (isDrDisplay) {
            if(isDrDisplay){
                element.all(by.repeater('doctorInput in clinic.doctorsForms')).count().then(function(count) {
                    for(n=0;n<count;n++){
                        element(by.name('doctorName'+n)).sendKeys('Doctor1@#43');
                        expect(element(by.css('[ng-show="!myForm.doctorName0.$error.required&&myForm.doctorName0.$error.validateName"]')).isDisplayed()).toBe(true);
                        element(by.name('doctorName'+n)).clear();
                        browser.sleep(100);
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
                            element(by.partialLinkText('Remove')).click();
                            browser.sleep(300);
                            if(rand=='1'){
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
    }

    it('Working Hours', function(){
        var picker;
        for(i=0;i<arrWorking.length;i++){
            workingID.push(arrWorking[i].substring(0,arrWorking[i].lastIndexOf('.')));
            workingStart.push(arrWorking[i].substring(arrWorking[i].indexOf('[')+1,arrWorking[i].lastIndexOf(']')));
        }

        for(i=0; i<workingStart.length; i++){
            if(workingStart[i]==0){
                picker=2;
            }
            else if(workingStart[i]==1){
                picker=6;
            }
            else if(workingStart[i]==2){
                picker=10;
            }
            else if(workingStart[i]==3){
                picker=14;
            }
            else if(workingStart[i]==4){
                picker=18;
            }
            else if(workingStart[i]==5){
                picker=22;
            }
            else if(workingStart[i]==6){
                picker=26;
            }
            browser.waitForAngular();
            element(by.model(workingID[i]+'.startTime')).click();
            browser.sleep(100);
            console.log('html/body/div['+picker+']/div/div[1]/table/tbody/tr[2]/td[1]/span');
            element(by.xpath('html/body/div['+picker+']/div/div[1]/table/tbody/tr[2]/td[1]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+picker+']/div/div[2]/table/tbody/tr[3]/td[1]')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+picker+']/div/div[1]/table/tbody/tr[2]/td[3]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+picker+']/div/div[3]/table/tbody/tr[1]/td[1]')).click();
            browser.sleep(100);
            var start=(function () {
                var j=picker;
                return function (ampm) {
                    if(ampm=='PM'){
                        element(by.xpath('html/body/div['+j+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).click();
                    }
                };
            })();
            element(by.xpath('html/body/div['+picker+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).getText().then(start);

            element(by.model(workingID[i]+'.endTime')).click();
            browser.sleep(100);
            console.log('html/body/div['+(picker+1)+']/div/div[1]/table/tbody/tr[2]/td[1]/span');
            element(by.xpath('html/body/div['+(picker+1)+']/div/div[1]/table/tbody/tr[2]/td[1]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+1)+']/div/div[2]/table/tbody/tr[2]/td[3]')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+1)+']/div/div[1]/table/tbody/tr[2]/td[3]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+1)+']/div/div[3]/table/tbody/tr[1]/td[1]')).click();
            browser.sleep(100);
            var end=(function () {
                var k=picker+1;
                return function (ampm) {
                    if(ampm=='AM'){
                        element(by.xpath('html/body/div['+k+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).click();
                    }
                };
            })();
            element(by.xpath('html/body/div['+(picker+1)+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).getText().then(end);

            element(by.model(workingID[i]+'.startsBreak')).click();
            browser.sleep(100);
            console.log('html/body/div['+(picker+2)+']/div/div[1]/table/tbody/tr[2]/td[1]/span');
            element(by.xpath('html/body/div['+(picker+2)+']/div/div[1]/table/tbody/tr[2]/td[1]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+2)+']/div/div[2]/table/tbody/tr[1]/td[1]')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+2)+']/div/div[1]/table/tbody/tr[2]/td[3]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+2)+']/div/div[3]/table/tbody/tr[1]/td[1]')).click();
            browser.sleep(100);
            var breakStart=(function () {
                var l=picker+2;
                return function (ampm) {
                    if(ampm=='AM'){
                        element(by.xpath('html/body/div['+l+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).click();
                    }
                };
            })();
            element(by.xpath('html/body/div['+(picker+2)+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).getText().then(breakStart);

            element(by.model(workingID[i]+'.endsBreak')).click();
            browser.sleep(100);
            console.log('html/body/div['+(picker+3)+']/div/div[1]/table/tbody/tr[2]/td[1]/span');
            element(by.xpath('html/body/div['+(picker+3)+']/div/div[1]/table/tbody/tr[2]/td[1]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+3)+']/div/div[2]/table/tbody/tr[1]/td[2]')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+3)+']/div/div[1]/table/tbody/tr[2]/td[3]/span')).click();
            browser.sleep(100);
            element(by.xpath('html/body/div['+(picker+3)+']/div/div[3]/table/tbody/tr[1]/td[1]')).click();
            browser.sleep(100);
            var breakEnd=(function () {
                var m=picker+3;
                return function (ampm) {
                    if(ampm=='AM'){
                        element(by.xpath('html/body/div['+m+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).click();
                    }
                };
            })();
            element(by.xpath('html/body/div['+(picker+3)+']/div/div[1]/table/tbody/tr[2]/td[5]/button')).getText().then(breakEnd);
        }

        element(by.model('clinic.directions')).sendKeys('Directions');
        element(by.model('clinic.notes')).sendKeys('Notes');
        var randNo= Math.floor(Math.random() * 2);
        if(randNo==0){
            element(by.buttonText('Add One more Doctor')).click();
            fillDr('0');
        }
        else if(randNo==1){
            fillDr('1');
        }
    });

    /*it('Save Clinic', function(){
     var saveButton=element(by.linkText('Save'));
     browser.sleep(300);
     saveButton.isDisplayed().then(function (isSave) {
     if(isSave){
     saveButton.click();
     }
     else{
     browser.pause();
     }
     });

     browser.sleep(300);
        expect(element(by.css('h2[class="page-header"]')).getText()).toEqual('Clinics');
    })*/

    it('Update Clinic', function(){
        var updateButton=element(by.linkText('Update'));
        browser.sleep(300);
        updateButton.isDisplayed().then(function (isUpdate) {
            console.log('isUpdate : '+isUpdate);
            if(isUpdate){
                updateButton.click();
            }
            else{
                browser.pause();
            }
        });

        browser.sleep(300);
        expect(element(by.css('h2[class="page-header"]')).getText()).toEqual('Clinics');
    });
    
    it('Disable and Enable Clinics', function(){
        var enableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[3]"));
        var disableButton=element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[4]"));

        function enableClinic(clinic){
            element.all(by.css('select[ng-model="calllogs.appointmentsForm.clinicId"] option')).getAttribute('value').then(function (clinics) {
                console.log('clinics : '+clinics);
                // console.log('callers0 length : '+callers0.length);
                expect(clinics).toContain('number:'+clinic);
            });
        }

        function disableClinic(clinic){
            element.all(by.css('select[ng-model="calllogs.appointmentsForm.clinicId"] option')).getAttribute('value').then(function (clinics) {
                console.log('clinics : '+clinics);
                // console.log('callers0 length : '+callers0.length);
                expect(clinics).not.toContain('number:'+clinic);
            });
        }

        function clinicStatus(status){
            element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[2]")).getAttribute('href').then(function (str) {
                var clinicID=str.substring(str.lastIndexOf('/')+1);
                element(by.linkText('Patients')).click();
                browser.waitForAngular();
                element(by.model('isCheckedAllGroupPatients')).click();
                browser.waitForAngular();
                element(by.linkText('Add Call Log')).click();
                element(by.css('select[ng-model="calllogs.response"]')).$('[value="4"]').click();
                browser.waitForAngular();
                if(status=='enable'){
                    enableClinic(clinicID);
                }
                else if(status=='disable'){
                    disableClinic(clinicID);
                }

                browser.driver.executeScript('window.scrollTo(0,10000);');
                browser.sleep(300);
                element(by.xpath("//*[@id='callLogForm']/div/div[3]/button[1]")).isDisplayed().then(function (test) {
                    element(by.xpath("//*[@id='callLogForm']/div/div[3]/button[1]")).click();
                });
            });
        }

        browser.waitForAngular();
        element(by.model('search.clinicName')).sendKeys(clinicName[0]);
        enableButton.isDisplayed().then(function (isEnable) {
            if(isEnable){
                clinicStatus('enable');
                element(by.linkText('Clinics')).click();
                browser.waitForAngular();
                element(by.model('search.clinicName')).sendKeys(clinicName[0]);
                enableButton.click();
                browser.waitForAngular();
                expect(disableButton.isDisplayed()).toBe(true);
                clinicStatus('disable');
            }
            else{
                clinicStatus('disable');
                element(by.linkText('Clinics')).click();
                browser.waitForAngular();
                element(by.model('search.clinicName')).sendKeys(clinicName[0]);
                disableButton.click();
                browser.waitForAngular();
                expect(enableButton.isDisplayed()).toBe(true);
                clinicStatus('enable');
            }
        })
    });
});