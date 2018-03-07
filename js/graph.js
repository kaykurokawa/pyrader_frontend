var Graph = (function(){
function drawPriceGraph(json){
  console.log(json)
  symbol = json.symbol
  var unit = json.unit
  var label = symbol + " in " + unit
  var row = ['Price of ' + label].concat(json.data[2])
  var time =['x'].concat(json.data[4])

  document.getElementById("current-price").innerHTML = "Last Price of " + symbol + ": " + row[row.length-1].toLocaleString() + " " + unit
  document.getElementById("time").innerHTML = "As of " + time[time.length-1]  
  var priceChart = c3.generate({
        bindto: '#chart1',
        data: {
          x: 'x',
          columns: [
            time,
            row
          ]
        },
        axis: {
          x: {
              label: 'Date/Time',
              type: 'timeseries',
              tick: {
                  format: "%m-%d %H:%M",
                  count:time.length/2,
                  rotate: 90
              }
          },
          y: {
            label: label
        }    
      }  
    });
}

function drawVolumeGraph(json){
  symbol = json.symbol
  var unit = json.unit
  var label = symbol + " in " + unit
  var row = ['Volume of ' + label].concat(json.data[3])
  var time =['x'].concat(json.data[4])
  document.getElementById("current-volume").innerHTML = "Current Volume of " + symbol + ": " + row[row.length-1].toLocaleString() + " " + unit
  document.getElementById("time").innerHTML = "As of " + time[time.length-1]  
  var volumeChart = c3.generate({
    bindto: '#chart2',
    data: {
      x: 'x',
      columns: [
        time,
        row
      ]
    },
    color: {
      pattern: ['#B73540']
    },
    axis: {
      x: {
          label: 'Date/Time',
          type: 'timeseries',
          tick: {
              format: "%m-%d %H:%M",
              count:time.length/2,
              rotate: 90
          }
      },
      y: {
        label: label
    }    
  }  
});
}

function drawBlockGraph(json){
  symbol = json.coin
  var label = symbol
  var datatype = json.datatype
  var row = [datatype].concat(json.data[2])
  var time =['x'].concat(json.data[3])
  document.getElementById("current-block").innerHTML = "Current " + datatype + " of " + symbol + ": " + row[row.length-1].toLocaleString()
  document.getElementById("block-time").innerHTML = "As of " + time[time.length-1]  
  var blockChart = c3.generate({
    bindto: '#block-chart2',
    data: {
      x: 'x',
      columns: [
        time,
        row
      ]
    },
    color: {
      pattern: ['#B73540']
    },
    axis: {
      x: {
          label: 'Date/Time',
          type: 'timeseries',
          tick: {
              format: "%m-%d %H:%M",
              count:time.length/2,
              rotate: 90
          }
      },
      y: {
        label: label
    }    
  }  
});
  
}


return {
  drawPriceGraph : drawPriceGraph,
  drawVolumeGraph : drawVolumeGraph,
  drawBlockGraph : drawBlockGraph
}

}());