import { conversions, REST_URL } from '../constants.js';
export const ADD_ROW = 'ADD_ROW'
export const REMOVE_ROW = 'REMOVE_ROW'
export { handleDeleteRow, handleAddRow}


var id = 0

function addRow(row){
    return {
        type: ADD_ROW,
        row,
    }
}

function removeRow(id){
    return {
        type: REMOVE_ROW,
        id,
    }
}


function generateId () {
    return id++;
}

/*take in json with  microsecond times and append to json the array of millisecond time stamps*/
function processDates(json,interval_i){ 
    let milliArray = [];
    let time = json.x1/1000;
    for(let i = 0 ; i < json.y.length ; i++){
        milliArray.push(time);
        time += interval_i;
    }
    return milliArray.sort();
}


/*given a json with prices, and units in string, eliminate zeros, convert the prices to those units and return an array of prices*/
function processPrices(json,unit){
    for(let i = 0 ; i < json.y.length ; i++){
        if(json.y[i] === 0 && i === 0){
            let j = 0;
            while(json.y[j] === 0){j++ }
            json.y[0] = json.y[j];
        }else if(json.y[i] === 0){
            json.y[i] = json.y[i-1];
        }else{
            continue;
        }
    }

    let pricesArray = [];
    /*if you divide your data by the conversion and it is less than 1 (ie. Comparing DOGE to units of BTC) give me 8 decimals*/
    if(json.y[0]/conversions[unit] < 1){
        json.y = json.y.map(units => {return round(units/conversions[unit],8)});
    }else{
        json.y = json.y.map(units => {return round(units/conversions[unit],2)});
    }
    return json.y;
    }

function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

/*given a json with volumes,convert the volumes to those units.*/
function processVolume(json,unit){
    json.w = json.w.map(function(vol){return round(vol/conversions[unit],2)});
    return json.w;
}

function callApi(type, symbol, unit, datatype, exchange, interval){
    exchange = exchange === "Aggregated" ? "" : exchange;
    interval = (interval === "None" ? "" : interval);
    interval = (interval === "No Averaging" ? "0" : interval);  
    let p_exchange = (exchange === "" ? "" : '&exchange=' + exchange);
    let p_interval = (interval === "" ? "" : '&interval=' + interval);
    let p_unit = '&unit=' + unit;
    let parameter = ""
    if(type === "price" || type === "volume"){
        let p_symbol = 'symbol=' + symbol;
        parameter = REST_URL + '/price?' + p_symbol + p_unit + p_exchange + p_interval;
    }else{
        let p_symbol = '&coin=' + symbol;
        let p_datatype = '&datatype=' + datatype;  
        parameter = REST_URL + '/block?' + p_symbol +  p_datatype + p_interval;
    }

    return parameter
}

     /*given a json block data for a line graph, 
     if the graph is majority 0's then graph as is. 
     if the graph has zeros/falsy/NaN  holes then
     eliminate zeros/falsy/NaN  by reaching out and grabbing the previous values*/
    
     function processData(json){
        var count = 0;
        var holes = true;
        for(let i = 0 ; i < json.y.length ; i++){
            if(json.y[i] === 0 ){
                count++;
            }
        }
        if((count/(json.y.length)) > 0.6){
            holes = false;
            return json.y
        }
        
        if(holes){
            for(let i = 0 ; i < json.y.length ; i++){
                if(!json.y[i] && i === 0){
                    let j = 0;
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

function handleDeleteRow(id){
    return removeRow(id)
}

function handleAddRow(type,symbol,unit,datatype,exchange,interval,start,end){
    let url = callApi(type,symbol,unit,datatype,exchange,interval)
    
    return function(dispatch){
        return fetch(url).then((res) => res.json().then((data) => {
            let interval_i = (data.interval/1000);
            let x = processDates(data,interval_i);
            let y = [];
            let coin_data =  "";
            if(type === "volume"){
                y = processVolume(data,unit);
                coin_data = data.symbol;
            }
            if(type === "price"){
                y = processPrices(data,unit);
                coin_data = data.symbol;
            } 
            if(type ==="block"){
                y = processData(data)
                coin_data = data.coin;
            }
            let unit_data = data.unit;
            let last_price = y[y.length-1];
            let first_date = x[0];
            let last_date = x[x.length-1];
            let row = {id: generateId(),
                    type: type,
                    symbol: coin_data,
                    unit: unit_data,
                    datatype: datatype,
                    exchange: exchange,
                    interval: interval,
                    x: x,
                    y: y,
                    last_data: last_price,
                    first_date: first_date,
                    last_date: last_date,
                    start: start,
                    end: end,
            }
            dispatch(addRow(row))
        }
        )).catch(function(err) {
            console.error('Fetch Error :-S', err);
            return false;   
        });
    }
}
