var rowCount=require('../Helpers/lastPageRowCount.js');

exports.checkPatient=function(user,search, searchName) {

    var totalRecords, lastPage;
    var recPerPage;
    var files;
    var searchRec;
    if(user=='caller'){
        files=element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/table/tbody/tr/td/center/strong'));
        searchRec=element(by.model('patient.itemsPerPage'));
    }
    else if(user=='calleradmin'){
        files=element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/table/tbody/tr/td/center/strong'));
        searchRec=element(by.model('patient.itemsPerPage'));
    }
    else if(user=='appointment'){
        files=element(by.xpath('//*[@id="dataTables-example"]/tbody[2]/tr/td'));
        searchRec=element(by.model('searchAppointment.itemsPerPage'));
    }
        browser.sleep(300);
        files.isDisplayed().then(function (noRecords) {
            if(!noRecords){
                browser.sleep(300);
                browser.driver.executeScript('window.scrollTo(0,10000);');
                browser.sleep(100);
                element(by.css('div[class="col-md-4 margin-top-30 ng-binding"]')).getText().then(function (value) {
                    //console.log("Count " + value);
                    str = value.substring(value.lastIndexOf(" "), value.lastIndexOf("of")+3).trim();
                    //console.log("str "+ str);
                    totalRecords=parseInt(str);

                    searchRec.$('option:checked').getText().then(function (result) {

                        var recordPerPage=result.substring(result.indexOf(" "), result.indexOf(" ",7)).trim();
                        recPerPage=parseInt(recordPerPage);
                        //console.log('Records Per Page: '+recPerPage);
                        //console.log("recPerPage "+recPerPage);

                        if(recPerPage<totalRecords){
                            var clickable=0;
                            element(by.partialLinkText('»')).click();
                            browser.waitForAngular();
                            element(by.css('[class="ng-scope active"]')).element(by.css('[class="ng-binding"]')).getText().then(function(text) {
                                //console.log('Last page Number of '+localReportNumber+' '+ text);
                                lastPage=parseInt(text);
                                element(by.partialLinkText('«')).click();
                                browser.waitForAngular();
                                console.log('Last page  '+ lastPage);
                                while(clickable<lastPage-1){
                                    rowCount.lastPageRowCount(user,search, searchName);
                                    element(by.partialLinkText('›')).click();
                                    //console.log('clickable '+clickable);
                                    clickable++;
                                }

                                rowCount.lastPageRowCount(user,search, searchName);
                            });
                        }

                        else{
                            rowCount.lastPageRowCount(user,search, searchName);
                        }
                    });

                });
            }
        })

};