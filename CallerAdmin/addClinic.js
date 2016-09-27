var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var clinicsClick=require('../Helpers/clickClinics');
var clinicFill=require('../Helpers/fillClinic');
var workingHoursFill=require('../Helpers/fillWorkingHours');

describe('Call Center Admin', function () {
    var arrWorking=[];
    it('Add Clinic', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        clinicsClick.clickClinics();
        browser.sleep(500);
        
        clinicFill.fillClinics('save');

        for(i=0;i<7;i++){
            var func=(function () {
                var j=i;
                return function (isWorking) {
                    if(isWorking){
                        arrWorking.push('clinic.clinicTimingList['+j+'].isWorkingDay');
                    }
                };
            })();
            element(by.model('clinic.clinicTimingList['+i+'].isWorkingDay')).isSelected().then(func);
        }
        element(by.model('doctorInput.doctorName')).getAttribute('value').then(function (txt) {
            console.log('txt : ' + txt);
            workingHoursFill.fillWorkingHours(arrWorking,txt);
        });
        

        var saveButton=element(by.linkText('Save'));
        browser.sleep(300);
        saveButton.isDisplayed().then(function (isSave) {
            if(isSave){
                saveButton.click();
            }
            else{
                browser.pause();
            }
        });

        browser.sleep(300);
        expect(element(by.css('h2[class="page-header"]')).getText()).toEqual('Clinics');
    },1000000)
});
