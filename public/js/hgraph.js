const URL = require('./url.js');
const Input =  require('./input.js')
/*Create Highcharts for price*/
// High.addPriceGraph(id, coin_data, unit_data, x, y_prices, first_date, last_date, min, max);

function addPriceGraph(id,coin,unit,x,y_prices,start,end, min, max, first){
    prices = [];
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            prices.push([x[i], y_prices[i]]);
        }
    }
    prices.sort();
    title = coin + " Charts";
    y_axis = "Price of " + coin + " in " + unit;
    
    //price axis
    hchart.addAxis({   
            id: id + "-axis",
            colorIndex: id,
            className: 'highcharts-color-' + id,
            labels: {
                align: 'left',
            },
            title: {
                text:  '<div class="highcharts-color-' + id + '">' + y_axis + '</div>'
            },
            height: '65%',
            lineWidth: 2,
            opposite: true,
         }
    );

    //price series
    hchart.addSeries({
        cropThreshold: Number.MAX_VALUE,
        getExtremesFromAll: true,
        id: id + "-series",
        colorIndex: id,
        type: 'line',
        name: y_axis,
        unit: unit,
        data: prices,
        //yAxis: hchart.yAxis.length-1,
        yAxis: id + "-axis",
        //boostThreshold: 1
    });
  
    if(!first){
        setMinMax(min,max) //from the url min and max query set the xAxis to min and max
        AlignAxis(id, "Price")
    }

}

/*Create Highcharts for volume*/
//High.addVolumeGraph(id, coin_data, unit_data, x, y_volume, first_date, last_date, min, max);
function addVolumeGraph(id,coin,unit,x,y_volume,start,end, min, max, first){
    volumes = [];
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            volumes.push([x[i], y_volume[i]]);
        }
    }
    volumes.sort();
    title = coin + " Charts";
    y_axis = "Volume of " + coin + " in " + unit;

        //volume axis  
        hchart.addAxis({
            id: id + "-axis",
            colorIndex: id,
            className: 'highcharts-color-' + id,
            labels: {
                align: 'left',
                x: -40
            },
            title: {
                text: '<div class="highcharts-color-' + id + '">' + y_axis + '</div>'
            },
            top: '70%',
            height: '30%',
            type: 'column',
            lineWidth: 2,
            opposite: true,
        });

    //volume series
    hchart.addSeries({
        cropThreshold: Number.MAX_VALUE,
        getExtremesFromAll: true,
        id: id + "-series",
        colorIndex: id,
        type: 'column',
        name: y_axis,
        unit: unit,
        data: volumes,
        //yAxis: hchart.yAxis.length-1,
        yAxis: id + "-axis",
        //boostThreshold: 1
    });

    if(!first){
        setMinMax(min,max) //from the url min and max query set the xAxis to min and max
        AlignAxis(id, "Volume")
    }

}

/*For adding a new Yaxis, if there is an existing axis that has a min or max within 20 percent, then align the axes to have the same values */
function AlignAxis(id, matcher){
    let hchart = $('#hchart').highcharts();
    let current= hchart.get(id + "-axis")
    if(id > 1){ 
        for(let i = 1 ; i < id ; i++){
            iterating_axis = hchart.get(i + "-axis")
            if(iterating_axis === current){
                continue;
            }
            
            if((nearTwentyPercent(iterating_axis.dataMax, current.dataMax) || nearTwentyPercent(iterating_axis.dataMin, current.dataMin)) 
                && iterating_axis.userOptions.title.text.includes(matcher)){    
                //add property LinkTo to the your axis.
                curr_min = current.dataMin
                curr_max = current.dataMax
                itr_min = iterating_axis.dataMin
                itr_max = iterating_axis.dataMax
                let min = (curr_min < itr_min ? curr_min : itr_min) 
                let max = (curr_max > itr_min ? curr_max : itr_max)
                iterating_axis.setExtremes(min, max)
                hchart.get(id + "-axis").update({linkedTo : i.toString()})
            }
        }    
    }
}

function nearTwentyPercent(compare_minmax, current_minmax){
    if((Math.abs(compare_minmax - current_minmax)/current_minmax) <= 0.2){
        return true;
    }else{
        return false;
    }  
}

function setMinMax(min,max){
    let hchart = $('#hchart').highcharts();
    if(!min && !max){
        return
    }else{
        hchart.xAxis[0].setExtremes(min, max);
    }
}

//Create Highcharts for block
 function addBlockGraph(id,coin,datatype,x,y,start,end, min, max){
    block_data = [];
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            block_data.push([x[i], y[i]]);
        }
    }
    block_data.sort();
    title = coin + " " + datatype + " " + "chart";
    y_axis = datatype + " of " + coin + " Block";
    //add block axis
    hchart.addAxis({   
             id: id + "-axis",
             className: 'highcharts-color-' + id,
             colorIndex: id,
             labels: {
                 align: 'left',
             },
             title: {
                 text:  '<div class="highcharts-color-' + id + '">' + y_axis + '</div>'
             },
             height: '65%',
             lineWidth: 2,
             minorTickInterval: 0.1,
             opposite: true,
            
          })

    //add block series
    hchart.addSeries({
        cropThreshold: Number.MAX_VALUE,
        getExtremesFromAll: true,
        id: id + "-series",
        colorIndex: id,
        //boostThreshold: 1,
        type: 'line',
        name: y_axis,
        getExtremesFromAll: true,
        data: block_data,
        yAxis: id + "-axis",
    })

    setMinMax(min,max)
    AlignAxis(id, "Block")
}

