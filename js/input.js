    const High = require('./hgraph.js')
    const Scatter = require('./scatter.js')
    const constants = require('./constants.js')


    //Call draw the initial conditon of the graph
    function getInitialData(){
        parameter = 'http://159.65.167.149:8888/price?symbol=LTC&interval=5min'
        var unit = '&unit=' + "USD"
        var interval = '&interval=' + "5min"
        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
                }
                response.json().then(function(data) {
                    High.showCharts()
                    var interval_i = data.interval/1000 
                    var x = processDates(data,interval_i)
                    var y_prices = processPrices(data,unit)
                    var y_volume = processVolume(data,unit)
                    var coin_data = data.symbol
                    var unit_data = data.unit
                    var last_price = y_prices[y_prices.length-1]
                    var last_volume = y_volume[y_volume.length-1]
                    var first_date = x[0]
                    var last_date = x[x.length-1]
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawPriceHeader(coin_data,unit_data,last_price,last_volume,first_date, last_date)
                    High.drawPriceVolumeGraph(coin_data,unit_data,x,y_prices,y_volume)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);   
                });
    }
    //Call draw the initial conditon of the block graph
    function getInitialBlock(){

        var interval = '&interval=' + "hour"
        var interval_i = convertIntervalToNumber(interval)
        var parameter = 'http://159.65.167.149:8888/block?coin=LTC&datatype=difficulty&interval=hour' 
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
                    console.log(data)
                    High.showCharts()
                    High.showBlockCharts()
                    var interval_i = data.interval/1000 
                    var x = processDates(data,interval_i)
                    var y = processData(data)
                    var coin_data = data.symbol
                    var datatype_data = data.datatype
                    var first_date = x[0]
                    var last_date = x[x.length-1]
                    var last_datatype = data.y[y.length-1]
                    window.apiCall = data
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawBlockGraph(coin_data,datatype_data,x,y)
                    High.drawBlockHeader(coin_data,datatype_data,last_datatype,first_date, last_date)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);   
                });
    }

    //call API and Generate the Price and Volume graphs
    function getPriceAPI(){       
        //var reporting_period = document.getElementById ("reporting-period").value
        //var start_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&start=" + getTimeStamp(reporting_period)[0]
        //var end_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&end=" + getTimeStamp(reporting_period)[1]
        var exchange = document.getElementById("exchange").value
            exchange = exchange == "Aggregated" ? "" : '&exchange=' + exchange
        var symbol = 'symbol=' + document.getElementById("symbol").value
        var unit = '&unit=' + document.getElementById("unit").value
        var interval = document.getElementById("interval").value 
        var interval = interval == "None" ? "" : '&interval=' + interval
        var parameter = 'http://159.65.167.149:8888/price?' +  symbol + exchange + unit + interval     
        window.parameter = parameter
        validateParamtersConsole(parameter)

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
                    interval_i = data.interval/1000
                    var x = processDates(data,interval_i)
                    var y_prices = processPrices(data,unit)
                    var y_volume = processVolume(data,unit)
                    window.apiCall = data
                    var coin_data = data.symbol
                    var unit_data = data.unit
                    var last_price = y_prices[y_prices.length-1]
                    var last_volume = y_volume[y_volume.length-1]
                    var first_date = x[0]
                    var last_date = x[x.length-1]
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawPriceHeader(coin_data,unit_data,last_price,last_volume,first_date, last_date)
                    High.drawPriceVolumeGraph(coin_data,unit_data,x,y_prices,y_volume)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);   
                });
    }
    //Call the API and generate graph for Block data
    function getBlockAPI(){   
        //var reporting_period = document.getElementById("block-reporting-period").value
        //var start_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&start=" + getTimeStamp(reporting_period)[0]
        //var end_stamp = reporting_period == "All" || reporting_period == "" ? "" : "&end=" + getTimeStamp(reporting_period)[1]
        var symbol = 'coin=' + document.getElementById("block-symbol").value
        var datatype = '&datatype=' + document.getElementById("block-datatype").value
        var interval = document.getElementById("block-interval").value 
        var interval = interval == "None" ? "" : '&interval=' + interval
        var parameter = 'http://159.65.167.149:8888/block?' + symbol 
        +  datatype + interval 
        window.parameter = parameter
        validateParamtersConsole(parameter)

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
                    High.showCharts()
                    High.showBlockCharts()
                    interval_i = data.interval/1000
                    var x = processDates(data,interval_i)
                    var y = processData(data)
                    window.apiCall = data
                    var coin_data = data.symbol
                    var datatype_data = data.datatype
                    var first_date = x[0]
                    var last_date = x[x.length-1]
                    var last_datatype = data.y[y.length-1]
                    //Here you will pass data to whatever Graphing library asynchronosly
                    High.drawBlockGraph(coin_data,datatype_data,x,y)
                    High.drawBlockHeader(coin_data,datatype_data,last_datatype,first_date, last_date)
                    //Scatter.drawScatterPlot(data)
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
            end_stamp = ((Date.now() - 300 * constants.MILLI) * 1000).toString() // subtract 300 milli because API has trouble getting the latest timestamp
        }else if(reporting_period == "Week"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate() - (now.getDay()));
            start_stamp = (start_stamp* 1000).toString()  
            end_stamp = ((Date.now() - 300 * constants.MILLI) * 1000).toString() //same as above
        }else if(reporting_period == "Month"){
            start_stamp = new Date(now.getFullYear(),now.getMonth())
            start_stamp = (start_stamp* 1000).toString() 
            end_stamp = ((Date.now() - 300 * constants.MILLI) * 1000).toString() //same as above
        }else{

        }
        timestamps.push(start_stamp)
        timestamps.push(end_stamp)

        return timestamps
    }

    //given the interval in string format, return the milliseconds in integer in order to be converted into dates. 
    function convertIntervalToNumber(interval){
        interval_numbers = {"&interval=5min" : 300 * constants.MILLI, 
            "&interval=hour" : 3600 * constants.MILLI, "&interval=day" : 86400 * constants.MILLI }
        interval_i = interval_numbers[interval]
        return interval_i
    }
    //take in json with  microsecond times and append to json the array of millisecond time stamps
    function processDates(json,interval_i){ 
        var milliArray = []
        var time = json.x1/1000
        for(i = 0 ; i < json.y.length ; i++){
            milliArray.push(time)
            time += interval_i
        }
        return milliArray
    }

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    //given a json with prices, and units in string, eliminate zeros, convert the prices to those units and return an array of prices
    function processPrices(json,unit){
        console.log(json)
        for(i = 0 ; i < json.y.length ; i++){
            if(json.y[i] == 0){
                json.y[i] = json.y[i-1]
            }else if(json.y[i] == 0 && i == 0){
                j = 0
                while(json.y[j] == 0){j++ }
                json.y[0] = json.y[j]
            }else{
                continue
            }
        }
        unit = unit.slice(6,unit.length)
        pricesArray = []
        //if you divide your data by the conversion and it is less than 1 (ie. Comparing DOGE to units of BTC) give me 8 decimals
        if(json.y[0]/constants.conversions[unit] < 1){
            json.y = json.y.map(function(units){return round(units/constants.conversions[unit],8)})
        }else{
            json.y = json.y.map(function(units){return round(units/constants.conversions[unit],2)})

        }
        return json.y
        }

    //given a json with volumes, and units in string,eliminate zeros convert the volumes to those units and return the array of volumes
    function processVolume(json,unit){

        for(i = 0 ; i < json.w.length ; i++){

            if(json.w[i] == 0 && i ==0){
                j = 0
              while(json.w[j] == 0){j++}  
                json.w[0] = json.w[j]
                    
            }else if(json.w[i] == 0){
                json.w[i] = json.w[i-1]
            }else{
                continue
            }
        }
            unit = unit.slice(6,unit.length)
             json.w = json.w.map(function(vol){return round(vol/constants.conversions[unit],2)})
            return json.w
        }
     //given a json block data, eliminate zeros/falsy/NaN  by reaching out and grabbing the previous values
    function processData(json){

        for(i = 0 ; i < json.y.length ; i++){
            if(!json.y[i] && i == 0){
                j = 0
                while(!json.y[j]){j++ }
                    json.y[0] = json.y[j]
            }else if(!json.y[i]){
                json.y[i] = json.y[i-1]
            }else{
                continue
            }
        }
                return json.y
    }
        
    //given a unix timestamp in milliseconds, convert that to a date object
    function convertUnix(data){
          function unixToReg(time){
            return new Date(time)
          }
          return data.map(function(time){return unixToReg(time)})
    }

    //print out the API call URL and the exact time stamps you called for debugging.
    function validateParamtersConsole(parameter){
        console.log(parameter) // you can validate paramter in console. 
        /*if(Number(start_stamp) || Number(end_stamp) == 0){
            console.log("No start or end time stamps requested")
        }else{        
            console.log(new Date(Number(start_stamp.slice(7,start_stamp.length))/1000)) //to validate timestamps in console
            console.log(new Date(Number(end_stamp.slice(5,start_stamp.length))/1000)) // you can validate timestamps in consloe}
        }*/
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