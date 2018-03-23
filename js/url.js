const view = require('./urlModel.js')


function createPriceUrl(model){
    url = ""
    if(model.type == "price"){
        url += "/?" + model.type + "&symbol=" + model.symbol + "&unit=" + model.unit + "&exchange=" + model.exchange + "&interval=" + model.interval
    }else{
        url += "/?" + model.type + "&coin=" + model.symbol + "&datatype=" + model.datatype +  "&interval=" + model.interval
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