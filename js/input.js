var Input = (function(){

    function getPriceAPI(){
        var reporting_period = document.getElementById ("reporting-period").value
        var start_stamp = getTimeStamp(reporting_period)[0]
        var end_stamp = getTimeStamp(reporting_period)[1]
        var exchange = document.getElementById("exchange").value 
        var symbol = document.getElementById("symbol").value
        var unit = document.getElementById("unit").value
        var interval = document.getElementById("interval").value
        var interval_i = convertIntervalToNumber(interval)
        var interval = convertIntervalText(interval)
        var parameter = 'http://api.blkdat.com/price?' + 'symbol=' + symbol 
        + '&exchange=' + exchange + '&unit=' + unit + '&interval=' + interval 
        + '&start=' + start_stamp +'&end=' + end_stamp     
        window.parameter = parameter
        console.log(parameter)
        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
                }
                response.json().then(function(data) {
                    data = processDates(data,interval_i)
                    data = processPrices(data,unit)
                    data = processVolume(data,unit)
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    Graph.drawPriceGraph(data)
                    Graph.drawVolumeGraph(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    document.getElementById("chart1").innerHTML = "Cannot load data" 
                });
    }

    function getBlockAPI(){
        console.log("getting block data")
        var reporting_period = document.getElementById("block-reporting-period").value
        var start_stamp = getTimeStamp(reporting_period)[0]
        var end_stamp = getTimeStamp(reporting_period)[1]
        var symbol = document.getElementById("block-symbol").value
        var datatype = document.getElementById("block-datatype").value
        var interval = document.getElementById("block-interval").value
        var interval_i = convertIntervalToNumber(interval)
        var interval = convertIntervalText(interval)
        var parameter = 'http://api.blkdat.com/block?' + 'coin=' + symbol 
        + '&datatype=' + datatype + '&interval=' + interval + '&start=' + start_stamp +'&end=' + end_stamp     
        window.parameter = parameter
        console.log(parameter)
        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
                }
                response.json().then(function(data) {
                    data = processDates(data,interval_i)
                    data = processData(data)
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    Graph.drawBlockGraph(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    document.getElementById("chart1").innerHTML = "Cannot load data" 
                });
    }

    function getTimeStamp(reporting_period){
        now = new Date()
        timestamps = []
        start_stamp = ""
        end_stamp = ""
        if (reporting_period == "Daily"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate())
            start_stamp = (start_stamp*1000).toString() 
            end_stamp = (Date.now() * 1000).toString()
        }else if(reporting_period == "Weekly"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate() - (now.getDay()));
            start_stamp = (start_stamp*1000).toString()  
            end_stamp = (Date.now() * 1000).toString()
        }else if(reporting_period == "Monthly"){
            start_stamp = new Date(now.getFullYear(),now.getMonth())
            end_stamp = (Date.now() * 1000).toString().toString()
        }else{
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate())
            start_stamp = (start_stamp*1000).toString() 
            end_stamp = (Date.now() * 1000).toString()
        }
        timestamps.push(start_stamp)
        timestamps.push(end_stamp)

        return timestamps
    }

    function convertIntervalText(interval){
        if(interval == "5 min."){
            interval = "5min"
        }else if(interval == "1 hour"){
            interval = "hour"
        }else if(interval == "1 day"){
            interval = "day"
        }else{
            interval = "hour"
        }
        return interval
    }

    function convertIntervalToNumber(interval){
        interval_i = 0
        if(interval == "5 min."){
            interval_i = 300000000
        }else if(interval == "1 hour"){
            interval_i = 3600000000
        }else if(interval == "1 day"){
            interval_i = 86400000000
        }else{
            interval_i = 3600000000
        }
        return interval_i
    }

    function processDates(json,interval_i){
        var timeArray = []
        var time = json.data[0]
        for(i = 0 ; i < json.data[2].length ; i++){
            timeArray.push(time)
            time += interval_i
        }
        timeArray = convertUnix(timeArray)
        json.data.push(timeArray)
        return json
    }

    function processPrices(json,unit){
        for(i = 0 ; i < json.data[2].length ; i++){
            if(json.data[2][i] == 0){
                json.data[2][i] = (json.data[2][i-1] + json.data[2][i+1])/2
            }else if(json.data[2][i] == 0 && i == 0){
                json.data[2][0] =  json.data[2][i+1]
            }else if(json.data[2][i] == 0 && i == json.data[2].length-1){
                json.data[2][i] =  json.data[2][i-1]
            }else{
                continue
            }
        }
        if(unit == "USD"){
            json.data[2] = json.data[2].map(function(cents){return Number(Math.round(cents/100000000 + 'e2') + 'e-2').toFixed(2)})
        }else if(unit == "BTC"){
            //What would this be?
            json.data[2] = json.data[2].map(function(cents){return Number(Math.round(cents/100000000 + 'e2') + 'e-2').toFixed(2)})
        }else{
            //What would this be?
            json.data[2] = json.data[2].map(function(cents){return Number(Math.round(cents/100000000 + 'e2') + 'e-2').toFixed(2)})
        }
        return json
        }

    function processVolume(json,unit){
        if(unit == "USD"){
            json.data[3] = json.data[3].map(function(vol){return Number(Math.round(vol/100000000 + 'e2') + 'e-2')})
        }else if(unit == "BTC"){
            //What would this be?
            json.data[3] = json.data[3].map(function(cents){return Number(Math.round(vol/100000000 + 'e2') + 'e-2')})
        }else{
            //What would this be?
            json.data[3] = json.data[3].map(function(cents){return Number(Math.round(vol/100000000 + 'e2') + 'e-2')})
        }
            return json
        }
    function processData(json){

        for(i = 0 ; i < json.data[2].length ; i++){
            if(json.data[2][i] == 0){
                json.data[2][i] = (json.data[2][i-1] + json.data[2][i+1])/2
            }else if(json.data[2][i] == 0 && i == 0){
                json.data[2][0] =  json.data[2][i+1]
            }else if(json.data[2][i] == 0 && i == json.data[2].length-1){
                json.data[2][i] =  json.data[2][i-1]
            }else{
                continue
                }
            }
                return json
            }              

    function convertUnix(data){
          function unixToReg(time){
            return new Date(time/1000)
          }
          return data.map(function(time){return unixToReg(time)})
    }

    function getData(){
        return window.apiCall
    }

    function getParameter(){
        return window.parameter
    }
 
    return {
        getPriceAPI: getPriceAPI,
        getBlockAPI: getBlockAPI,
        getData: getData,
        getParameter: getParameter
    } 

}());
