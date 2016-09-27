exports.fillClinics=function(status){
    
        var name=element(by.model('clinic.clinicName'));
        var address=element(by.model('clinic.address'));
        var city=element(by.model('clinic.city'));
        var zip=element(by.model('clinic.zipcode'));
        var officeNo=element(by.model('clinic.officeNumber'));
        var faxNo=element(by.model('clinic.faxNumber'));
        var serviceArea=element(by.model('clinic.serviceArea'));
        var clinics=require('../Helpers/getClinics');
        
        if(status=='save'){
                element(by.linkText('Add Clinic')).click();
                browser.sleep(200);
                name.sendKeys('Name');
                name.clear();
                expect(element(by.css('[ng-show="myForm.clinicName.$error.required"]')).isDisplayed()).toBe(true);
            name.sendKeys('Clinic Four');
        }
        else if(status=='update'){
                clinics.getClinics().then(function (clinicList) {
                        var randClinic = Math.floor(Math.random() * clinicList.length);
                        element(by.model('search.clinicName')).sendKeys(clinicList[randClinic]);
                        element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[2]")).click();
                        name.sendKeys('Name');
                        name.clear();
                        expect(element(by.css('[ng-show="myForm.clinicName.$error.required"]')).isDisplayed()).toBe(true);
                        name.sendKeys(clinicList[randClinic]);
                });
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
            element(by.model('clinic.clinicTimingList['+randWorking+'].isWorkingDay')).click();
        }
        for(i=1;i<8;i++){
            var randAppointment=Math.floor(Math.random() * 7);
            element(by.model('clinic.clinicTimingList['+randAppointment+'].isAppointmentDay')).click();
        }
        
};