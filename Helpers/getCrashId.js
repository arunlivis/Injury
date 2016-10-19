exports.crashId=function() {

    element.all(by.css('[title="Crash Id"]')).getText().then(function (crashID) {
        console.log('crashID : '+crashID);
        var randCrashID=Math.floor(Math.random()*crashID.length);
        browser.driver.executeScript('window.scrollTo(0,0);');
        element(by.partialLinkText('Reset')).click();
        browser.waitForAngular();
        element(by.name('crashId')).sendKeys(crashID[randCrashID]);
        element(by.linkText('Search')).click();
        browser.waitForAngular();
    });
};