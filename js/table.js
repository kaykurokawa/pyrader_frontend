function addPriceTable(id1,id2,coin,unit,last_price,last_volume,first_date, last_date,interval,exchange){
    var newRow1 = document.querySelector("#table-of-prices").insertRow()
    var newRow2 = document.querySelector("#table-of-prices").insertRow()
    var from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US')
    var to_date = new Date(last_date).toDateString() + " " + new Date(last_date).toLocaleTimeString('en-US')
    newRow1.setAttribute("id","data-row-" + id1)
    newRow2.setAttribute("id","data-row-" + id2)
    newRow1.innerHTML = "<td>Price/Volume</td>" + "<td>Price</td>" + "<td>" + coin + "</td>" + "<td>" + exchange + "</td>" 
    + "<td>" + from_date + " to " + to_date + "</td>"
    + "<td>"+ last_price + "</td>" + "<td>" + unit + "</td>"  + "<td>" + interval +"</td>" + "<td class = 'text-center'><span id='remove-row1' class = 'glyphicon glyphicon-remove'></span></td>" 
    newRow2.innerHTML = "<td>Price/Volume</td>" + "<td>Volume</td>" + "<td>" + coin + "</td>" + "<td>" + exchange + "</td>" 
    + "<td>" + from_date + " to " + to_date + "</td>"
    + "<td>"+ last_volume + "</td>" + "<td>" + unit +"</td>" + "<td>" + interval +"</td>" + "<td class = 'text-center'><span id='remove-row2' class = 'glyphicon glyphicon-remove'></span></td>" 
    document.querySelector("#remove-row1").setAttribute("id", "remove" + id1)
    document.querySelector("#remove-row2").setAttribute("id", "remove" + id2)
    document.querySelector("#remove" + id1).onclick= function(btn){ 
        var hchart = $('#hchart').highcharts();
        $("#data-row-" + id1).remove()
        hchart.get(id1.toString()).remove();
        hchart.get(id1.toString() + "-axis").remove();
    }
    document.querySelector("#remove" + id2).onclick= function(btn){ 
        $("#data-row-" + id2).remove()
        hchart.get(id2.toString()).remove();
        hchart.get(id2.toString() + "-axis").remove();
    }
}

function addBlockTable(id,coin,datatype,last_block,first_date, last_date,interval,exchange){
    var newRow1 = document.querySelector("#table-of-prices").insertRow()
    from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US')
    to_date = new Date(last_date).toDateString() + " " +  new Date(last_date).toLocaleTimeString('en-US')
    current_block = (last_block).toFixed(4)
    newRow1.setAttribute("id",id)
    newRow1.innerHTML = "<td>Block</td>" + "<td>" + datatype +"</td>" + "<td>" + coin + "</td>" + "<td>Aggregated</td>"
    + "<td>" + from_date + " to " + to_date + "</td>"
    + "<td>"+ current_block + "</td>" + "<td>units</td>" +  "<td>" + interval +"</td>" + "<td class = 'text-center'><span id='remove-row1' class = 'glyphicon glyphicon-remove'></span></td>" 
    document.querySelector("#remove-row1").setAttribute("id", "remove" + id)
    document.querySelector("#remove" + id).onclick= function(btn){
        console.log(id) 
        $("#" + id).remove()
        //hchart.get(id).remove()     
        hchart.get(Number.toString(id)).remove()
    }
 }

 function clearTable(){
    /*document.getElementById("error").innerHTML = "No data for this period" 
    document.getElementById("error").className = "well"
    $("#table-of-prices td").remove();
    var row1 = document.getElementById("prices-row1")
    var row2 = document.getElementById("prices-row2")
    var row3 = document.getElementById("prices-row3")
    td1 = document.createElement("td")
    td1.text = "Time Period:"
    td2 = document.createElement("td")
    td2.id = "time-period"
    td3 = document.createElement("td")
    td3.id = "price-label"
    td3.text = "Current Price Data:"
    td4 =  document.createElement("td")
    td4.id = "current-price"
    td5 = document.createElement("td")
    td3.id = "volume-label"
    td5.text = "Current Volume Data:"
    td6 = document.createElement("td")
    td6.id = "current-volume" 
    row1.appendChild(td1)
    row1.appendChild(td2)
    row2.appendChild(td3)
    row2.appendChild(td4) 
    row3.appendChild(td5)
    row3.appendChild(td6)
    $('#hchart').highcharts().destroy();*/
 }


 function showTable(){
    /*document.getElementById("error").innerHTML = "" 
    document.getElementById("error").classList.remove("well");*/
 }

 function clearBlockTable(){
    /*document.getElementById("block-error").innerHTML = "No data for this this period" 
    document.getElementById("block-error").className = "well"
    $("#table-of-blocks td").remove(); 
    var row1 = document.getElementById("block-row1")
    var row2 = document.getElementById("block-row2")
    td1 = document.createElement("td")
    td1.text = "Time Period:"
    td2 = document.createElement("td")
    td2.id = "block-time-period"
    td3 = document.createElement("td")
    td3.id = "current-block-label"
    td3.text = "Current Block Data:"
    td4 =  document.createElement("td")
    td4.id = "current-block"
    row1.appendChild(td1)
    row1.appendChild(td2)
    row2.appendChild(td3)
    row2.appendChild(td4)
    $('#block-hchart').highcharts().destroy();*/
 }

//generate the Highcharts
 function showBlockTable(){
    /*document.getElementById("block-error").innerHTML = "" 
    document.getElementById("block-error").classList.remove("well");*/
 }

 module.exports = {addPriceTable : addPriceTable,
                   addBlockTable : addBlockTable,}