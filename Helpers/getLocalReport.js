exports.localReport=function() {
    browser.sleep(1000);
    return element.all(by.model('isCheckedAllGroupPatients')).getAttribute('id').then(function (localReport) {
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
