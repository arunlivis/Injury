var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var callersClick=require('../Helpers/clickCallers');
var getCaller=require('../Helpers/getCallers');
var searchCaller=require('../Helpers/searchCallerWithUsername');

describe('Call Center Admin', function() {
    it('Edit Callers', function(){
        urlPage.urlPage();
        login.loginPage('calleradmin', 'calleradmin');
        callersClick.clickCallers();
        getCaller.getCallers().then(function(caller){
            searchCaller.searchCallerWithUsername(caller);
        })
    });
});