exports.getWorkingDays=function(){
    var arrWorking=[];

    for(i=0;i<7;i++){
        var func=(function () {
            var j=i;
            return function (isWorking) {
                if(isWorking){
                    return 'clinic.clinicTimingList['+j+'].isWorkingDay';
                }
            };
        })();
        return element(by.model('clinic.clinicTimingList['+i+'].isWorkingDay')).isSelected().then(func);
    }


};