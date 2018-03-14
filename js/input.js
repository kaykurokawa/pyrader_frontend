    const High = require('./hgraph.js')
    
    var MICRO = Math.pow(10,6)
    var MILLI = Math.pow(10,3)
    var HUNDREDMIL = Math.pow(10,8)
    var TENTHOUSAND = Math.pow(10,4)

    var conversions = {"USD": HUNDREDMIL, "BTC" : HUNDREDMIL, "DOGE" : HUNDREDMIL, 
    "LTC" : HUNDREDMIL, "ETH" : HUNDREDMIL, "EUR" : HUNDREDMIL, "SGD" : HUNDREDMIL, "KRW" : TENTHOUSAND}


    //Call draw the initial conditon of the graph
    function getInitialData(){
        parameter = 'http://api.blkdat.com/price?symbol=LTC&interval=5min'
        var unit = '&unit=' + "USD"
        var interval = '&interval=' + "5min"
        var interval_i = convertIntervalToNumber(interval)
        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
                }
                response.json().then(function(data) {
                    High.showCharts()
                    data = processDates(data,interval_i)
                    data = processPrices(data,unit)
                    data = processVolume(data,unit)
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawPriceVolumeGraph(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);   
                });
    }
    //Call draw the initial conditon of the block graph
    function getInitialBlock(){

        var interval = '&interval=' + "5min"
        var interval_i = convertIntervalToNumber(interval)
        var parameter = 'http://api.blkdat.com/block?coin=LTC&datatype=difficulty&interval=hour' 
        window.parameter = parameter

        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                High.clearBlockCharts()
                return;
                }
                response.json().then(function(data) {
                    High.showCharts()
                    High.showBlockCharts()
                    data = processDates(data,interval_i)
                    data = processData(data)
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawBlockGraph(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);   
                });
    }

    //call API and Generate the Price and Volume graphs
    function getPriceAPI(){
        var reporting_period = document.getElementById ("reporting-period").value
        var start_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&start=" + getTimeStamp(reporting_period)[0]
        var end_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&end=" + getTimeStamp(reporting_period)[1]
        var exchange = document.getElementById("exchange").value
            exchange = exchange == "Aggregated" ? "" : '&exchange=' + exchange
        var symbol = 'symbol=' + document.getElementById("symbol").value
        var unit = '&unit=' + document.getElementById("unit").value
        var interval = '&interval=' + document.getElementById("interval").value
        var interval_i = convertIntervalToNumber(interval)
        var parameter = 'http://api.blkdat.com/price?' +  symbol + exchange + unit + interval 
        + start_stamp + end_stamp     
        window.parameter = parameter
        validateParamtersConsole(parameter, start_stamp, end_stamp)

        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                High.clearCharts()
                return;
                }
                response.json().then(function(data) {
                    High.showCharts()
                    data = processDates(data,interval_i)
                    console.log(data)
                    data = processPrices(data,unit)
                    data = processVolume(data,unit)
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawPriceVolumeGraph(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);   
                });
    }
    //Call the API and generate graph for Block data
    function getBlockAPI(){
        var reporting_period = document.getElementById("block-reporting-period").value
        var start_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&start=" + getTimeStamp(reporting_period)[0]
        var end_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&end=" + getTimeStamp(reporting_period)[1]
        var symbol = 'coin=' + document.getElementById("block-symbol").value
        var datatype = '&datatype=' + document.getElementById("block-datatype").value
        var interval = '&interval=' + document.getElementById("block-interval").value
        var interval_i = convertIntervalToNumber(interval)
        var parameter = 'http://api.blkdat.com/block?' + symbol 
        +  datatype + interval + start_stamp + end_stamp     
        window.parameter = parameter
        validateParamtersConsole(parameter, start_stamp, end_stamp)

        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                High.clearBlockCharts()
                return;
                }
                response.json().then(function(data) {
                    High.showBlockCharts()
                    data = processDates(data,interval_i)
                    data = processData(data)
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawBlockGraph(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);

                });
    }

    //given a reporting period in string, return the start and end time stamps in an array in microseconds
    function getTimeStamp(reporting_period){
        now = new Date()
        timestamps = []
        start_stamp = ""
        end_stamp = ""
        if (reporting_period == "Day"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate())
            start_stamp = (start_stamp * 1000).toString()
            end_stamp = ((Date.now() - 300 * MILLI) * 1000).toString() // subtract 300 milli because API has trouble getting the latest timestamp
        }else if(reporting_period == "Week"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate() - (now.getDay()));
            start_stamp = (start_stamp* 1000).toString()  
            end_stamp = ((Date.now() - 300 * MILLI) * 1000).toString() //same as above
        }else if(reporting_period == "Month"){
            start_stamp = new Date(now.getFullYear(),now.getMonth())
            start_stamp = (start_stamp* 1000).toString() 
            end_stamp = ((Date.now() - 300 * MILLI) * 1000).toString() //same as above
        }else{

        }
        timestamps.push(start_stamp)
        timestamps.push(end_stamp)

        return timestamps
    }

    //given the interval in string format, return the milliseconds in integer in order to be converted into dates. 
    function convertIntervalToNumber(interval){
        interval_numbers = {"&interval=5min" : 300 * MILLI, 
            "&interval=hour" : 3600 * MILLI, "&interval=day" : 86400 * MILLI }
        interval_i = interval_numbers[interval]
        return interval_i
    }
    //take in json with  microsecond times and append to json the array of millisecond time stamps
    function processDates(json,interval_i){ 
        var timeArray = []
        var time = json.data[0]/1000
        for(i = 0 ; i < json.data[2].length ; i++){
            timeArray.push(time)
            time += interval_i
        }
        milliArray = timeArray
        json.data.push(milliArray)
        return json
    }

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    //given a json with prices, and units in string, eliminate zeros, convert the prices to those units and return the json
    function processPrices(json,unit){
        for(i = 0 ; i < json.data[2].length ; i++){
            if(json.data[2][i] == 0){
                json.data[2][i] = json.data[2][i-1]
            }else if(json.data[2][i] == 0 && i == 0){
                j = 0
                while(json.data[2][j] == 0){j++ }
                json.data[2][0] = json.data[2][j]
            }else{
                continue
            }
        }
        unit = unit.slice(6,unit.length)
        //if you divide your data by the conversion and it is less than 1 (ie. Comparing DOGE to units of BTC) give me 8 decimals
        if(json.data[2][0]/conversions[unit] < 1){
            console.log("process 8 decimal")
            json.data[2] = json.data[2].map(function(units){return round(units/conversions[unit],8)})
        }else{
            json.data[2] = json.data[2].map(function(units){return round(units/conversions[unit],2)})

        }
        return json
        }

    //given a json with volumes, and units in string,eliminate zeros convert the volumes to those units and return the json
    function processVolume(json,unit){

        for(i = 0 ; i < json.data[3].length ; i++){

            if(json.data[3][i] == 0 && i ==0){
                j = 0
              while(json.data[3][j] == 0){j++}  
                json.data[3][0] = json.data[3][j]
                    
            }else if(json.data[3][i] == 0){
                json.data[3][i] = json.data[3][i-1]
            }else{
                continue
            }
        }
            unit = unit.slice(6,unit.length)
            json.data[3] = json.data[3].map(function(vol){return round(vol/conversions[unit],2)})
            return json
        }
     //given a json block data, eliminate zeros/falsy/NaN  by reaching out and grabbing the previous values
    function processData(json){

        for(i = 0 ; i < json.data[2].length ; i++){
            if(!json.data[2][i] && i == 0){
                j = 0
                while(!json.data[2][j]){j++ }
                    json.data[2][0] = json.data[2][j]
            }else if(!json.data[2][i]){
                json.data[2][i] = json.data[2][i-1]
            }else{
                continue
            }
        }
                return json
    }
        
    //given a unix timestamp in milliseconds, convert that to a date object
    function convertUnix(data){
          function unixToReg(time){
            return new Date(time)
          }
          return data.map(function(time){return unixToReg(time)})
    }

    //print out the API call URL and the exact time stamps you called for debugging.
    function validateParamtersConsole(parameter, start_stamp, end_stamp){
        console.log(parameter) // you can validate paramter in console. 
        if(Number(start_stamp) || Number(end_stamp) == 0){
            console.log("No start or end time stamps requested")
        }else{        
            console.log(new Date(Number(start_stamp.slice(7,start_stamp.length))/1000)) //to validate timestamps in console
            console.log(new Date(Number(end_stamp.slice(5,start_stamp.length))/1000)) // you can validate timestamps in consloe}
        }
    }
    //getter for the JSON object
    function getData(){
        return window.apiCall
    }
    //getter for the API url
    function getParameter(){
        return window.parameter
    }
    
    module.exports = {
        getPriceAPI: getPriceAPI,
        getBlockAPI: getBlockAPI,
        getData: getData,
        getParameter: getParameter,
        getInitialData: getInitialData,
        getInitialBlock: getInitialBlock,
        getTimeStamp: getTimeStamp,
        processDates: processDates,
        convertIntervalToNumber: convertIntervalToNumber,
        round: round,
        processPrices: processPrices,
        processVolume: processVolume,
        processData: processData,
    }