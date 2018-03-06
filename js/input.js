var Input = (function(){

    var MICRO = Math.pow(10,6)
    var MILLI = Math.pow(10,3)
    var HUNDREDMIL = Math.pow(10,8)
    var TENTHOUSAND = Math.pow(10,4)
    var BILLIONSANDBILLIONS = Math.pow(10,18)
    var conversions = {"USD": HUNDREDMIL, "BTC" : HUNDREDMIL, "DOGE" : HUNDREDMIL, 
    "LTC" : HUNDREDMIL, "ETH" : BILLIONSANDBILLIONS, "EUR" : HUNDREDMIL, "SGD" : HUNDREDMIL, "KRW" : TENTHOUSAND}

    //Call Info API and pass information to dropdowns 
    function getInfo(){
       url= 'http://api.blkdat.com/info?'
        fetch(url)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
                }
                response.json().then(function(data) {
                    data = processInfo(data)
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    document.getElementById("chart1").innerHTML = "Cannot load data" 
                });
    }

    //call API and Generate the Price and Volume graphs
    function getPriceAPI(){
        var reporting_period = document.getElementById ("reporting-period").value
        var start_stamp = reporting_period == "None" ? "" : "&start=" + getTimeStamp(reporting_period)[0]
        var end_stamp = reporting_period == "None" ? "" : "&end=" + getTimeStamp(reporting_period)[1]
        var exchange = document.getElementById("exchange").value
            exchange = exchange == "none" ? "" : '&exchange=' + exchange
        var symbol = 'symbol=' + document.getElementById("symbol").value
        var unit = '&unit=' + document.getElementById("unit").value
        var interval = '&interval=' + convertIntervalText(document.getElementById("interval").value)
        var interval_i = convertIntervalToNumber(interval)
        var parameter = 'http://api.blkdat.com/price?' +  symbol + exchange + unit + interval 
        + start_stamp + end_stamp     
        window.parameter = parameter
        validateParamtersConsole(parameter, start_stamp, end_stamp)

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
    //Call the API and generate graph for Block data
    function getBlockAPI(){
        var reporting_period = document.getElementById("block-reporting-period").value
        var start_stamp = reporting_period == "None" ? "" : "&start=" + getTimeStamp(reporting_period)[0]
        var end_stamp = reporting_period == "None" ? "" : "&end=" + getTimeStamp(reporting_period)[1]
        var symbol = 'coin=' + document.getElementById("block-symbol").value
        var datatype = '&datatype=' + document.getElementById("block-datatype").value
        var interval = '&interval=' + convertIntervalText(document.getElementById("block-interval").value)
        console.log(interval)
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
    //
    function processInfo(json){
        console.log(json)
        n = json.price.length
        symbols_array = ["BTC"]
        units_array = ["USD"]
        exchanges_array = ["coinbase"]
        for(i = 0 ; i < n ; i++){
            var symbol_option = document.createElement("option")
            var unit_option = document.createElement("option")
            var exchange_option = document.createElement("option")
            symbol_option.text = json.price[i].symbol 
            unit_option.text = json.price[i].unit
            exchange_option.text = json.price[i].exchange

            if (!symbols_array.includes(symbol_option.text)){
                symbols_array.push(symbol_option.text)
                var select = document.getElementById("symbol");
                select.appendChild(symbol_option) 
            }
                
            if (!units_array.includes(unit_option.text)){
                units_array.push(unit_option.text)
                var select = document.getElementById("unit");
                select.appendChild(unit_option)
            }
         
            if (!exchanges_array.includes(exchange_option.text)){
                exchanges_array.push(exchange_option.text)        
                var select = document.getElementById("exchange");
                select.appendChild(exchange_option); 
            }   
        }

    } 
    //given a reporting period in string, return the start and end time stamps in an array in microseconds
    function getTimeStamp(reporting_period){
        now = new Date()
        timestamps = []
        start_stamp = ""
        end_stamp = ""
        if (reporting_period == "Daily"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate())
            start_stamp = (start_stamp * 1000).toString()
            end_stamp = (Date.now() * 1000).toString()
        }else if(reporting_period == "Weekly"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate() - (now.getDay()));
            start_stamp = (start_stamp* 1000).toString()  
            end_stamp = (Date.now()*1000).toString()
        }else if(reporting_period == "Monthly"){
            start_stamp = new Date(now.getFullYear(),now.getMonth())
            start_stamp = (start_stamp* 1000).toString() 
            end_stamp = (Date.now()*1000).toString()
        }else{

        }
        timestamps.push(start_stamp)
        timestamps.push(end_stamp)

        return timestamps
    }
    //given a parsed DOM reading of the interval in string, return the query string.
    function convertIntervalText(interval){
        intervals = {"5 min." : "5min", "1 hour" : "hour", "1 day" : "day"}
        interval = intervals[interval]
        return interval
    }
    //given the interval in string format, return the milliseconds in integer in order to be converted into dates. 
    function convertIntervalToNumber(interval){
        interval_numbers = {"&interval=5min" : 300 * MILLI, 
            "&interval=hour" : 3600 * MILLI, "&interval=day" : 86400 * MILLI }
        interval_i = interval_numbers[interval]
        return interval_i
    }
    //take in json with  microsecond times and a millisecond interval and create a bunch of date object in json
    function processDates(json,interval_i){ 
        var timeArray = []
        var time = json.data[0]/1000
        for(i = 0 ; i < json.data[2].length ; i++){
            timeArray.push(time)
            time += interval_i
        }
        timeArray = convertUnix(timeArray)
        json.data.push(timeArray)
        return json
    }
    //given a json with prices, and units in string, eliminate zeros, convert the prices to those units and return the json
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
        unit = unit.slice(6,unit.length)
        json.data[2] = json.data[2].map(function(units){return Number(Math.round(units/conversions[unit] + 'e2') + 'e-2').toFixed(2)})
        return json
        }

    //given a json with volumes, and units in string, convert the volumes to those units and return the json
    function processVolume(json,unit){
        unit = unit.slice(6,unit.length)
            json.data[3] = json.data[3].map(function(vol){return Number(Math.round(vol/conversions[unit] + 'e2') + 'e-2')})
            return json
        }
     //given a json block data, eliminate zeros by averaging and return the json   
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
        console.log(new Date(Number(start_stamp.slice(7,start_stamp.length))/1000)) //to validate timestamps in console
        console.log(new Date(Number(end_stamp.slice(5,start_stamp.length))/1000)) // you can validate timestamps in consloe
    }
    //getter for the JSON object
    function getData(){
        return window.apiCall
    }
    //getter for the API url
    function getParameter(){
        return window.parameter
    }
    
    return {
        getPriceAPI: getPriceAPI,
        getBlockAPI: getBlockAPI,
        getData: getData,
        getParameter: getParameter,
        getInfo: getInfo
    } 

}());
