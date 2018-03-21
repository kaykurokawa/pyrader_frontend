var Info = require('/js/info.js')
var Input = require('/js/input.js')

$(document).ready(function () {
    Info.getInfo()
    Input.getPriceAPI(Input.initialPriceParameter())
    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        Input.getPriceAPI(Input.readPricesValues())
    }
    document.getElementById("block-tab").onclick = function(event){
        Input.getBlockAPI(Input.initialBlockParameter())
        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            Input.getBlockAPI(Input.readBlockValues())
        }
    }
  });