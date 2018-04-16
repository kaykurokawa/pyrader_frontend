    const High = require('./hgraph.js');
    const constants = require('./constants.js');
    const View = require('./url-models.js');
    const URL = require('./url.js');
    const Table = require('./table.js');
    var seriesID = 1; //global to keep track of which series is what. If ever  MODEL becomes blank maybe set it back to 0

     /*reads dropdown and converts it into url and returns it to be passed to Ajax call. 
        Also save params into model and changes the url*/
    function readPricesValues(){
        let exchange = document.getElementById("exchange").value;
        exchange = exchange == "Aggregated" ? "" : exchange;
        let symbol = document.getElementById("symbol").value;
        let unit = document.getElementById("unit").value;
        let interval =  document.getElementById("interval").value;
        interval = (interval == "None" ? "" : interval);
        datatype = "";
        let p_exchange = (exchange == "" ? "" : '&exchange=' + exchange);
        let p_interval = (interval == "" ? "" : '&interval=' + interval);
        let p_unit = '&unit=' + unit;
        let p_symbol = 'symbol=' + symbol;
        let parameter = constants.REST_URL + '/price?' + p_symbol + p_unit + p_exchange + p_interval;
        if(View.MODELS.length == 0) seriesID = 1  
        let id1 = seriesID++;
        let id2 = seriesID++;
        let url_model = new View.UrlParam(id1, id2, "price", symbol, unit, datatype, exchange, interval);
        View.MODELS.push(url_model);
        URL.changeURL();
        validateParamtersConsole(parameter);
        return [parameter, id1, id2, symbol, unit, exchange, interval];
    }

    //reads and converts dropdown and converts it into url and returns it to be passed to Ajax call
    function readBlockValues(){
        let symbol = document.getElementById("block-symbol").value;
        let datatype = document.getElementById("block-datatype").value;
        let interval = document.getElementById("block-interval").value; 
        interval = (interval == "None" ? "" : interval);  
        let p_interval = (exchange == "" ? "" : '&interval=' + interval);
        let p_symbol = '&coin=' + symbol; 
        let p_datatype = '&datatype=' + datatype; 
        let parameter = constants.REST_URL + '/block?' + p_symbol +  p_datatype + p_interval;
        /*reset id's to 1 if MODEL is empty*/
        if(View.MODELS.length == 0) seriesID = 1;
        let id1 =  seriesID++;
        let id2 = "";
        let url_model = new View.UrlParam(id1, id2, "block", symbol, "", datatype, "Aggregated", interval);
        View.MODELS.push(url_model);
        URL.changeURL();
        validateParamtersConsole(parameter);
        return [parameter,id1, symbol, datatype, interval];
    }

    /*function that parses the url by interval, units, symbol... or whatever name, if that name doesn't exist
    then return null*/
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    //convert a url to a Model
    function convertToModel(url){
       
        url = url.split("?");

        for(let i = 1 ; i < url.length ; i++){
            current = url[i];
            
            if(current.includes("price")){
                let symbol =  getParameterByName("symbol", current);
                symbol = (symbol == null ? "" : symbol); 
                let unit = getParameterByName("unit", current);
                unit = unit == null ? "" : unit;
                let exchange = getParameterByName("exchange", current);
                exchange  = (exchange == "Aggregated" ? "" : exchange);
                exchange = (exchange == null ? "" : exchange);
                let interval = getParameterByName("interval", current);
                interval = (interval == "None" ? "" : interval);
                interval = (interval == null ? "" : interval);
                interval = interval.replace(/\//g,'');
                if(View.MODELS.length == 0) seriesID = 1  
                let id1 = seriesID++;
                let id2 = seriesID++;
                let urlparam = new View.UrlParam(id1, id2, "price", symbol, unit, "none", exchange, interval); 
                View.MODELS.push(urlparam);
            }

            if(current.includes("block")){
                let symbol = getParameterByName("coin",current);
                symbol = (symbol == null ? "" : symbol);
                let interval =  getParameterByName("interval", current);
                interval = (interval == "None" ? "" : interval);
                interval = (interval == null ? "" : interval);
                interval = interval.replace(/\//g,'');
                let datatype =  getParameterByName("datatype",current);
                datatype = (datatype == null ? "" : datatype);
                if(View.MODELS.length == 0) seriesID = 1;
                let id1 = seriesID++;
                let id2 = "none";
                urlparam = new View.UrlParam(id1,id2,"block", symbol, "none", datatype, "Aggregated", interval); 
                View.MODELS.push(urlparam);
            }
        }
    }

    /*given a model, convert it to usable parameters*/
    function convertModelToParameter(model){
        if(model.type == "price"){
            let symbol = model.symbol;
            let unit = model.unit;
            let exchange = model.exchange;
            let interval = model.interval;
            symbol = model.symbol;
            let p_symbol = "symbol=" + model.symbol;
            let p_unit = model.unit == "" ? "" : "&unit=" + model.unit;
            let p_exchange = model.exchange == "" ? "" : "&exchange=" + model.exchange;
            let p_interval = model.interval == "" ? "" : "&interval=" + model.interval;
            let parameter = constants.REST_URL + "/price?" + p_symbol + p_unit + p_interval + p_exchange;
            let id1 = model.id1;
            let id2 = model.id2;
            return [parameter, id1, id2, symbol, unit, exchange, interval];
        }

        if(model.type == "block"){
            let symbol = model.symbol;
            let interval = model.interval;
            let datatype = model.datatype;
            let p_symbol = "?coin=" + model.symbol;
            let p_interval = "&interval=" + model.interval;
            let p_datatype =  "&datatype=" + model.datatype;
            let parameter = constants.REST_URL + '/block' + p_symbol + p_datatype + p_interval; 
            let id = model.id1;
            return [parameter, id, symbol, datatype, interval];       
        }

    } 

    //call API and Generate the Price and Volume graphs
    function getPriceAPI(arr){
        var parameter = arr[0];
        var id1 = arr[1];
        var id2 = arr[2];
        var symbol = arr[3];
        if(exchange == "") exchange = "Aggregated";
        var unit = arr[4];
        var exchange = arr[5];
        var interval = arr[6];
        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                Table.displayError();
                return false;
                }
                response.json().then(function(data) {
                    Table.hideError();
                    let interval_i = data.interval/1000;
                    let x = processDates(data,interval_i);
                    let y_prices = processPrices(data,unit);
                    let y_volume = processVolume(data,unit);
                    window.apiCall = data;
                    let coin_data = data.symbol;
                    let unit_data = data.unit;
                    let last_price = y_prices[y_prices.length-1];
                    let last_volume = y_volume[y_volume.length-1];
                    let first_date = x[0];
                    let last_date = x[x.length-1];
            
                     //Here you will pass data to whatever Graphing library asynchronosly
                     //add data to price volume
                     
                        Table.addPriceTable(id1,id2,coin_data,unit_data,last_price,last_volume,first_date, last_date, interval, exchange);
                        High.addPriceVolumeGraph(id1,id2,coin_data,unit_data,x,y_prices,y_volume);
                        return true;
                });
                }
            )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    Table.displayError();
                    return false;   
                });
    }
    //Call the API and generate graph for Block data
    function getBlockAPI(arr){    
        var parameter = arr[0];
        var id = arr[1];
        var symbol = arr[2];
        var datatype = arr[3];
        var interval = arr[4];  
        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                Table.displayError();
                return;
                }
                response.json().then(function(data) {
                    Table.hideError();
                    let interval_i = data.interval/1000;
                    let plottype = data.plottype;
                    if(plottype == "scatter"){
                        var x = data.x.map(function(x){return x = x/1000 });
                        var y = data.y

                    }else{
                         var x = processDates(data,interval_i);
                         var y = processData(data);
                    }
                    let coin_data = data.coin;
                    let datatype_data = data.datatype;
                    let first_date = x[0];
                    let last_date = x[x.length-1];
                    let last_datatype = data.y[y.length-1];

                    //Here you will pass data to whatever Graphing library asynchronosly
                    if(plottype == "scatter"){
                        High.addScatterPlot(id,coin_data,datatype_data,x,y);
                        Table.addBlockTable(id,coin_data,datatype_data,last_datatype,first_date, last_date, interval, exchange);
                    }else{
                        High.addBlockGraph(id,coin_data,datatype_data,x,y);
                        Table.addBlockTable(id,coin_data,datatype_data,last_datatype,first_date, last_date, interval, exchange);
                    }
                });
                }
            )
                .catch(function(err) {
                    Table.displayError();
                    console.log('Fetch Error :-S', err);

                });
    }

    //given a reporting period in string, return the start and end time stamps in an array in microseconds
    function getTimeStamp(reporting_period){
        var now = new Date();
        var timestamps = [];
        var start_stamp = "";
        var end_stamp = "";
        if (reporting_period == "Day"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate());
            start_stamp = (start_stamp * 1000).toString();
            end_stamp = ((Date.now() - 300 * constants.MILLI) * 1000).toString(); // subtract 300 milli because API has trouble getting the latest timestamp
        }else if(reporting_period == "Week"){
            start_stamp = new Date(now.getFullYear(),now.getMonth(),now.getDate() - (now.getDay()));
            start_stamp = (start_stamp* 1000).toString();  
            end_stamp = ((Date.now() - 300 * constants.MILLI) * 1000).toString(); //same as above
        }else if(reporting_period == "Month"){
            start_stamp = new Date(now.getFullYear(),now.getMonth());
            start_stamp = (start_stamp* 1000).toString(); 
            end_stamp = ((Date.now() - 300 * constants.MILLI) * 1000).toString(); //same as above
        }else{

        }
        timestamps.push(start_stamp);
        timestamps.push(end_stamp);
        return timestamps;
    }

    //given the interval in string format, return the milliseconds in integer in order to be converted into dates. 
    function convertIntervalToNumber(interval){
        interval_numbers = {"5min" : 300 * constants.MILLI, 
            "hour" : 3600 * constants.MILLI, "day" : 86400 * constants.MILLI };
        interval_i = interval_numbers[interval];
        return interval_i;
    }
    //take in json with  microsecond times and append to json the array of millisecond time stamps
    function processDates(json,interval_i){ 
         milliArray = [];
         time = json.x1/1000;
        for(i = 0 ; i < json.y.length ; i++){
            milliArray.push(time);
            time += interval_i;
        }
        return milliArray;
    }

    function round(value, precision) {
        multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    //given a json with prices, and units in string, eliminate zeros, convert the prices to those units and return an array of prices
    function processPrices(json,unit){
        for(i = 0 ; i < json.y.length ; i++){
            if(json.y[i] == 0){
                json.y[i] = json.y[i-1];
            }else if(json.y[i] == 0 && i == 0){
                j = 0;
                while(json.y[j] == 0){j++ }
                json.y[0] = json.y[j];
            }else{
                continue;
            }
        }
        pricesArray = [];
        //if you divide your data by the conversion and it is less than 1 (ie. Comparing DOGE to units of BTC) give me 8 decimals
        if(json.y[0]/constants.conversions[unit] < 1){
            json.y = json.y.map(function(units){return round(units/constants.conversions[unit],8)});
        }else{
            json.y = json.y.map(function(units){return round(units/constants.conversions[unit],2)});
        }
        return json.y;
        }

    //given a json with volumes,convert the volumes to those units.
    function processVolume(json,unit){
        json.w = json.w.map(function(vol){return round(vol/constants.conversions[unit],2)});
        return json.w;
        }
     /*given a json block data for a line graph, 
     if the graph is majority 0's then graph as is. 
     if the graph has zeros/falsy/NaN  holes then
     eliminate zeros/falsy/NaN  by reaching out and grabbing the previous values*/
    
    function processData(json){
        var count = 0;
        var holes = true;
        for(let i = 0 ; i < json.y.length ; i++){
            if(json.y[i] == 0 ){
                count++;
            }
        }
        if((count/(json.y.length)) > 0.6){
            holes = false;
            return json.y
        }
        
        if(holes){
            for(let i = 0 ; i < json.y.length ; i++){
                if(!json.y[i] && i == 0){
                    j = 0;
                    while(!json.y[j]){j++; }
                        json.y[0] = json.y[j];
                }else if(!json.y[i]){
                    json.y[i] = json.y[i-1];
                }else{
                    continue;
                }
            }
                    return json.y;
        }
    }
        
    //given a unix timestamp in milliseconds, convert that to a date object
    function convertUnix(data){
          function unixToReg(time){
            return new Date(time);
          }
          return data.map(function(time){return unixToReg(time)});
    }

    //print out the API call URL and the exact time stamps you called for debugging.
    function validateParamtersConsole(parameter){
        /*if(Number(start_stamp) || Number(end_stamp) == 0){
            console.log("No start or end time stamps requested")
        }else{        
            console.log(new Date(Number(start_stamp.slice(7,start_stamp.length))/1000)) //to validate timestamps in console
            console.log(new Date(Number(end_stamp.slice(5,start_stamp.length))/1000)) // you can validate timestamps in consloe}
        }*/
    }

    module.exports = {
        getPriceAPI : getPriceAPI,
        getBlockAPI : getBlockAPI,
        readPricesValues : readPricesValues,
        readBlockValues : readBlockValues,
        round : round,
        processDates : processDates,
        processPrices : processPrices,
        processVolume : processVolume,
        processData : processData,
        getParameterByName : getParameterByName,
        convertToModel : convertToModel,
        convertModelToParameter : convertModelToParameter,
    }