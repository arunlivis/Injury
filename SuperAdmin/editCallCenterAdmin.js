var callerAdminClick=require('../Helpers/clickCallCenterAdmin');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callerAdminFill=require('../Helpers/fillCallerAdmin');
var getCallerAdmin=require('../Helpers/getCallerAdmins');
var searchCallerAdmin=require('../Helpers/searchCallerAdminwithUsername');

describe('Super Admin', function() {
    it('Edit Call Center Admin', function () {
        var arrCheckedID=[];
        var arrOldCheckedID=[];
        function checkedCheckbox(a) {
            for(k=1;k<89;k++){
                var func=(function(){
                    var l=k;
                    return function(value){
                        if(value){
                            a.push(l);
                        }
                    }})();
                element(by.css('[id="'+k+'"][checked="checked"]')).isPresent().then(func);
            }
        }
        urlPage.urlPage();
        login.loginPage('superadmin','superadmin');
        callerAdminClick.clickCallerAdmin();
        browser.sleep(500);
        getCallerAdmin.getCallerAdmins().then(function(callerAdmin){
            searchCallerAdmin.searchCallerAdminWithUsername(callerAdmin);
            browser.sleep(500);
            element(by.css('[data-hint="Edit Call Center Admin"]')).click();
            browser.sleep(500);
            checkedCheckbox(arrOldCheckedID);
            callerAdminFill.fillCallerAdmin('update', callerAdmin,arrOldCheckedID).then(function(result){
                checkedCheckbox(arrCheckedID);
                element(by.id('1')).isSelected().then(function (value) {
                    console.log('arrOldCheckedID : '+arrOldCheckedID);
                    console.log('arrCheckedID : '+arrCheckedID);
                    console.log('result : '+result);
                });
                expect(arrCheckedID).toEqual(result);
            });
        });
        element(by.linkText('Update')).click();
        browser.waitForAngular();
    },99999);
});