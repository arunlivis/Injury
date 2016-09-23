exports.loginPage=function(username,password){
        browser.driver.findElement(by.name('username')).sendKeys(username);
        browser.driver.findElement(by.name('password')).sendKeys(password);
        browser.driver.findElement(by.css('[value="Login"]')).click();
};