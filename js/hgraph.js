

//Create Highcharts for price/volume
function drawPriceHeader(coin,unit,last_price,last_volume,first_date, last_date){

    from_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US')
    to_date = new Date(last_date).toDateString() + " " + new Date(last_date).toLocaleTimeString('en-US')
    document.getElementById("time-period").innerHTML =  from_date + " to " + to_date 
    document.getElementById("current-price").innerHTML =  coin + ": " + last_price + " " + unit
    document.getElementById("current-volume").innerHTML = coin + ": " + last_volume + " " + unit
}

function drawPriceVolumeGraph(coin,unit,x,y_prices,y_volume){
    Highcharts.setOptions({global:{useUTC: false}});

    volume = []
    prices = []
    // set the allowed units for data grouping
    groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]]

    for(i = 0 ; i < x.length ; i++){
        prices.push([x[i], y_prices[i]])
        volume.push([x[i], y_volume[i]])
    }


    minimum = Math.min.apply(null, y_prices)
    title = coin + " Charts"
    y_axis1 = "Price of " + coin + " in " + unit
    y_axis2 = "Volume of " + coin + " in " + unit

    // create the chart
    hchart = Highcharts.stockChart('hchart', {

    rangeSelector: {
        selected: 1
    },

    yAxis: [{
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text:  y_axis1
        },
        height: '60%',
        lineWidth: 2,
        //floor: minimum,
        type: 'logarithmic',
        minorTickInterval: 0.1,
        resize: {
            enabled: true
        }
    }, {
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: y_axis2
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
    }],

    tooltip: {
        split: true,
        //valueDecimals: 2
    },

    series: [{
        type: 'area',
        name: 'Cryptocurrency',
        data: prices,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    }]
    });
 }

 function drawBlockHeader(coin,datatype,last_block,first_date, last_date){
    to_date = new Date(first_date).toDateString() + " " + new Date(first_date).toLocaleTimeString('en-US')
    from_date = new Date(last_date).toDateString() + " " +  new Date(last_date).toLocaleTimeString('en-US')
    current_block = last_block
    document.getElementById("block-time-period").innerHTML =  from_date  + " to " + to_date
    document.getElementById("current-block").innerHTML = datatype + " for " + coin + " " + current_block
    document.getElementById("current-block-label").innerHTML = "current "+ datatype + ": "
 }
//Create Highcharts for block
 function drawBlockGraph(coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }
    minimum = Math.min.apply(null,y)

    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin


       // create the chart
    Highcharts.stockChart('block-hchart', {
                rangeSelector: {
                    selected: 1
                },
        
                title: {
                    text: title
                },
        
                series: [{
                    name: y_axis,
                    data: block_data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
 }

 function drawScatterPlot(coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }
    console.log(block_data)
    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin
    console.log("here")
    Highcharts.stockChart('block-hchart', {
                rangeSelector: {
                    selected: 2
                },
        
                title: {
                    text: title
                },
                tooltip: {
                    formatter: function () {
                        return Highcharts.dateFormat('%B %e, %Y %H:%M', this.x) + '<br/>' + 
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                series: [{
                    type: 'scatter',
                    name: y_axis,
                    data: block_data,
                    marker: {
                        enabled: true,
                        radius: 5
                    },
                    tooltip: {
                        valueDecimals: 2
                    },
                }]
            });
 }

//clear Highcharts and all the HTML associated with it

 function clearCharts(){
    document.getElementById("error").innerHTML = "No data for this period" 
    document.getElementById("error").className = "well"
    $("#table-of-prices tr").remove(); 
    $('#hchart').highcharts().destroy();

 }

//generate the Highcharts
 function showCharts(){
    document.getElementById("error").innerHTML = "" 
    document.getElementById("error").classList.remove("well");
 }

 function clearBlockCharts(){
    document.getElementById("block-error").innerHTML = "No data for this this period" 
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
    $('#block-hchart').highcharts().destroy();
 }

//generate the Highcharts
 function showBlockCharts(){
    document.getElementById("block-error").innerHTML = "" 
    document.getElementById("block-error").classList.remove("well");
 }

module.exports = {
    drawPriceVolumeGraph : drawPriceVolumeGraph,
    showCharts : showCharts,
    clearCharts : clearCharts,
    drawBlockGraph : drawBlockGraph,
    showBlockCharts : showBlockCharts,
    clearBlockCharts : clearBlockCharts,
    drawPriceHeader: drawPriceHeader,
    drawBlockHeader: drawBlockHeader,
    drawScatterPlot : drawScatterPlot,
  }
  
