exports.lastPageRowCount=function(user, search, searchName){
    var patients;
    var data;
    var forDate;
    if(user=='caller'){
        data='callerData';
        forDate='callerP'
    }
    else if(user=='calleradmin'){
        data='patient';
        forDate='p';
    }
    if(search==1){
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.county'));
        patients.getText().then(function(object){
            console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==2){
        patients = element.all(by.repeater('resultData in '+forDate+'atientSearchData').column('resultData.crashDate'));
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
        patients = element.all(by.repeater('resultData in '+forDate+'atientSearchData').column('resultData.addedDate'));
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
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.phoneNumber'));
        patients.getText().then(function(object){
            for(var i=0;i<object.length;i++){
                console.log('cell text '+object[i]);
                expect(object[i]).toContain(searchName);
            }

        });
    }
    else if(search==5){
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.name'));
        patients.getText().then(function(object){
            for(var i=0;i<object.length;i++){
                //console.log('cell text '+object[i]);
                expect(object[i].toUpperCase()).toContain(searchName.toUpperCase());
            }

        });
    }
    else if(search==6){

        patients = element.all(by.repeater('resultData in '+forDate+'atientSearchData').column('resultData.localReportNumber'));
        patients.getText().then(function(lRN){
            for(var i=0;i<lRN.length;i++){
                var strLength=lRN[i].length;
                var object=lRN[i].slice(lRN[i].lastIndexOf(':')+2,strLength);
                expect(object).toContain(searchName);
            }
        });
    }
    else if(search==7){
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.caller'));
        patients.getText().then(function(object){
            //console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==8){
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.tier'));
        patients.getText().then(function(object){
            //console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==9){
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.patientStatus'));
        patients.getText().then(function(object){
            console.log('cell text '+object);
            expect(object).toContain(searchName);
        });
    }
    else if(search==10){
        patients = element.all(by.repeater(data+' in resultData.patientSearchLists').column(data+'.isArchived'));
        patients.valueOf().then(function(object){
            console.log('cell text '+object);
            //expect(object).toContain(searchName);
        });
    }
};