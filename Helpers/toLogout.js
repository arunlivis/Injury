exports.logout=function(){
    browser.sleep(500);
        element(by.css('[data-toggle="dropdown"]')).click();
        browser.sleep(100);
        browser.driver.findElement(by.linkText('Logout')).click();
    browser.sleep(200);
        expect(browser.driver.findElement(by.id('username')).isDisplayed()).toBe(true);

};