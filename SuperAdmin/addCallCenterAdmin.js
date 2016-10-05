var callerAdminClick=require('../Helpers/clickCallCenterAdmin');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callerAdminFill=require('../Helpers/fillCallerAdmin');
var getCallerAdmin=require('../Helpers/getCallerAdmins');

describe('Super Admin', function() {
    it('Add Call Center Admin', function () {
        var arrCheckedID=[];
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
            element(by.linkText('Add Call Center Admin')).click();
            callerAdminFill.fillCallerAdmin('add', callerAdmin).then(function(result){
                checkedCheckbox(arrCheckedID);
                expect(arrCheckedID).toEqual(result);
            });
        });
        element(by.linkText('Save')).click();
    });
});