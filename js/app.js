var Info = require('/js/info.js')
var Input = require('/js/input.js')
var Url = require('/js/url.js')


$(document).ready(function () {
    Info.getInfo()
    url = Url.getURL()
    Input.getPriceAPI(Input.initialPriceParameter(url))
    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        Input.getPriceAPI(Input.readPricesValues())
    }
    Input.getBlockAPI(Input.initialBlockParameter(url))
        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            Input.getBlockAPI(Input.readBlockValues())
        }
    });