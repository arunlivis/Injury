var callerAdminClick=require('../Helpers/clickCallCenterAdmin');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callerAdminFill=require('../Helpers/fillCallerAdmin');
var selectCounty=require('../Helpers/selectCounty');
var checkboxChecked=require('../Helpers/checkedCheckbox');

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
        element.all(by.repeater('callerAdmin in callerAdmins').column('callerAdmin.username')).getText().then(function (names) {
            console.log('username : '+names);
            randName=Math.floor(Math.random()*names.length);
            element(by.linkText('Add Call Center Admin')).click();

            callerAdminFill.fillCallerAdmin('add', names[randName]).then(function(result){
                console.log('result : '+result);
                checkedCheckbox(arrCheckedID);
                element(by.id('1')).isSelected().then(function (value) {
                    console.log('arrCheckedID : '+arrCheckedID);
                });

                expect(arrCheckedID).toEqual(result);
            });
        });

        element(by.linkText('Save')).click();
    });
});