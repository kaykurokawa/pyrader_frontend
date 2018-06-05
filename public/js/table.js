const View = require('./url-models.js');
const URL = require('./url.js');

function addPriceTable(id1,id2,coin,unit,last_price,last_volume,first_date, last_date,interval,exchange){
    var newRow1 = document.querySelector("#table-of-prices").insertRow();
    var newRow2 = document.querySelector("#table-of-prices").insertRow();
    var from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US');
    var to_date = new Date(last_date).toDateString() + " " + new Date(last_date).toLocaleTimeString('en-US');
    exchange = exchange == "" ? "Aggregated" : exchange;
    newRow1.setAttribute("id","data-row-" + id1);
    newRow2.setAttribute("id","data-row-" + id2);

    newRow1.innerHTML = 
        "<td>Price/Volume</td>" + "<td>Price</td>" + "<td>" + coin + "</td>" 
        + "<td>" + exchange + "</td>" + "<td>" + from_date + " to " + to_date + "</td>"
        + "<td>"+ last_price + "</td>" + "<td>" + unit + "</td>"  + "<td>" + interval +"</td>" 
        + "<td class = 'text-center'><span id='remove-row1' class = 'glyphicon glyphicon-remove'></span></td>"; 

    newRow2.innerHTML = 
        "<td>Price/Volume</td>" + "<td>Volume</td>" + "<td>" + coin + "</td>" 
        + "<td>" + exchange + "</td>" + "<td>" + from_date + " to " + to_date + "</td>"
        + "<td>"+ last_volume + "</td>" + "<td>" + unit +"</td>" + "<td>" + interval +"</td>" 
        + "<td class = 'text-center'><span id='remove-row2' class = 'glyphicon glyphicon-remove'></span></td>"; 

    document.querySelector("#remove-row1").setAttribute("id", "remove" + id1);
    document.querySelector("#remove-row2").setAttribute("id", "remove" + id2);
    let hchart = $('#hchart').highcharts();

    document.querySelector("#remove" + id1).onclick = function(btn){ 
        let hchart = $('#hchart').highcharts();
        $("#data-row-" + id1).remove();
        console.log(View.MODELS)
        for(let i = 0 ; i < View.MODELS.length ; i++){
            hchart.get(View.MODELS[i].id1 + "-axis").update({linkedTo : null})
        }
        hchart.get(id1 + "-series").remove();
        hchart.get(id1 + "-axis").remove();
        URL.removeModel(id1);
        URL.changeURL();
    }
    
    document.querySelector("#remove" + id2).onclick= function(btn){ 
        let hchart = $('#hchart').highcharts();
        $("#data-row-" + id2).remove();
        for(let i = 0 ; i < View.MODELS.length ; i++){
            if(View.MODELS[i].id2){
                hchart.get(View.MODELS[i].id2 + "-axis").update({linkedTo : null})
            }
        }
        hchart.get(id2 + "-series").remove();
        hchart.get(id2 + "-axis").remove();
        URL.removeModel(id2);
        URL.changeURL();
    }
}

function addBlockTable(id,coin,datatype,last_block,first_date, last_date,interval){
    var newRow1 = document.querySelector("#table-of-prices").insertRow();
    from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US');
    to_date = new Date(last_date).toDateString() + " " +  new Date(last_date).toLocaleTimeString('en-US');
    current_block = (last_block).toFixed(4);
    interval = (interval == 0 ? "no averaging" : interval)
    newRow1.setAttribute("id",id);

    newRow1.innerHTML = "<td>Block</td>" + "<td>" + datatype +"</td>" + "<td>" + coin + "</td>" + "<td>Aggregated</td>"
    + "<td>" + from_date + " to " + to_date + "</td>" + "<td>"+ current_block + "</td>" + "<td>units</td>" 
    +  "<td>" + interval +"</td>" + "<td class = 'text-center'><span id='remove-row1' class = 'glyphicon glyphicon-remove'></span></td>"; 

    document.querySelector("#remove-row1").setAttribute("id", "remove" + id);
    document.querySelector("#remove" + id).onclick= function(btn){
        $("#" + id).remove();
        for(let i = 0 ; i < View.MODELS.length ; i++){
            hchart.get(View.MODELS[i].id1 + "-axis").update({linkedTo : null})
        }
        let hchart = $('#hchart').highcharts();    
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


 module.exports = {addPriceTable : addPriceTable,
                   addBlockTable : addBlockTable,
                    displayError : displayError,
                    hideError: hideError,
                   }