function addScatterPlot(id,coin,datatype,x,y,start,end, min, max){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            block_data.push([x[i], y[i]])
        }

    }
    block_data.sort();
    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin + " Block"
    hchart.addAxis(
        
         {   
             id: id + "-axis",
             className: 'highcharts-color-' + id,
             colorIndex: id,
             labels: {
                 align: 'left',
             },
             title: {
                 text:  '<div class="highcharts-color-' + id + '">' + y_axis + '</div>'
             },
             height: '65%',
             lineWidth: 2,
             minorTickInterval: 0.1,
             opposite: true,
          }
     )

    hchart.addSeries({
        cropThreshold: Number.MAX_VALUE,
        getExtremesFromAll: true,
        id : id + "-series",
        colorIndex: id,
        //boostThreshold: 1,
        type: 'scatter',
        name: y_axis,
        data: block_data,
        getExtremesFromAll: true,
        yAxis: id + "-axis",
        marker: {
            enabled: true,
            radius: 5
        },
    })

    setMinMax(min,max)
    AlignAxis(id, "Block")
}


//Read the default range given a query parameter
let url = URL.getURL()
let range = URL.getParameterByName("range", url) 
let selector = 1;
if(range != null){
    if(range == "day"){
        selector = 0
    }else if(range == "week"){
        selector = 1
    }else if(range == "month"){
        selector = 2
    }else if(range == "all"){
        selector = 3
    }
}



//generate the Highcharts
var hchart = Highcharts.stockChart('hchart', {
    
    rangeSelector: {
        allButtonsEnabled: true,
        buttons: [{
            type: 'day',
            count: 1,
            text: 'Day',
        }, {
            type: 'week',
            count: 1,
            text: 'Week',
        }, {
            type: 'month',
            count: 1,
            text: 'Month',
        },{
            type: 'all',
            text: 'All',
        }],
        buttonTheme: {
            width: 60
        },
        selected: selector
    },

        /*boost: {
            seriesThreshold: 1,
            enabled: true,
            useGPUTranslations: true,
            useAlpha: false,
            usePreallocated: true
        },*/

        navigator: {
            adaptToUpdatedData: false,
        },

        scrollbar: {
            liveRedraw: true
        },
        plotOptions: {
            area: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            bar: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            column: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } }, getExtremesFromAll: true },
            line: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } }, getExtremesFromAll: true },
            scatter: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } }, getExtremesFromAll: true },
            series: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            spline: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
        },
        chart: {
            reflow: false,
            events: {
                redraw: function() {
                    console.log("highcharts redraw, rendering-done");
                    $('body').addClass('rendering-done');
                }
            },
            animation: false
        },
        exporting: {
            enabled:false
        },
        credits: {
            enabled: false
        },

        yAxis: [],
        xAxis: {
            labels: {
                style: {
                    width: '100px',
                    'min-width': '100px'
                },
                useHTML : true
            },
            events: {
                afterSetExtremes: function(event){

                    document.querySelector('#share-link').onclick = function(e){
                        let min_window = event.min*1000
                        let max_window = event.max*1000
                        let url = URL.removeParameter("min", URL.getURL())
                        url = URL.removeParameter("max", url)
                        URL.setShareLink( url + "&min=" + min_window + "&max=" + max_window) 
                    }

                    document.querySelector('#share-block-link').onclick = function(e){
                        let min_window = event.min*1000;
                        let max_window = event.max*1000;
                        let url = URL.removeParameter("min", URL.getURL())
                        url = URL.removeParameter("max", url)
                        URL.setShareLink(url + "&min=" + min_window + "&max=" + max_window); 
                    }    
                }
            }
        },
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
            enabled: true,
            animation: false,
             formatter: function () {
                 //format the tool tip if it is less than 1 then it is 7 digits and if not then it is 2.
                 var dec1;
                 var dec2;
                 //format the tool tip for price and volume 
                 if(this.hasOwnProperty('points') && this.points.length >= 2){
                    let string_return = "";
                    for(let i = 0 ; i < this.points.length ; i++){
                        string_return += '<span class="highcharts-color-' + this.points[i].colorIndex +'">▣ </span>' + this.points[i].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.points[i].x) + ': <b>' + Highcharts.numberFormat(this.points[i].y, (this.points[i].y < 1 ? dec1 = 8 : dec1 = 2)) + " " +'</b>' +  '<br/>' 
                    }
                    return string_return
                //format the tool tip if it is just one of price or volume 
                }else if(this.hasOwnProperty('points') && this.points.length == 1){
                    this.points[0].y < 1 ? dec1 = 8 : dec1 = 2;
                    styl = this.points[0].colorIndex;
                    return '<span class="highcharts-color-' + styl + '">▣ </span>' + this.points[0].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.x) + ': <b>' + Highcharts.numberFormat(this.y, dec1) + '</b>';
                //format the tooltip if it is scatter 
                }else{
                    this.y < 1 ? dec1 = 8 : dec1 = 2;    
                    styl = this.colorIndex;
                    return '<span class="highcharts-color-' + styl + '">▣ </span>' + this.series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.x) + ': <b>' +  Highcharts.numberFormat(this.y, dec1) + '</b>';
                    
                }
             },
             shared: false,
        },
    
        series: []
        });
  

module.exports = {
    addBlockGraph : addBlockGraph,
    addScatterPlot : addScatterPlot,
    addPriceGraph : addPriceGraph,
    addVolumeGraph : addVolumeGraph

  }
  
