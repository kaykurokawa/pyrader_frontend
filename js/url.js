const view = require('./url-models.js')


function createPriceUrl(models){

    for(let i = 0 ; i < models.length ; i++){
        url = ""
        
    if(models[i].type == "price"){
        p_symbol = (models[i].symbol == "" ? "" : "&symbol=" + models[i].symbol)
        p_unit = (models[i].unit == "" ? "" : "&unit=" + models[i].unit)
        p_exhcange = (models[i].exchange == "" ? "" : "&exchange=" + models[i].exchange) 
        p_interval = (models[i].interval == "" ? "" : "&interval=" + models[i].interval)
        url += "/?" + models[i].type + p_symbol + p_unit + p_exchange + p_interval
    }else{
        p_coin = (models[i].symbol == "" ? "" : "&coin=" + models[i].symbol)
        p_datatype = (models[i].datatype == "" ? "" : "&datatype=" + models[i].datatype)
        p_interval = (models[i].interval == "" ? "" : "&interval=" + models[i].interval)
        url += "/?" + models[i].type + p_coin + p_datatype +  p_interval
    }    
    }   
    console.log(url)
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
    var url = createPriceUrl(view.MODELS)  
    history.pushState(null,"",url)
}

function  getURL(){
    uri = window.location.href
    return uri
}

module.exports = {changeURL : changeURL,
                getURL : getURL,
                isBlockUrl : isBlockUrl,}