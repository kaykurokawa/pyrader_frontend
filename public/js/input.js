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
        if(View.MODELS.length == 0) seriesID = 1;
        let priceId = seriesID++;
        let volumeId = seriesID++;
        let url_model_price = new View.UrlParam(priceId,"price", symbol, unit, datatype, exchange, interval, 0, 0);
        let url_model_volume = new View.UrlParam(volumeId, "volume", symbol, unit, datatype, exchange, interval, 0, 0);
        View.MODELS.push(url_model_price);
        View.MODELS.push(url_model_volume);
        View.CheckPropTypes();
        return {parameter : parameter, priceId : priceId, volumeId : volumeId, symbol : symbol,
                 unit : unit, exchange: exchange, interval : interval};
    }

    /*reads and converts dropdown and converts it into url and returns it to be passed to Ajax call*/
    function readBlockValues(){
        let symbol = document.getElementById("block-symbol").value;
        let datatype = document.getElementById("block-datatype").value;
        let interval = document.getElementById("block-interval").value; 
        interval = (interval == "None" ? "" : interval); 
        interval = (interval == "No Averaging" ? "0" : interval);  
        let p_interval = '&interval=' + interval;
        let p_symbol = '&coin=' + symbol; 
        let p_datatype = '&datatype=' + datatype; 
        let parameter = constants.REST_URL + '/block?' + p_symbol +  p_datatype + p_interval;
        /*reset id's to 1 if MODEL is empty*/
        if(View.MODELS.length == 0) seriesID = 1;
        let id =  seriesID++;
        let type = "block";
        let url_model = new View.UrlParam(id, "block", symbol, "", datatype, "", interval, 0, 0);
        View.MODELS.push(url_model);
        URL.changeURL();
        View.CheckPropTypes();
        return {parameter : parameter, blockId : id, symbol : symbol, datatype : datatype, interval : interval};
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
        return decodeURIComponent(results[2].replace(/\+/g, " ").replace("/",""));
    }
    
    /*convert a url to a Model*/
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
                let start = getParameterByName("start", current);
                start = (start == null ? 0 : Number(start));
                let end = getParameterByName("end", current);
                end = (end == null ? 0 : Number(end));
                if(View.MODELS.length == 0) seriesID = 1;  
                let priceId = seriesID++;
                let volumeId = seriesID++;
                let url_model_price = new View.UrlParam(priceId, "price", symbol, unit, "none", exchange, interval, start, end);
                let url_model_vol = new View.UrlParam(volumeId, "volume", symbol, unit, "none", exchange, interval, start, end);
                View.MODELS.push(url_model_price);
                View.MODELS.push(url_model_vol);         
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
                let start = getParameterByName("start", current);
                start = (start == null ? 0 : Number(start));
                let end = getParameterByName("end", current);
                end = (end == null ? 0 : Number(end));
                if(View.MODELS.length == 0) seriesID = 1;
                let id = seriesID++;
                url_model = new View.UrlParam(id,"block", symbol, "none", datatype, "Aggregated", interval, start, end); 
                View.MODELS.push(url_model);
               
            }
        }
        View.CheckPropTypes();
    }

    /*given a model, convert it to usable parameters*/
    function convertModelToParameter(model){
        if(model.type === "price" || model.type === "volume"){
            let symbol = model.symbol;
            let unit = model.unit;
            let exchange = model.exchange;
            let interval = model.interval;
            let start = model.start;
            let end = model.end;
            let p_symbol = "symbol=" + symbol;
            let p_unit = (unit == "" ? "" : "&unit=" + unit);
            let p_exchange = (exchange == "" ? "" : "&exchange=" + exchange);
            let p_interval = (interval == "" ? "" : "&interval=" + interval);
            let p_start = (!start ? "" : "&start=" + start);
            let p_end = (!end ?  "" : "&end=" + end);
            let parameter = constants.REST_URL + "/price?" + p_symbol + p_unit + p_interval + p_exchange //+ p_start + p_end;
            let id = model.id;
            let type = model.type
            return {parameter : parameter, id : id, symbol : symbol, unit : unit, exchange : exchange, interval : interval, 
                    start : start, end : end, type : type};
        }

        if(model.type === "block"){
            let symbol = model.symbol;
            let interval = model.interval;
            let datatype = model.datatype;
            let start = model.start;
            let end = model.end;
            let p_symbol = "?coin=" + symbol;
            let p_interval = "&interval=" + interval;
            let p_datatype =  "&datatype=" + datatype;
            let p_start = (!start ? "" : "&start=" +  start);
            let p_end = (!end ? "" : "&end=" + end);
            let parameter = constants.REST_URL + '/block' + p_symbol + p_datatype + p_interval //+ p_start + p_end;
            let id = model.id;
            let type = model.type
            return {parameter : parameter, id : id, symbol : symbol, datatype : datatype, interval : interval,start : start, end : end, type : type};       
        }
    } 

    /*call API and Generate the Price and Volume graphs for a single url*/

    function getPriceAPI(obj){
        var parameter = obj.parameter;
        var priceId = obj.priceId;
        var volumeId = obj.volumeId;
        var symbol = obj.symbol;
        var unit = obj.unit;
        var exchange = obj.exchange;
        exchange === "" ? exchange = "Aggregated" : exchange
        var interval = obj.interval;
        validateParameters(parameter)

        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
                console.error('Looks like there was a problem. Status Code: ' + response.status);
                Table.displayError();
                //delete from the view.models
                for(let i = 0 ; i < MODELS.length; i++){
                    if(MODELS[i].id === id){
                        MODELS.splice(i,1);
                    }
                }
                //then change the url
                URL.changeURL();
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
                    URL.changeURL();
                     //Here you will pass data to whatever Graphing library asynchronosly
                    Table.addPriceTable(priceId, coin_data, unit_data, last_price, last_volume, first_date, last_date, interval, exchange);
                    Table.addVolumeTable(volumeId, coin_data, unit_data, last_volume, first_date, last_date, interval, exchange);  
                    High.addPriceGraph(priceId, coin_data, unit_data, x, y_prices, first_date, last_date);
                    High.addVolumeGraph(volumeId, coin_data, unit_data, x, y_volume, first_date, last_date);
                    return true;
                });
                }
            )
                .catch(function(err) {
                    console.error('Fetch Error :-S', err);
                    Table.displayError();
                    return false;   
                });
    }

    /*Call the API and generate graph for Block data for a single url*/
    function getBlockAPI(obj){    
        var parameter = obj.parameter;
        var id = obj.blockId;
        var symbol = obj.symbol;
        var datatype = obj.datatype;
        var interval = obj.interval;

        validateParameters(parameter)

        fetch(parameter)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                Table.displayError();
                //delete is from the view.models
                for(let i = 0 ; i < MODELS.length; i++){
                    if(MODELS[i].id == id){
                        MODELS.splice(i,1);
                    }
                }
                //then change the url
                URL.changeURL();
                return;
                }
                response.json().then(function(data) {
                    Table.hideError();
              
                    let interval_i = data.interval/1000;
                    let plottype = data.plottype;
                    if(plottype == "scatter"){
                        var x = data.x.map(function(x){return x = x/1000 }).sort();
                        var y = data.y;

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
                        High.addScatterPlot(id,coin_data,datatype_data,x,y, first_date, last_date);
                        Table.addBlockTable(id,coin_data,datatype_data,last_datatype,first_date, last_date, interval);
                    }else{
                        High.addBlockGraph(id,coin_data,datatype_data,x,y, first_date, last_date);
                        Table.addBlockTable(id,coin_data,datatype_data,last_datatype,first_date, last_date, interval);
                    }
                    URL.changeURL();
                });
                }
            )
                .catch(function(err) {
                    Table.displayError();
                    console.error('Fetch Error :-S', err);

                });
    }
        /*get the min and max queries from a url (timestamps)*/
        function getMinMax(url){
            let min = getParameterByName("min", url)
            let max = getParameterByName("max", url)  
            min = (min == null ? 0 : min)
            max = (max == null ? 0 : max)
            return [min,max]
        }

    /*fetch data for a url*/
    function getPromise(url){
        return fetch(url).then(response => {
            return response.json()
        })
        .catch(error => {
            Table.displayError();
            console.error('Fetch Error :-S', error)
        });
    }

    /* collect all urls, and fetch data for all them and then render tables and graphs params are made of array of converted models*/
    /* price - {parameter : parameter, id : id, symbol : symbol, unit : unit, exchange : exchange, interval : interval, 
        start : start, end : end, type : type};
        block- {parameter : parameter, id : id, symbol : symbol, datatype : datatype, interval : interval,start : start, end : end, type : type};*/       

    function getAllAPI(params){
        let url_arr = []
        for(let i = 0 ; i < params.length ; i++){
            url_arr.push(params[i].parameter)
        }
        validateParameters(url_arr);
        let all_promises = url_arr.map(getPromise);
        Promise.all(all_promises).then(all => {
            Table.hideError();
            let min = getMinMax(URL.getURL())[0]/1000;
            let max = getMinMax(URL.getURL())[1]/1000;
            
            for(let i = 0 ; i < all_promises.length ; i++){
                if(params[i].type === "price" || params[i].type === "block"){
                    let id = params[i].id;
                    let symbol = params[i].symbol;
                    let unit = params[i].unit;
                    let exchange = params[i].exchange;
                    if(exchange == "") exchange = "Aggregated";
                    let interval = params[i].interval;
                    let start = params[i].start/1000;
                    let end = params[i].end/1000;
                    let interval_i = all[i].interval/1000;
                    let x = processDates(all[i],interval_i);
                    let y_prices = processPrices(all[i],unit);
                    let y_volume = processVolume(all[i],unit);
                    let coin_data = all[i].symbol;
                    let unit_data = all[i].unit;
                    let last_price = y_prices[y_prices.length-1];
                    let last_volume = y_volume[y_volume.length-1];
                    let first_date = !start ? x[0] : start;
                    let last_date = !end ? x[x.length-1] : end;
                    validateTimeStamps(symbol, first_date, last_date);
                    //Here you will pass data to whatever Graphing library asynchronosly
                    if(params[i] === "price"){
                        Table.addPriceTable(id, coin_data, unit_data, last_price, first_date, last_date, interval, exchange);
                        High.addPriceGraph(id, coin_data, unit_data, x, y_prices, first_date, last_date, min, max);
                    }
                    else{
                        Table.addVolumeTable(id, coin_data, unit_data, last_volume, first_date, last_date, interval, exchange);      
                        High.addVolumeGraph(id, coin_data, unit_data, x, y_volume, first_date, last_date, min, max);
                    }
                }
                if(params[i][params[i].length-1] === "block"){
                    let id = params[i].id;
                    let symbol = params[i].symbol;
                    let datatype = params[i].datatype;
                    let interval = params[i].interval;
                    let start = params[i].start/1000;
                    let end = params[i].end/1000;
                    let interval_i = all[i].interval/1000;
                    let plottype = all[i].plottype;
    
                    if(plottype == "scatter"){
                        var x = all[i].x.map(function(x){return x = x/1000 }).sort();
                        var y = all[i].y;
                    }else{
                         var x = processDates(all[i],interval_i);
                         var y = processData(all[i],interval_i);
                    }
    
                    let coin_data = all[i].coin;
                    let datatype_data = all[i].datatype;
                    let first_date = !start ? x[0] : start;
                    let last_date = !end ? x[x.length-1] : end;
                    let last_datatype = all[i].y[y.length-1];
                    validateTimeStamps(symbol, first_date, last_date)
                    //Here you will pass data to whatever Graphing library asynchronosly
                    if(plottype == "scatter"){
                        Table.addBlockTable(id,coin_data,datatype_data,last_datatype,first_date, last_date, interval);
                        High.addScatterPlot(id,coin_data,datatype_data,x,y, first_date, last_date, min, max);
                    }else{
                        Table.addBlockTable(id,coin_data,datatype_data,last_datatype,first_date, last_date, interval);
                        High.addBlockGraph(id,coin_data,datatype_data,x,y, first_date, last_date, min, max);
                    }
                }
            }    
        }
        ).catch(error => {
            Table.displayError();
            console.error('Fetch Error :-S', error);
        })
    }
    

    /*given a reporting period in string, return the start and end time stamps in an array in microseconds*/
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

    /*given the interval in string format, return the milliseconds in integer in order to be converted into dates.*/ 
    function convertIntervalToNumber(interval){
        interval_numbers = {"5min" : 300 * constants.MILLI, 
            "hour" : 3600 * constants.MILLI, "day" : 86400 * constants.MILLI };
        interval_i = interval_numbers[interval];
        return interval_i;
    }
    /*take in json with  microsecond times and append to json the array of millisecond time stamps*/
    function processDates(json,interval_i){ 
         milliArray = [];
         time = json.x1/1000;
        for(i = 0 ; i < json.y.length ; i++){
            milliArray.push(time);
            time += interval_i;
        }
        return milliArray.sort();
    }

    function round(value, precision) {
        multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    /*given a json with prices, and units in string, eliminate zeros, convert the prices to those units and return an array of prices*/
    function processPrices(json,unit){
        for(i = 0 ; i < json.y.length ; i++){
            if(json.y[i] === 0 && i === 0){
                j = 0;
                while(json.y[j] === 0){j++ }
                json.y[0] = json.y[j];
            }else if(json.y[i] === 0){
                json.y[i] = json.y[i-1];
            }else{
                continue;
            }
        }

        pricesArray = [];
        /*if you divide your data by the conversion and it is less than 1 (ie. Comparing DOGE to units of BTC) give me 8 decimals*/
        if(json.y[0]/constants.conversions[unit] < 1){
            json.y = json.y.map(units => {return round(units/constants.conversions[unit],8)});
        }else{
            json.y = json.y.map(units => {return round(units/constants.conversions[unit],2)});
        }
        return json.y;
        }

    /*given a json with volumes,convert the volumes to those units.*/
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
        
    /*given a unix timestamp in milliseconds, convert that to a date object*/
    function convertUnix(data){
          function unixToReg(time){
            return new Date(time);
          }
          return data.map(function(time){return unixToReg(time)});
    }

    /*print out the API call URL and the exact time stamps you called for debugging*/
    function validateParameters(parameter){
        console.log(parameter)

    }

    /*display timestamps in console so the user may inspect them*/
    function validateTimeStamps(name,start,end){
        if(Number(start) || Number(end) == 0){
            console.log(name + " has no start or end time stamps requested")
        }else{        
            console.log(name + " " +  new Date(Number(start.slice(7,start.length))/1000)) //to validate timestamps in console
            console.log(name + " " + new Date(Number(end.slice(5,end.length))/1000)) // you can validate timestamps in consloe}
        }
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
        getAllAPI : getAllAPI
    }