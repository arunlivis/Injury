describe('Super Admin', function() {
    protractor.urlHelper.urlPage();
    protractor.loginHelper.loginPage('superadmin', 'superadmin');

    var totalRecords, lastPage;

    function lastPageRowCount(search, searchName){
        /*element.all(by.repeater('patient in resultData.patientSearchLists')).count().then(function(count){
            for(i=1;i<count+1;i++){
                element(by.xpath('//!*[@id="page-wrapper"]/div/div/div[2]/div/table/tbody/tr['+i+']/td['+search+']')).getText().then(function(object){
                    //console.log('localReport '+object);
                    if(search==3){
                        expect(object).toEqual(searchName);
                    }
                    else if(search==4||search==5){
                        expect(searchName).toContain(object);
                    }
                    else{
                        expect(object).toContain(searchName);
                    }

                });
            }
        });*/
        var patients;
        if(search==1){
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.county'));
            patients.getText().then(function(object){
                //console.log('cell text '+object);
                expect(object).toContain(searchName);
            });
        }
        else if(search==2){
            patients = element.all(by.repeater('resultData in patientSearchData').column('resultData.crashDate'));
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
            patients = element.all(by.repeater('patient in resultData.patientSearchLists').column('patient.phoneNumber'));
            patients.getText().then(function(object){
                for(var i=0;i<object.length;i++){
                    //console.log('cell text '+object[i]);
                    expect(object[i]).toContain(searchName);
                }

            });
        }

    }

    function checkPatient(search, searchName) {
        var totalRecords, lastPage;
        var recPerPage;


        element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/dir-pagination-controls/div[2]')).getText().then(function (value) {
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
                    browser.waitForAngular();
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
                            browser.waitForAngular();
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


    it('Click on Search Patients', function(){
        element(by.linkText('Search Patients')).click();
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
    });*/

    //protractor.countReportHelper.countReport(countyName, 'patient');

    /*it('Check Each County', function(){

        var noRecords=[10,25,50,100];
        var randNoRecord=Math.floor(Math.random() * 4);

        browser.waitForAngular();
        browser.driver.executeScript('window.scrollTo(0,10000);');

        element(by.cssContainingText('option', 'Show '+noRecords[randNoRecord]+' Per Page')).click();
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

    /*var localReportNumber = '16025';
    it('Check with Local Report Number', function () {
        browser.sleep(1000);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.name('localReportNumber')).sendKeys(localReportNumber);
        element(by.linkText('Search')).click();
        browser.waitForAngular();

        checkPatient(4, localReportNumber);


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

    /*var phoneNumber = '330-61';
    it('Search with Patient Phone Number', function () {
        browser.sleep(1000);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.model('patient.phoneNumber')).sendKeys(phoneNumber);
        //element(by.linkText('Search')).click();
        browser.waitForAngular();

        checkPatient(6, phoneNumber);
    });*/

});
