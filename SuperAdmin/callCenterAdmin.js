
describe('Super Admin', function() {
    protractor.urlHelper.urlPage();
    protractor.loginHelper.loginPage('superadmin', 'superadmin');


    var arrCheckedID=[];
    var arrOldCheckedID=[];

    function checkedCheckbox(a) {
        for(k=1;k<89;k++){
            var func=(function(){
                var l=k;
                return function(value){
                    if(value){
                        a.push(l);
                    }

                    //console.log('value '+value);

                }})();
            element(by.css('[id="'+k+'"][checked="checked"]')).isPresent().then(func);
        }
        /*element(by.id('1')).isSelected().then(function (value) {
            console.log('arrCheckedID '+arrCheckedID);
        });*/

    }

    var clickID;
    var clickable=0;
    var arrID=[];
    var arrCorrectID = [];
    function selectCounty() {

        for(i=0;i<10;i++){
            var randID = Math.floor(Math.random()*89);
            //console.log('randID '+randID);
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
                    //arrID.push('checkAll');
                    //console.log('arrID  '+arrID);
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

        element(by.id('1')).isSelected().then(function (value) {
            arrID=arrID.concat(arrOldCheckedID);
            console.log('arrID '+arrID);

        arrID.sort(function(c, d){return c-d});

        var current = null;
        var cnt = 0;
        console.log('a.length '+arrID.length);
        for (var i = 0; i < arrID.length; i++) {
            if (arrID[i] != current) {
                if (cnt > 0) {
                    console.log(current + ' comes --> ' + cnt + ' times');
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
            console.log(current + ' comes --> ' + cnt + ' times');
            if(cnt%2==1){
                arrCorrectID.push(current);
            }
        }
        });
    }

    var totalRecords, lastPage;

    function lastPageRowCount(search, searchName){

        var patients;
        if(search==1){
            patients = element.all(by.repeater('callerAdmin in callerAdmins').column('callerAdmin.username'));
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

    function checkAdmin(search, searchName) {

        var recPerPage;

        element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/dir-pagination-controls/div[2]')).getText().then(function (value) {
            //console.log("Count " + value);
            str = value.substring(value.lastIndexOf(" "), value.lastIndexOf("of")+3).trim();
            //console.log("str "+ str);
            totalRecords=parseInt(str);

            element(by.model('noOfRows')).$('option:checked').getText().then(function (result) {

                var recordPerPage=result.substring(result.indexOf(" "), result.indexOf(" ",7)).trim();
                recPerPage=parseInt(recordPerPage);
                //console.log('Records Per Page: '+recPerPage);

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

    it('Click on Call Center Admin', function(){
        element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div[1]/div/a/div/span[1]')).click();
        browser.waitForAngular();
    });

   //protractor.countReportHelper.countReport('All','callerAdmin');

   /* it('Add Call Center Admin', function () {
        browser.sleep(1000);
        element(by.linkText('Add Call Center Admin')).click();
        browser.sleep(1000);
        element(by.name('firstName')).sendKeys('Admin');
        element(by.name('lastName')).sendKeys('One');
        element(by.name('address')).sendKeys('Medavakkam');
        element(by.name('city')).sendKeys('Chennai');
        element(by.name('state')).sendKeys('Tamilnadu');
        element(by.name('zipcode')).sendKeys('12345');
        element(by.name('username')).sendKeys('admin1');
        element(by.name('phoneNumber')).sendKeys('1234567890');
        element(by.name('emailAddress')).sendKeys('admin1@gmail.com');
        element(by.name('notes')).sendKeys('admin1@gmail.com');

        selectCounty();
        checkedCheckbox(arrCheckedID);

        expect(arrCheckedID).toEqual(arrCorrectID);

        //browser.sleep(500);
        element(by.linkText('Save')).click();
    });*/

    /*var userName='gfnvn';
    it('Search Username', function(){

        element(by.model('search.username')).sendKeys(userName);
        browser.waitForAngular();

        checkAdmin(1, userName);
    });*/

    /*it('Edit Call Center Admin', function () {
        browser.sleep(1000);
        element(by.css('[data-hint="Edit Call Center Admin"]')).click();
        browser.sleep(1000);
        element(by.name('firstName')).clear();
        element(by.name('firstName')).sendKeys('Admin');
        element(by.name('lastName')).clear();
        element(by.name('lastName')).sendKeys('Caller');
        element(by.name('address')).clear();
        element(by.name('address')).sendKeys('Medavakkam');
        element(by.name('city')).clear();
        element(by.name('city')).sendKeys('Chennai');
        element(by.name('state')).clear();
        element(by.name('state')).sendKeys('Tamilnadu');
        element(by.name('zipcode')).clear();
        element(by.name('zipcode')).sendKeys('12345');
        expect(element(by.css('[ng-model="callerAdmin.username"][readonly="readonly"]')).isPresent()).toBe(true);
        element(by.name('phoneNumber')).clear();
        element(by.name('phoneNumber')).sendKeys('1234567890');
        element(by.name('emailAddress')).clear();
        element(by.name('emailAddress')).sendKeys('admin1@gmail.com');
        element(by.name('notes')).clear();
        element(by.name('notes')).sendKeys('admin1@gmail.com');

        browser.driver.executeScript('window.scrollTo(0,10000);');
        checkedCheckbox(arrOldCheckedID);
        selectCounty();
        checkedCheckbox(arrCheckedID);

        expect(arrCorrectID).toEqual(arrCheckedID);
        //browser.pause();

        element(by.linkText('Update')).click();
        browser.sleep(500);
    });*/

    /*it('Disable Call Center Admin', function () {
        browser.sleep(1000);
        var disable = element(by.css('[data-hint="Disable Call Center Admin"]'));
        disable.isDisplayed().then(function (value) {
            if(value){
                disable.click();
                browser.sleep(100);
                expect(element(by.css('[ng-show="hasFlash"]')).isDisplayed()).toBe(true);
            }
            expect(element(by.css('[data-hint="Enable Call Center Admin"]')).isDisplayed()).toBe(true);
        })
    });

    protractor.logoutHelper.logout();
    protractor.loginHelper.loginPage('gfnvn', 'gfnvn');

    it('Check Disabled Call Center Admin', function () {
        browser.sleep(100);
        expect(browser.driver.findElement(by.css('[class="fa fa-exclamation-triangle"]')).isDisplayed()).toBe(true);
    });*/

    it('Disable Call Center Admin', function () {
        browser.sleep(1000);
        var disable = element(by.css('[data-hint="Disable Call Center Admin"]'));
        disable.isDisplayed().then(function (value) {
            if(value){
                disable.click();
                browser.sleep(100);
                expect(element(by.css('[ng-show="hasFlash"]')).isDisplayed()).toBe(true);
            }
            expect(element(by.css('[data-hint="Enable Call Center Admin"]')).isDisplayed()).toBe(true);
        })
    });

    protractor.logoutHelper.logout();
    protractor.loginHelper.loginPage('gfnvn', 'gfnvn');

    it('Check Disabled Call Center Admin', function () {
        browser.sleep(100);
        expect(browser.driver.findElement(by.css('[class="fa fa-exclamation-triangle"]')).isDisplayed()).toBe(true);
    });
//work for Reset Password
    /*var localReportNumber = '16025';
    it('Check with Local Report Number', function () {
browser.sleep(1000);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.name('localReportNumber')).sendKeys(localReportNumber);
        element(by.linkText('Search')).click();
        browser.waitForAngular();

        checkCrash(2, localReportNumber);


    });*/
/*
    var crashID='5956225';
    it('Check with Crash ID', function () {
        browser.sleep(2000);

        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.name('crashId')).sendKeys(crashID);
        element(by.linkText('Search')).click();
        browser.waitForAngular();

        checkCrash(3, crashID);


    })*/


    /*it('Check with Crash Date', function () {

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
        element(by.xpath('html/body/div[2]/div/div[2]/table/tbody/tr/td/span[5]')).click();
        element(by.xpath('html/body/div[2]/div/div[1]/table/tbody/tr[2]/td[5]')).click();

        element(by.cssContainingText('option', noOfDays[randNoOfDays])).click();
        browser.sleep(600);
        if(randNoOfDays==4){
            element(by.name('crashToDate')).click();
            element(by.xpath('html/body/div[3]/div/div[1]/table/thead/tr[1]/th[2]')).click();
            element(by.xpath('html/body/div[3]/div/div[2]/table/tbody/tr/td/span[5]')).click();
            element(by.xpath('html/body/div[3]/div/div[1]/table/tbody/tr[6]/td[3]')).click();
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
                checkCrash(4, datesDate);
            
            browser.pause();

        });

    });*/

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

        element(by.name('addedFromDate')).click();
        element(by.xpath('html/body/div[4]/div/div[1]/table/thead/tr[1]/th[2]')).click();
        element(by.xpath('html/body/div[4]/div/div[2]/table/tbody/tr/td/span[5]')).click();
        element(by.xpath('html/body/div[4]/div/div[1]/table/tbody/tr[3]/td[7]')).click();

        browser.sleep(600);

         element(by.name('addedToDate')).click();
         element(by.xpath('html/body/div[5]/div/div[1]/table/thead/tr[1]/th[2]')).click();
        element(by.xpath('html/body/div[5]/div/div[2]/table/tbody/tr/td/span[5]')).click();
        element(by.xpath('html/body/div[5]/div/div[1]/table/tbody/tr[6]/td[3]')).click();

        element(by.linkText('Search')).click();
        browser.waitForAngular();

        element(by.name('addedToDate')).getAttribute('value').then(function(toDate) {
            //console.log("value " + value);
            endDate = new Date(toDate);
        });
        element(by.name('addedFromDate')).getAttribute('value').then(function(fromDate){
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
            checkCrash(5, datesDate);

            browser.pause();

        });

    });*/
});