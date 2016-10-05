exports.selectCounty=function(status){
    var clickID;
    var clickable=0;
    var arrID=[];
    var arrCorrectID = [];

        for(i=0;i<10;i++){
            var randID = Math.floor(Math.random()*89);
            //console.log('randID '+randID);
            if(randID==0){
                clickID='checkAll';
            }
            else{
                clickID=randID.toString();
            }
            element(by.id(clickID)).click();

            if(randID==0){
                clickable++;
                if(clickable%2==1){
                    arrID=[];
                    //arrID.push('checkAll');
                    //console.log('arrID  '+arrID);
                    for(j=1;j<89;j++){
                        arrID.push(j);
                    }
                }
                else{
                    arrID=[];
                }
            }
            else{
                arrID.push(randID);
            }
        }

        element(by.id('1')).isSelected().then(function (value) {
            if(status=='update'){
                arrID=arrID.concat(arrOldCheckedID);
            }
            console.log('arrID '+arrID);

            arrID.sort(function(c, d){return c-d});

            var current = null;
            var cnt = 0;
            console.log('a.length '+arrID.length);
            for (var i = 0; i < arrID.length; i++) {
                if (arrID[i] != current) {
                    if (cnt > 0) {
                        console.log(current + ' comes --> ' + cnt + ' times');
                        if(cnt%2==1){
                            arrCorrectID.push(current);
                        }
                    }
                    current = arrID[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }
            if (cnt > 0) {
                console.log(current + ' comes --> ' + cnt + ' times');
                if(cnt%2==1){
                    arrCorrectID.push(current);
                }
            }
        });
};