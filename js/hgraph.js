
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
    console.log(id1)
    console.log(id2)

    hchart.addAxis(
       
        {   
            id: Number.toString(id1),
            className: 'highcharts-color-' + (styl = (id1 == 1 ? 0 : id1)),
            labels: {
                align: 'right',
                x: 5,
            },
            title: {
                text:  '<div class="highcharts-color-' + (styl = (id1 == 1 ? 0 : id1)) + '">' + y_axis1 + '</div>'
            },
            height: '65%',
            lineWidth: 2,
            offset: 30*id1,
            type: 'linear',
            minorTickInterval: 0.1,
            opposite: true,
         }
    )

    hchart.addSeries({
        id: id1,
        type: 'line',
        name: y_axis1,
        data: prices,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    })

    hchart.addAxis(
        {            
            id: Number.toString(id2),
            className: 'highcharts-color-' + id2,
            labels: {
                align: 'right',
                x: -4,
            },
            title: {
                text: '<div class="highcharts-color-' + (styl = (id2 == 1 ? 0 : id2)) + '">' + y_axis2 + '</div>'
            },
            top: '70%',
            height: '30%',
            offset: 30*id1,
            type: 'linear',
            lineWidth: 2,
            opposite: true,

        }
    )

    hchart.addSeries({
        id: id2,
        type: 'column',
        name: y_axis2,
        data: volume,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    })
    //hchart.yAxis[0].setTitle({text: y_axis1})  
    //hchart.setTitle({text: title})
}


//Create Highcharts for block
 function addBlockGraph(id,coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }

    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin
    console.log(id)
    hchart.addAxis(
        
         {   
             id: Number.toString(id),
             className: 'highcharts-color-' + (styl = (id == 1 ? 0 : id)),
             labels: {
                 align: 'right',
                 x: 5,
             },
             title: {
                 text:  '<div class="highcharts-color-' + (styl = (id == 1 ? 0 : id)) + '">' + y_axis + '</div>'
             },
             height: '65%',
             lineWidth: 2,
             offset: 30*id,
             type: 'linear',
             minorTickInterval: 0.1,
             opposite: true,
          }
     )

    hchart.addSeries({
        id: id1,
        type: 'line',
        name: y_axis1,
        data: block_data,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    })
}

function addScatterPlot(id,coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }
    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin

    hchart.addSeries({
        id : id,
        type: 'scatter',
        name: y_axis,
        data: block_data,
        marker: {
            enabled: true,
            radius: 5
        },
    })
}

groupingUnits = [['week',[1]], ['month',[1, 2, 3, 4, 6]]]

hchart = Highcharts.stockChart('hchart', {
    
        rangeSelector: {
            selected: 4
        },
    
        yAxis: [],
        legend: {
            enabled: true,
            itemStyle: {
                color: '#000000',
                fontWeight: 'bold'
            }
        },
        plotOptions: {
            series: {stickyTracking: false}
        },
        tooltip: {
             formatter: function () {
                 console.log(this)
                 if(this.hasOwnProperty('points') && this.points.length == 2){
                    return this.points[0].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.points[0].x) + ': <b>' + Highcharts.numberFormat(this.points[0].y, 2) + " " + unit +'</b>'
                    + '<br/>' + this.points[1].series.name +  ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.points[1].x) + ': <b>' + Highcharts.numberFormat(this.points[1].y, 2) + " " + unit +'</b>'
                 }else if(this.hasOwnProperty('points') && this.points.length == 1){
                    return this.points[0].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.x) + ': <b>' + Highcharts.numberFormat(this.y, 2) + '</b>'
                 }else{
                    return this.series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.x) + ': <b>' +  Highcharts.numberFormat(this.y, 2) + '</b>'
                 }
             },
             shared: true,
            valueDecimals: 2
        },
    
        series: []
        });

//clear Highcharts and all the HTML associated with it

function clearCharts(){
    document.getElementById("error").innerHTML = "No data for this period" 
    document.getElementById("error").className = "well"
    $("#table-of-prices td").remove();
    row1 = document.getElementById("prices-row1")
    row2 = document.getElementById("prices-row2")
    row3 = document.getElementById("prices-row3")
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

module.exports = {
    showCharts : showCharts,
    clearCharts : clearCharts,
    addBlockGraph : addBlockGraph,
    clearBlockCharts : clearBlockCharts,
    addScatterPlot : addScatterPlot,
    addPriceVolumeGraph : addPriceVolumeGraph
  }
  
