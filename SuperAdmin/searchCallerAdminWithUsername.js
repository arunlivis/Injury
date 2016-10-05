var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callerAdminClick=require('../Helpers/clickCallCenterAdmin');
var getCallerAdmin=require('../Helpers/getCallerAdmins');
var searchCallerAdmin=require('../Helpers/searchCallerAdminwithUsername');

describe('Call Center Admin', function() {
    it('Search Caller with Username', function(){
        urlPage.urlPage();
        login.loginPage('superadmin', 'superadmin');
        callerAdminClick.clickCallerAdmin();
        getCallerAdmin.getCallerAdmins().then(function(callerAdmin){
            searchCallerAdmin.searchCallerAdminWithUsername(callerAdmin);
        })
    });
});