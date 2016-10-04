var checkPatient=require('../Helpers/checkPatients');
exports.assignCaller=function(){
    var randCallerID;
    element.all(by.css('[ng-model="myForm.callerId"] option')).getAttribute('value').then(function(caller) {
        randCallerID = Math.floor(Math.random() * (caller.length-1)+1);
        console.log('randCallerID : ' + randCallerID);
        element(by.css('select[ng-model="myForm.callerId"]')).$('[value="'+caller[randCallerID]+'"]').click();
        console.log('All Callers : ' + caller);
        console.log('callers : '+caller[randCallerID]);
        browser.sleep(100);
        element(by.model('myForm.callerId')).$('option:checked').getText().then(function (checkedCaller) {
            //console.log('checkedCaller : '+checkedCaller);
            var assignButton=element(by.linkText('Assign'));
            assignButton.isDisplayed().then(function (btn) {
                if(btn){
                    assignButton.click();
                }
            });
            checkPatient.checkPatient('calleradmin', 7,checkedCaller);
        })
    });
};