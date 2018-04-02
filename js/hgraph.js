
//Create Highcharts for price/volume

function addPriceVolumeGraph(id1,id2,coin,unit,x,y_prices,y_volume){
    volume = []
    prices = []
    for(i = 0 ; i < x.length ; i++){
        prices.push([x[i], y_prices[i]])
        volume.push([x[i], y_volume[i]])
    }
    minimum = Math.min.apply(null, y_prices)
    title = coin + " Charts"
    y_axis1 = "Price of " + coin + " in " + unit
    y_axis2 = "Volume of " + coin + " in " + unit
    hchart.addSeries({
        id: id1,
        type: 'line',
        name: y_axis1,
        data: prices,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    })
    hchart.addSeries({
        id: id2,
        type: 'line',
        name: y_axis2,
        data: volume,
        yAxis: 1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    })
    hchart.yAxis[0].setTitle({text: y_axis1})  
    hchart.setTitle({text: title})
}


//Create Highcharts for block
 function addBlockGraph(coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }

    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin
    hchart.addSeries({
        name: y_axis,
        data: block_data,
        tooltip: {
            formatter: function () {
                return Highcharts.dateFormat('%B %e, %Y %H:%M', this.x) + '<br/>' + 
                    Highcharts.numberFormat(this.y, 2);
            },
            valueDecimals: 2
        }
    })
}

function addScatterPlot(coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }
    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin

    hchart.addSeries({
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
    })
}

groupingUnits = [['week',[1]], ['month',[1, 2, 3, 4, 6]]]

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
                text:  "Price of BTC"
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
                text: "Volume of BTC"
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        legend: {
            enabled: true,
            itemStyle: {
                color: '#000000',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            split: true,
            shared: false
            //valueDecimals: 2
        },
    
        series: []
        });

//clear Highcharts and all the HTML associated with it

function clearCharts(){
    document.getElementById("error").innerHTML = "No data for this period" 
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
    //$('#hchart').highcharts().destroy();
 }


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
    showCharts : showCharts,
    clearCharts : clearCharts,
    addBlockGraph : addBlockGraph,
    showBlockCharts : showBlockCharts,
    clearBlockCharts : clearBlockCharts,
    addScatterPlot : addScatterPlot,
    addPriceVolumeGraph : addPriceVolumeGraph
  }
  
