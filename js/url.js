const view = require('./urlModel.js')


function createPriceUrl(model){
    url = ""
    if(model.type == "price"){
        p_symbol = (model.symbol == "" ? "" : "&symbol=" + model.symbol)
        p_unit = (model.unit == "" ? "" : "&unit=" + model.unit)
        p_exhcange = (model.exchange == "" ? "" : "&exchange=" + model.exchange) 
        p_interval = (model.interval == "" ? "" : "&interval=" + model.interval)
        url = "/?" + model.type + p_symbol + p_unit + p_exchange + p_interval
    }else{
        p_coin = (model.symbol == "" ? "" : "&coin=" + model.symbol)
        p_datatype = (model.datatype == "" ? "" : "&datatype=" + model.datatype)
        p_interval = (model.interval == "" ? "" : "&interval=" + model.interval)
        url = "/?" + model.type + p_coin + p_datatype +  p_interval
    }
        return url
}

function isBlockUrl(){
    if(window.location.href.includes("?block"))
    {
        return true  
    }else{
        return false
    }

}

function changeURL(){
    var url = createPriceUrl(view.MODEL)  
    history.pushState(null,"",url)
}

function  getURL(){
    uri = window.location.href
    return uri
}

module.exports = {changeURL : changeURL,
                getURL : getURL,
                isBlockUrl : isBlockUrl,}