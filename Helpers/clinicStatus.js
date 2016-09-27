var enableClinic=require('../Helpers/enableClinic');
var disableClinic=require('../Helpers/disableClinic');

exports.clinicStatus=function(status){
    element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div/table/tbody/tr[1]/td[5]/a[2]")).getAttribute('href').then(function (str) {
        var clinicID=str.substring(str.lastIndexOf('/')+1);
        element(by.linkText('Patients')).click();
        browser.waitForAngular();
        element(by.model('isCheckedAllGroupPatients')).click();
        browser.waitForAngular();
        element(by.linkText('Add Call Log')).click();
        element(by.css('select[ng-model="calllogs.response"]')).$('[value="4"]').click();
        browser.waitForAngular();
        if(status=='enable'){
            enableClinic.enableClinic(clinicID);
        }
        else if(status=='disable'){
            disableClinic.disableClinic(clinicID);
        }

        browser.driver.executeScript('window.scrollTo(0,10000);');
        browser.sleep(300);
        element(by.xpath("//*[@id='callLogForm']/div/div[3]/button[1]")).isDisplayed().then(function (test) {
            element(by.xpath("//*[@id='callLogForm']/div/div[3]/button[1]")).click();
        });
    });
};