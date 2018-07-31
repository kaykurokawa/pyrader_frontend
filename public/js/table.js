const View = require('./url-models.js');
const URL = require('./url.js');

//Table.addPriceTable(id,coin_data, unit_data, last_price, first_date, last_date, interval, exchange);
function addPriceTable(id,coin,unit,last_price,first_date, last_date,interval,exchange){
    let newRow = document.querySelector("#table-of-prices").insertRow();
    let from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US');
    let to_date = new Date(last_date).toDateString() + " " + new Date(last_date).toLocaleTimeString('en-US');
    exchange = exchange == "" ? "Aggregated" : exchange;
    newRow.setAttribute("id","data-row-" + id);
    newRow.innerHTML = 
        "<td>Price/Volume</td>" + "<td>Price</td>" + "<td>" + coin + "</td>" 
        + "<td>" + exchange + "</td>" + "<td>" + from_date + " to " + to_date + "</td>"
        + "<td>"+ last_price + "</td>" + "<td>" + unit + "</td>"  + "<td>" + interval +"</td>" 
        + "<td class = 'text-center'><span id='remove-row' class = 'glyphicon glyphicon-remove'></span></td>"; 
    document.querySelector("#remove-row").setAttribute("id", "remove" + id);
    document.querySelector("#remove" + id).onclick = function(btn){ 
        let hchart = $('#hchart').highcharts();
        $("#data-row-" + id).remove();
        for(let i = 0 ; i < View.MODELS.length ; i++){
            hchart.get(View.MODELS[i].id + "-axis").update({linkedTo : null});
        }
        hchart.get(id + "-series").remove();
        hchart.get(id + "-axis").remove();
        URL.removeModel(id);
        URL.changeURL();
    }
}

function addVolumeTable(id, coin, unit, last_volume, first_date, last_date, interval, exchange){
    let newRow = document.querySelector("#table-of-prices").insertRow();
    let from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US');
    let to_date = new Date(last_date).toDateString() + " " + new Date(last_date).toLocaleTimeString('en-US');
    exchange = exchange == "" ? "Aggregated" : exchange;
    newRow.setAttribute("id","data-row-" + id);
    newRow.innerHTML = 
        "<td>Price/Volume</td>" + "<td>Volume</td>" + "<td>" + coin + "</td>" 
        + "<td>" + exchange + "</td>" + "<td>" + from_date + " to " + to_date + "</td>"
        + "<td>"+ last_volume + "</td>" + "<td>" + unit +"</td>" + "<td>" + interval +"</td>" 
        + "<td class = 'text-center'><span id='remove-row' class = 'glyphicon glyphicon-remove'></span></td>";
    document.querySelector("#remove-row").setAttribute("id", "remove" + id);
    document.querySelector("#remove" + id).onclick = function(btn){ 
            let hchart = $('#hchart').highcharts();
            $("#data-row-" + id).remove();
            for(let i = 0 ; i < View.MODELS.length ; i++){
                hchart.get(View.MODELS[i].id + "-axis").update({linkedTo : null});
            }
            hchart.get(id + "-series").remove();
            hchart.get(id + "-axis").remove();
            URL.removeModel(id);
            URL.changeURL(); 
    }
}

function addBlockTable(id,coin,datatype,last_block,first_date, last_date,interval){
    var newRow = document.querySelector("#table-of-prices").insertRow();
    from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US');
    to_date = new Date(last_date).toDateString() + " " +  new Date(last_date).toLocaleTimeString('en-US');
    current_block = (last_block).toFixed(4);
    interval = (interval == 0 ? "no averaging" : interval)
    newRow.setAttribute("id","data-row-" + id);
    newRow.innerHTML = 
        "<td>Block</td>" + "<td>" + datatype +"</td>" + "<td>" + coin + "</td>" + "<td>Aggregated</td>"
        + "<td>" + from_date + " to " + to_date + "</td>" + "<td>"+ current_block 
        + "</td>" + "<td>units</td>" +  "<td>" + interval +"</td>" 
        + "<td class = 'text-center'><span id='remove-row' class = 'glyphicon glyphicon-remove'></span></td>"; 
    document.querySelector("#remove-row").setAttribute("id", "remove" + id);
    document.querySelector("#remove" + id).onclick = function(btn){ 
        let hchart = $('#hchart').highcharts(); 
        $("#data-row-" + id).remove();
        for(let i = 0 ; i < View.MODELS.length ; i++){
            hchart.get(View.MODELS[i].id + "-axis").update({linkedTo : null});
        }   
        hchart.get(id + "-series").remove();
        hchart.get(id + "-axis").remove();
        URL.removeModel(id);
        URL.changeURL();
    }
 }

 //if AJAX cannot grab data, display error
 function displayError(){
    document.getElementById("error").innerHTML = "No data for this period";
    document.getElementById("error").className = "well";
 }

/*clear error table*/
 function hideError(){
    document.getElementById("error").innerHTML = ""; 
    document.getElementById("error").classList.remove("well");
 }

 module.exports = 
    {
        addPriceTable : addPriceTable,
        addBlockTable : addBlockTable,
        addVolumeTable : addVolumeTable,
        displayError : displayError,
        hideError: hideError,
    }