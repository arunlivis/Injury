var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patientsClick=require('../Helpers/clickPatients');
var checkPatient=require('../Helpers/checkPatients');

describe('Caller', function() {
    it('Check with Crash Date', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
        var noOfDays = [1,7,15,30,'Custom'];
        var randNoOfDays = Math.floor(Math.random() * 5);
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
        element(by.xpath('html/body/div[2]/div/div[1]/table/tbody/tr[3]/td[4]')).click();

        element(by.cssContainingText('option', noOfDays[randNoOfDays])).click();
        browser.sleep(600);
        if(randNoOfDays==4){
            element(by.name('crashToDate')).click();
            element(by.xpath('html/body/div[3]/div/div[1]/table/thead/tr[1]/th[2]')).click();
            element(by.xpath('html/body/div[3]/div/div[2]/table/tbody/tr/td/span[5]')).click();
            //browser.sleep(2000);
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
            for(i=0;i<=diffDays;i++){
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
            for(j=0;j<=diffDays;j++){
                if(datesMonth[j].substring(4,5)=='/'){
                    datesDate.push(datesMonth[j]);
                    datesDate[j]=datesDate[j].substring(0,3)+'0'+datesDate[j].substring(3,9);

                }
                else{
                    datesDate.push(datesMonth[j]);
                }

            }
            console.log('crash date '+datesDate);
            checkPatient.checkPatient('caller',2, datesDate);
        });

    },1000000);
});
