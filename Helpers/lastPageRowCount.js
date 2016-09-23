exports.lastPageRowCount=function(search, searchName){
    var patients;
    if(search==1){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.county'));
        patients.getText().then(function(object){
            console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==2){
        patients = element.all(by.repeater('resultData in callerPatientSearchData').column('resultData.crashDate'));
        patients.getText().then(function(lRN){
            for(var i=0;i<lRN.length;i++){
                var strLength=lRN[i].length;
                //console.log('strLength '+strLength);
                var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                console.log('cell text '+object);
                expect(searchName).toContain(object);
            }
        });
    }
    else if(search==3){
        patients = element.all(by.repeater('resultData in callerPatientSearchData').column('resultData.addedDate'));
        patients.getText().then(function(lRN){
            for(var i=0;i<lRN.length;i++){
                var strLength=lRN[i].length;
                console.log('strLength '+strLength);
                var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                console.log('cell text '+object);
                expect(searchName).toContain(object);
            }

        });
    }

    else if(search==4){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.phoneNumber'));
        patients.getText().then(function(object){
            for(var i=0;i<object.length;i++){
                console.log('cell text '+object[i]);
                expect(object[i]).toContain(searchName);
            }

        });
    }
    else if(search==5){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.name'));
        patients.getText().then(function(object){
            for(var i=0;i<object.length;i++){
                //console.log('cell text '+object[i]);
                expect(object[i].toUpperCase()).toContain(searchName.toUpperCase());
            }

        });
    }
    else if(search==6){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.localReportNumber'));
        patients.getText().then(function(lRN){
            for(var i=0;i<lRN.length;i++){
                var strLength=lRN[i].length;
                //console.log('strLength '+strLength);
                var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                //console.log('cell text '+object);
                expect(object).toContain(searchName);
            }

        });
    }
    else if(search==7){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.caller'));
        patients.getText().then(function(object){
            //console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==8){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.tier'));
        patients.getText().then(function(object){
            //console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==9){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.patientStatus'));
        patients.getText().then(function(object){
            console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==10){
        patients = element.all(by.repeater('callerData in resultData.patientSearchLists').column('callerData.isArchived'));
        patients.valueOf().then(function(object){
            console.log('cell text '+object);
            //expect(object).toContain(searchName);
        });
    }
};