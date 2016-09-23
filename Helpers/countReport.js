
exports.countReport=function(name, file) {

    it('Report Count', function () {
        var paginationCount, countAllRow, countLastPageRow, lastPage, total;

        function counterPage(txt){
            var data;
            if(file=='report'){
                data = element.all(by.repeater('crashReport in crashSearchData'));
            }
            else if(file == 'patient'){
                data = element.all(by.repeater('patient in resultData.patientSearchLists'));
            }
            else if(file == 'callerAdmin'){
                data = element.all(by.repeater('callerAdmin in callerAdmins'));
            }
            else if(file == 'appointment'){
                data = element.all(by.repeater('appointment in appointments'));
            }
            data.count().then(function(rowcount){
                if(txt=='all'){
                    countAllRow=rowcount;
                    //console.log('countAllRow '+countAllRow);
                }
                else{
                    countLastPageRow=rowcount;
                    //console.log('countLastPageRow '+countLastPageRow);
                }
            })
        }

        var pagination;
        element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div[1]/div/a/div/span[1]')).isPresent().then(function(result){
            //console.log('result '+result);
            if(file=='appointment'){
                pagination=element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/div[4]/dir-pagination-controls/div[2]'));
            }
            else if(result==false){
                pagination=element(by.xpath('//*[@id="page-wrapper"]/div/div[2]/div/dir-pagination-controls/div[2]'));
            }
            else{
                pagination=element(by.xpath('//*[@id="page-wrapper"]/div/div/div[2]/div/dir-pagination-controls/div[2]'))
            }

            pagination.getText().then(function (value) {
                //console.log("Count " + value);
                str = value.substring(value.lastIndexOf(" "), value.lastIndexOf(" ", 17)).trim();
                //console.log("str " + str);
                paginationCount=parseInt(str);
                //console.log('paginationCount '+paginationCount);


                browser.driver.executeScript('window.scrollTo(0,10000);');
                browser.sleep(1000);

                var noRecords=[10,25,50,100];
                var randNoRecord=Math.floor(Math.random() * 4);

                browser.waitForAngular();
                browser.driver.executeScript('window.scrollTo(0,10000);');

                element(by.cssContainingText('option', 'Show '+noRecords[randNoRecord]+' Per Page')).click();
                browser.waitForAngular();

                //console.log('noRecords[randNoRecord] '+noRecords[randNoRecord]);

                counterPage('all');

                if(noRecords[randNoRecord]<paginationCount){

                    element(by.partialLinkText('»')).click();
                    browser.sleep(1000);
                    element(by.css('[class="ng-scope active"]')).element(by.css('[class="ng-binding"]')).getText().then(function(text){
                        //console.log('Last page Number '+text);
                        lastPage=text;

                    });


                    counterPage('last');

                    element(by.css('[class="ng-scope active"]')).element(by.css('[class="ng-binding"]')).getText().then(function(text){
                        total=((parseInt(lastPage)-1)*parseInt(countAllRow))+parseInt(countLastPageRow);
                        console.log("total of "+name+" "+total);

                        expect(total).toEqual(paginationCount);
                        
                    });
                }
                else{
                    var singlePage;
                    if(file=='report'){
                        singlePage = element.all(by.repeater('crashReport in crashSearchData'));
                    }
                    else if(file == 'patient'){
                        singlePage = element.all(by.repeater('patient in resultData.patientSearchLists'));
                    }
                    else if(file == 'callerAdmin'){
                        singlePage = element.all(by.repeater('callerAdmin in callerAdmins'));
                    }
                    else if(file == 'appointment'){
                        data = element.all(by.repeater('appointment in appointments'));
                    }
                    singlePage.count().then(function(rowcount) {

                        expect(parseInt(rowcount)).toEqual(paginationCount);
                    })
                }

            });
        });

    });

};