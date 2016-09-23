var localReportNumber=require('../Helpers/getLocalReport.js');
var login=require('../Helpers/toLoginPage');

describe('Call Center Admin', function() {
    protractor.urlHelper.urlPage();
    //protractor.loginHelper.loginPage('calleradmin', 'calleradmin');

    var totalRecords, lastPage;

    function lastPageRowCount(search, searchName){
        var patients;
        if(search==1){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.county'));
            patients.getText().then(function(object){
                console.log('cell text '+object);
                expect(object).toContain(searchName);
            });
        }
        else if(search==2){
            patients = element.all(by.repeater('resultData in patientSearchData').column('resultData.crashDate'));
            patients.getText().then(function(lRN){
                for(var i=0;i<lRN.length;i++){
                    var strLength=lRN[i].length;
                    console.log('strLength '+strLength);
                    var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                    console.log('cell text '+object);
                    expect(searchName).toContain(object);
                }

            });
        }
        else if(search==3){
            patients = element.all(by.repeater('resultData in patientSearchData').column('resultData.addedDate'));
            patients.getText().then(function(lRN){
                for(var i=0;i<lRN.length;i++){
                    var strLength=lRN[i].length;
                    //console.log('strLength '+strLength);
                    var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                    //console.log('cell text '+object);
                    expect(searchName).toContain(object);
                }

            });
        }

        else if(search==4){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.phoneNumber'));
            patients.getText().then(function(object){
                for(var i=0;i<object.length;i++){
                    //console.log('cell text '+object[i]);
                    expect(object[i]).toContain(searchName);
                }

            });
        }
        else if(search==5){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.name'));
            patients.getText().then(function(object){
                for(var i=0;i<object.length;i++){
                    //console.log('cell text '+object[i]);
                    expect(object[i].toUpperCase()).toContain(searchName.toUpperCase());
                }

            });
        }
        else if(search==6){
            patients = element.all(by.repeater('resultData in patientSearchData').column('resultData.localReportNumber'));
            patients.getText().then(function(lRN){
                for(var i=0;i<lRN.length;i++){
                    var strLength=lRN[i].length;
                    //console.log('strLength '+strLength);
                    var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                    //console.log('cell text '+object);
                    expect(object).toContain(searchName);
                }

            });
        }
        else if(search==7){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.caller'));
            patients.getText().then(function(object){
                //console.log('cell text '+object);
                expect(object).toContain(searchName);
            });
        }
        else if(search==8){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.tier'));
            patients.getText().then(function(object){
                //console.log('cell text '+object);
                expect(object).toContain(searchName);
            });
        }
        else if(search==9){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.patientStatus'));
            patients.getText().then(function(object){
                console.log('cell text '+object);
                expect(object).toContain(searchName);
            });
        }
        else if(search==10){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.isArchived'));
            patients.valueOf().then(function(object){
                console.log('cell text '+object);
                //expect(object).toContain(searchName);
            });
        }
    }


    function checkPatient(search, searchName) {
        var totalRecords, lastPage;
        var recPerPage;
        element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/dir-pagination-controls/div[2]')).getText().then(function (value) {
            //console.log("Count " + value);
            str = value.substring(value.lastIndexOf(" "), value.lastIndexOf("of")+3).trim();
            //console.log("str "+ str);
            totalRecords=parseInt(str);

            element(by.model('patient.itemsPerPage')).$('option:checked').getText().then(function (result) {

                var recordPerPage=result.substring(result.indexOf(" "), result.indexOf(" ",7)).trim();
                recPerPage=parseInt(recordPerPage);
                //console.log('Records Per Page: '+recPerPage);
                //console.log("recPerPage "+recPerPage);


                if(recPerPage<totalRecords){
                    var clickable=0;
                    element(by.partialLinkText('»')).click();
                    browser.waitForAngular();
                    element(by.css('[class="ng-scope active"]')).element(by.css('[class="ng-binding"]')).getText().then(function(text) {
                        //console.log('Last page Number of '+localReportNumber+' '+ text);
                        lastPage=parseInt(text);

                        element(by.partialLinkText('«')).click();
                        browser.waitForAngular();

                        console.log('Last page  '+ lastPage);
                        while(clickable<lastPage-1){

                            lastPageRowCount(search, searchName);
                            element(by.partialLinkText('›')).click();
                            //console.log('clickable '+clickable);
                            clickable++;
                        }

                        lastPageRowCount(search, searchName);


                    });
                }

                else{
                    lastPageRowCount(search, searchName);
                }
            });

        });
    }


    it('Click on Patients', function(){
        login.loginPage('calleradmin', 'calleradmin');
        element(by.linkText('Patients')).click();
        browser.waitForAngular();
        
    });

   // protractor.countReportHelper.countReport('All', 'patient');

   /* var countyName='Adams';
    it('Search Crash Report', function () {
        browser.sleep(5000);
        element(by.cssContainingText('option', countyName)).click();
        browser.sleep(1000);
        element(by.model('patient.countyId')).$('option:checked').getText().then(function (result) {
            console.log('County Name: '+result);
        });

        browser.sleep(500);
        element(by.linkText('Search')).click();
        //browser.sleep(500);

    });

    protractor.countReportHelper.countReport(countyName, 'patient');
    it('Search with Each County', function () {
        browser.waitForAngular();
        checkPatient(1, countyName);
    });*/
    
    it('Check with Crash Date', function () {

        var noOfDays = [1,7,15,30,'Custom'];
        var randNoOfDays = Math.floor(Math.random() * 4);
        var dates=[];
        var datesMonth=[];
        var datesDate=[];
        var oneDay = 24*60*60*1000;
        var endDate;

        browser.sleep(600);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.name('crashFromDate')).click();
        element(by.xpath('html/body/div[2]/div/div[1]/table/thead/tr[1]/th[2]')).click();
        element(by.xpath('html/body/div[2]/div/div[2]/table/tbody/tr/td/span[3]')).click();
        element(by.xpath('html/body/div[2]/div/div[1]/table/tbody/tr[1]/td[7]')).click();

        element(by.cssContainingText('option', noOfDays[randNoOfDays])).click();
        browser.sleep(600);
        if(randNoOfDays==4){
            element(by.name('crashToDate')).click();
            element(by.xpath('html/body/div[3]/div/div[1]/table/thead/tr[1]/th[2]')).click();
            element(by.xpath('html/body/div[3]/div/div[2]/table/tbody/tr/td/span[3]')).click();
            element(by.xpath('html/body/div[3]/div/div[1]/table/tbody/tr[5]/td[5]')).click();
        }


        element(by.linkText('Search')).click();
        browser.waitForAngular();
        element(by.name('crashToDate')).getAttribute('value').then(function(crashEndDate) {
            //console.log("value " + value);
            endDate = new Date(crashEndDate);
        });
        element(by.name('crashFromDate')).getAttribute('value').then(function(value){
            console.log("value "+value);
            var startDate=new Date(value);
            var diffDays;
            if(randNoOfDays==4) {
                diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));

            }else {
                diffDays=noOfDays[randNoOfDays];

            }
            for(i=0;i<diffDays;i++){
                var tomorrow = new Date(startDate);
                tomorrow.setDate(startDate.getDate()+i);
                dates.push(tomorrow.toLocaleDateString());
                if(dates[i].substring(1,2)=='/'){
                    datesMonth.push('0'+dates[i]);
                }
                else{
                    datesMonth.push(dates[i]);
                }

            }
            for(j=0;j<diffDays;j++){
                if(datesMonth[j].substring(4,5)=='/'){
                    datesDate.push(datesMonth[j]);
                    datesDate[j]=datesDate[j].substring(0,3)+'0'+datesDate[j].substring(3,9);

                }
                else{
                    datesDate.push(datesMonth[j]);
                }

            }
            console.log('crash date '+datesDate);
            checkPatient(2, datesDate);
        });

    },1000000);

    /*it('Check with Added on Date', function () {

        var dates=[];
        var datesMonth=[];
        var datesDate=[];
        var oneDay = 24*60*60*1000;
        var endDate;

        browser.sleep(600);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();

        element(by.name('addedOnFromDate')).click();
        element(by.xpath('html/body/div[4]/div/div[1]/table/thead/tr[1]/th[2]')).click();
        element(by.xpath('html/body/div[4]/div/div[2]/table/tbody/tr/td/span[5]')).click();
        element(by.xpath('html/body/div[4]/div/div[1]/table/tbody/tr[3]/td[7]')).click();

        browser.sleep(600);

        element(by.name('addedOnToDate')).click();
        element(by.xpath('html/body/div[5]/div/div[1]/table/thead/tr[1]/th[2]')).click();
        element(by.xpath('html/body/div[5]/div/div[2]/table/tbody/tr/td/span[5]')).click();
        element(by.xpath('html/body/div[5]/div/div[1]/table/tbody/tr[6]/td[3]')).click();

        element(by.linkText('Search')).click();
        browser.waitForAngular();

        element(by.name('addedOnToDate')).getAttribute('value').then(function(toDate) {
            //console.log("value " + value);
            endDate = new Date(toDate);
        });
        element(by.name('addedOnFromDate')).getAttribute('value').then(function(fromDate){
            //console.log("value "+value);
            var startDate=new Date(fromDate);
            var diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));


            for(i=0;i<diffDays;i++){
                var tomorrow = new Date(startDate);
                tomorrow.setDate(startDate.getDate()+i);
                dates.push(tomorrow.toLocaleDateString());
                if(dates[i].substring(1,2)=='/'){
                    datesMonth.push('0'+dates[i]);
                }
                else{
                    datesMonth.push(dates[i]);
                }

            }
            for(j=0;j<diffDays;j++){
                if(datesMonth[j].substring(4,5)=='/'){
                    datesDate.push(datesMonth[j]);
                    datesDate[j]=datesDate[j].substring(0,3)+'0'+datesDate[j].substring(3,9);

                }
                else{
                    datesDate.push(datesMonth[j]);
                }

            }
            checkPatient(3, datesDate);


        });

    });*/

    /*var phoneNumber = '330-61';
     it('Search with Patient Phone Number', function () {
     browser.sleep(1000);
     browser.driver.executeScript('window.scrollTo(0,0);');
     element(by.partialLinkText('Reset')).click();
     browser.waitForAngular();
     element(by.model('patient.phoneNumber')).sendKeys(phoneNumber);
     //element(by.linkText('Search')).click();
     browser.sleep(1500);

     checkPatient(4, phoneNumber);
     });*/

    /*var patientName = 'Mason';
    it('Search with Patient Name', function () {
        browser.sleep(1000);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.model('patient.patientName')).sendKeys(patientName);
        //element(by.linkText('Search')).click();
        browser.waitForAngular();

        checkPatient(5, patientName);
    });*/
    /*var localReportNumber=[];
     it('Check with Local Report Number', function () {
         localReportNumber.localReport();
         element(by.model('patient.localReportNumber')).getAttribute('value').then(function (LRNtext) {
             localReportNumber.push(LRNtext);
             console.log('localReportNumber[0] : '+localReportNumber[0])
             checkPatient(6, localReportNumber[0]);
         });
     });*/

    function callLogs(){
        var randResponseID;
        var randClinicID;

        element.all(by.css('[ng-model="calllogs.response"] option')).getAttribute('value').then(function(response){
            //callers.push(-1);
            randResponseID=Math.floor(Math.random()*(response.length-1)+1);
            console.log('randResponseID : '+randResponseID);

            element(by.css('select[ng-model="calllogs.response"]')).$('[value="'+response[randResponseID]+'"]').click();
            console.log('All responses : '+response);
            console.log('Response : '+response[randResponseID]);
            if(response[randResponseID]==4){
                browser.waitForAngular();
                element.all(by.css('[ng-model="calllogs.appointmentsForm.clinicId"] option')).getText().then(function(clinic) {
                    //callers.push(-1);
                    randClinicID = Math.floor(Math.random() * (clinic.length-1)+1);
                    console.log('randClinicID : ' + randClinicID);
                    element(by.cssContainingText('option', clinic[randClinicID])).click();
                    //element(by.css('select[ng-model="calllogs.response"]')).$('[value="' + clinic[randClinicID] + '"]').click();
                    console.log('All Clinics : ' + clinic);
                    console.log('Clinic : '+clinic[randClinicID]);


                    element.all(by.css('[ng-model="calllogs.appointmentsForm.doctorId"] option')).getText().then(function(doctor) {
                        //callers.push(-1);
                        randDoctorID = Math.floor(Math.random() * (doctor.length-1));
                        console.log('randDoctorID : ' + randDoctorID);
                        element(by.cssContainingText('option', doctor[randDoctorID])).click();
                        //element(by.css('select[ng-model="calllogs.response"]')).$('[value="' + clinic[randClinicID] + '"]').click();
                        console.log('All Doctors : ' + doctor);
                        console.log('Doctor : '+doctor[randDoctorID]);
                    });

                    element(by.model('calllogs.appointmentsForm.scheduledDateTime')).click();

                });
            }
            element(by.model('calllogs.response')).$('option:checked').getAttribute('value').then(function (result) {
                console.log('Response Name : '+result);
                element(by.model('calllogs.notes')).sendKeys(result);
                browser.waitForAngular();
                element(by.buttonText('Add')).click();
                var status;
                if(result==2){
                    status='Not Interested/Injured';
                }
                else if(result==3){
                    status='Voice Mail';
                }
                else if(result==4){
                    status='Appointment Scheduled';
                }
                else if(result==5){
                    status='Do Not Call';
                }
                else if(result==8){
                    status='Call Back';
                }
                else if(result==9){
                    status='Unable To Reach';
                }
                checkPatient(9, status)
            });
        });
    }

    /*it('Add Log for Group', function(){
        // var randResponseID;
        // var randClinicID;
        element(by.id(localReportNumber[0])).click();
        element(by.id(localReportNumber[0])).isSelected().then(function (selected) {
            //console.log('Selected : '+selected)
            if(selected){
                element(by.id('addCallLog'+localReportNumber[0])).isDisplayed().then(function (display) {
                    //console.log('Display : '+display);
                    if(display){
                        element(by.id('addCallLog'+localReportNumber[0])).click();
                        browser.waitForAngular();
                    }
                })
            }
        });
        callLogs();

    });*/

    /*it('Add Log for a Patient', function(){

        element(by.xpath('//!*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr[2]/td[1]/input')).click();
        element(by.xpath('//!*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr[2]/td[1]/input')).isSelected().then(function (selected) {
            //console.log('Selected : '+selected)
            if(selected){
                element(by.xpath("html/body/div[1]/div[1]/div/div/div/div[2]/div/table/tbody/tr[1]/td[2]/span[2]/span[1]/b/a")).isDisplayed().then(function (display) {
                    //console.log('Display : '+display);
                    if(display){
                        element(by.xpath("html/body/div[1]/div[1]/div/div/div/div[2]/div/table/tbody/tr[1]/td[2]/span[2]/span[1]/b/a")).click();
                        browser.waitForAngular();
                    }
                })
            }
        });
        callLogs();

        browser.pause();
    });*/

    /*it('View Call Logs', function () {
        browser.waitForAngular();
        element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr/td/center/strong")).isDisplayed().then(function(value){
           if(!value){
               element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[9]")).getText().then(function(status){
                   element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[10]/span")).getText().then(function(statusOn){
                       console.log('statusOn first : '+statusOn);
                       if(statusOn=='-'){
                           element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/a[2]")).click();
                           browser.waitForAngular();
                           var callLogRow=element(by.xpath("//!*[@id='viewCallLogsListModal']/div/div/div[2]/table/tbody[2]/tr/td"));
                           expect(callLogRow.isDisplayed()).toBe(true);
                       }
                       else{
                           element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[10]/b")).getText().then(function(statusOn1){
                               console.log('statusOn Second : '+statusOn1);
                               console.log('status Second : '+status);
                               element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/a[2]")).click();
                               browser.waitForAngular();
                               var rows=element.all(by.repeater('callLog in callLogsFilter'));
                               var rowElems=rows.last().$$('td');
                               rowElems.get(0).getText().then(function (dateTime) {
                                   expect(dateTime.toLocaleLowerCase()).toContain(statusOn1.toLowerCase());
                               });
                               rowElems.get(1).getText().then(function (dateTime) {
                                   expect(dateTime.toLocaleLowerCase()).toContain(status.toLowerCase());
                               });

                               /!*element.all(by.repeater('callLog in callLogsFilter')).count().then(function(count) {
                                   for(i=1;i<=count;i++){
                                       var func=(function(){
                                           var j=i;
                                           return function(statusResponse){
                                               if(statusResponse=='Appointment Scheduled'){
                                                   browser.sleep(500);
                                                   element(by.xpath("//!*[@id='viewCallLogsListModal']/div/div/div[2]/table/tbody[1]/tr["+j+"]/td[5]/a")).click();
                                                   browser.sleep(500);
                                                   element(by.xpath("//!*[@id='viewAppointmentsModal']/div/div/div[1]/h4")).getText().then(function (resultText) {
                                                       expect(resultText).toEqual('View Appointment');
                                                   });
                                                   element(by.xpath("//!*[@id='viewAppointmentsModal']/div/div/div[2]/div/button")).click();
                                               }
                                           }
                                       })();
                                       element(by.xpath("//!*[@id='viewCallLogsListModal']/div/div/div[2]/table/tbody[1]/tr["+i+"]/td[2]")).getText().then(func);
                                   }

                               });*!/
                           });
                       }
                       browser.sleep(500);
                       browser.driver.executeScript('window.scrollTo(0,10000);');
                       element(by.xpath("//!*[@id='viewCallLogsListModal']/div/div/div[3]/button")).click();

                       browser.sleep(500);
                       browser.driver.executeScript('window.scrollTo(0,0);');
                       element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/a[2]")).click();
                       browser.waitForAngular();
                       element(by.linkText('Add Call Logs')).click();
                       browser.waitForAngular();
                       callLogs();
                       browser.pause();
                   });

               });
           }
           else{
               browser.executeScript("alert('No record found for given data');");
           }
        });
    });*/

    function assignCaller(){
        var randCallerID;
        element.all(by.css('[ng-model="myForm.callerId"] option')).getAttribute('value').then(function(caller) {
            randCallerID = Math.floor(Math.random() * (caller.length-1)+1);
            console.log('randCallerID : ' + randCallerID);
            element(by.css('select[ng-model="myForm.callerId"]')).$('[value="'+caller[randCallerID]+'"]').click();
            console.log('All Callers : ' + caller);
            console.log('callers : '+caller[randCallerID]);
            browser.sleep(100);
            element(by.model('myForm.callerId')).$('option:checked').getText().then(function (checkedCaller) {
                //console.log('checkedCaller : '+checkedCaller);
                var assignButton=element(by.linkText('Assign'));
                assignButton.isDisplayed().then(function (btn) {
                    if(btn){
                        assignButton.click();
                    }
                });
                checkPatient(7,checkedCaller);
            })
        });
    }

    /*it('Assign/Release Caller for Single', function () {
        element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/span/a[2]")).isDisplayed().then(function(assign){
            element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[2]/span/a")).getText().then(function (name) {
                //console.log('assign : '+assign);
                if(assign){
                    element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/span/a[2]")).click();
                    browser.waitForAngular();
                    element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[2]/span/a")).getText().then(function (nameInModel) {
                        expect(name).toContain(nameInModel);
                    });
                    assignCaller();
                }
                else{
                    element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[11]/span/a[1]")).click();
                    browser.waitForAngular();
                    element(by.xpath("//!*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[2]/td[2]/span/a")).getText().then(function (nameInModel) {
                        expect(name).toContain(nameInModel);
                    });
                    assignCaller();
                }
            })
        })

    });*/

    /*it('Assign Caller for Group', function () {
        element(by.id(localReportNumber[0])).click();
        element(by.linkText('Assign Caller')).click();
        browser.waitForAngular();
        assignCaller();
    });*/

    /*it('Release Caller for Group', function () {
        element(by.id(localReportNumber[0])).click();
        element(by.linkText('Release From Caller')).click();
        browser.waitForAngular();
        checkPatient(7,'N/A');
    });*/

    /*it('Move to Archive / Release from Archive', function(){
        element(by.id(localReportNumber[0])).click();
        element(by.linkText('Move to Archive')).click();
        browser.waitForAngular();
        element(by.css('select[ng-model="patient.isArchived"]')).$('[value="1"]').click();
        browser.waitForAngular();
        checkPatient(6,localReportNumber[0]);
        element(by.id(localReportNumber[0])).click();
        element(by.linkText('Release from Archive')).click();
        browser.waitForAngular();
        element(by.css('select[ng-model="patient.isArchived"]')).$('[value="0"]').click();
        checkPatient(6,localReportNumber[0]);
    });*/

    /*it('Search with Caller', function () {

        var randCallerID;
        browser.sleep(1000);

        element.all(by.css('[ng-model="patient.callerId"] option')).getAttribute('value').then(function(callers){
            //callers.push(-1);
            randCallerID=Math.floor(Math.random()*callers.length);
            console.log('randCallerID : '+randCallerID);

            element(by.css('select[ng-model="patient.callerId"]')).$('[value="'+callers[randCallerID]+'"]').click();
            console.log('All callers : '+callers);
            console.log('callers : '+callers[randCallerID]);
        });

        element(by.linkText('Search')).click();
        browser.waitForAngular();
        
        element(by.model('patient.callerId')).$('option:checked').getText().then(function (result) {
            console.log('Caller Name : '+result);
            if(randCallerID!=0){
                checkPatient(7, result);
            }

        });
    });*/

    /*it('Search with Tier', function () {

        var randTierID;
        browser.sleep(1000);

        element.all(by.css('[ng-model="patient.tier"] option')).getAttribute('value').then(function(tiers){
            //callers.push(-1);
            randTierID=Math.floor(Math.random()*tiers.length);
            console.log('randTierID : '+randTierID);

            element(by.css('select[ng-model="patient.tier"]')).$('[value="'+tiers[randTierID]+'"]').click();
            console.log('All Tiers : '+tiers);
            console.log('Tiers : '+tiers[randTierID]);
        });

        element(by.linkText('Search')).click();
        browser.waitForAngular();

        element(by.model('patient.tier')).$('option:checked').getText().then(function (result) {
            console.log('Tier Name : '+result);
            if(randTierID!=0){
                checkPatient(8, result);
            }

        });
    },1000000);*/

    /*it('Search with Filter Status By', function () {

        var randStatusID;
        browser.sleep(1000);

        element.all(by.css('[ng-model="patient.patientStatus"] option')).getAttribute('value').then(function(status){

            randStatusID=Math.floor(Math.random()*status.length);
            console.log('randTierID : '+randStatusID);

            element(by.css('select[ng-model="patient.patientStatus"]')).$('[value="'+status[randStatusID]+'"]').click();
            console.log('All Status : '+status);
            console.log('Status : '+status[randStatusID]);
        });

        browser.waitForAngular();

        element(by.model('patient.patientStatus')).$('option:checked').getText().then(function (result) {
            console.log('Status Name : '+result);
            if(randStatusID!=0){
                checkPatient(9, result);
            }

        });
    },1000000);*/

    /*it('Search with Records Type', function () {

        var randRecordID;
        browser.sleep(1000);

        element.all(by.css('[ng-model="patient.isArchived"] option')).getAttribute('value').then(function(record){

            randRecordID=Math.floor(Math.random()*record.length);
            console.log('randRecordID : '+randRecordID);

            element(by.css('select[ng-model="patient.isArchived"]')).$('[value="'+record[randRecordID]+'"]').click();
            console.log('All Records : '+record);
            console.log('Record : '+record[randRecordID]);
        });

        browser.waitForAngular();

        element(by.model('patient.isArchived')).$('option:checked').getText().then(function (result) {
            console.log('Record Name : '+result);
            checkPatient(10, result);
        });
    },1000000);*/



});
