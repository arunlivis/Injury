
var fillDoctor=require('../Helpers/fillDr');

exports.fillWorkingHours=function(days,txt){
    var workingID=[];
    var workingStart=[];
    var picker;

        console.log('Days : '+days);
        for(i=0;i<days.length;i++){
            workingID.push(days[i].substring(0,days[i].lastIndexOf('.')));
            workingStart.push(days[i].substring(days[i].indexOf('[')+1,days[i].lastIndexOf(']')));
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
        fillDoctor.fillDr(txt);
    }
    else if(randNo==1){
        fillDoctor.fillDr(txt);
    }
};