var logout=require('../Helpers/toLogout');
var login=require('../Helpers/toLoginPage');

exports.changePassword=function(oldPassword, newPassword){
        browser.sleep(100);
        element(by.css('[data-toggle="dropdown"]')).click();
        browser.sleep(100);
        browser.driver.findElement(by.linkText('Change Password')).click();
        browser.sleep(100);
        element(by.name('password')).sendKeys(oldPassword);
        element(by.name('newpassword')).sendKeys(newPassword);
        element(by.name('confirmpassword')).sendKeys(newPassword);
        browser.sleep(200);
        element(by.linkText('Save')).click();
        browser.sleep(200);
        expect(element(by.id('success')).isDisplayed()).toBe(true);
    
    logout.logout();
    login.loginPage(oldPassword,oldPassword);
    expect(browser.driver.findElement(by.xpath("//*[@id='body']/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true);

    login.loginPage(oldPassword,newPassword);
    expect(browser.driver.findElement(by.xpath("//*[@id='wrapper']/nav/div[1]/span/span[2]")).isDisplayed()).toBe(true);
};