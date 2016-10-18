exports.localReport=function(user) {
    var localReportNumber;

    if(user=='crashReport'){
        localReportNumber=element.all(by.css('[title="Local Report Number"]'));
    }
    else if(user=='patient'){
        localReportNumber=element.all(by.model('isCheckedAllGroupPatients')).getAttribute('id');
    }

    browser.sleep(1000);
    if(user=='crashReport'){
        localReportNumber=localReportNumber.getText();
    }
    else if(user=='patient'){
        localReportNumber=localReportNumber;
    }
    return localReportNumber.then(function (localReport) {
        console.log('localReport : '+localReport);
        var randLRNID=Math.floor(Math.random()*localReport.length);
        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.name('localReportNumber')).sendKeys(localReport[randLRNID]);
        element(by.linkText('Search')).click();
        browser.waitForAngular();
        return localReport[randLRNID];
    });
};