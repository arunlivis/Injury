var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var filterStatus=require('../Helpers/filterStatusBy');

describe('Caller', function() {

    it('Search with Filter Status By', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
        filterStatus.filterStatusBy();
    });
},1000000);