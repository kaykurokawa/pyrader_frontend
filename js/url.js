const view = require('./urlModel.js')
const parse = require('/node_modules/url-parse/dist/url-parse.js');


function createUrl(model){
    url = ""
    url += "/?" + model.type + "&symbol=" + model.symbol + "&unit=" + model.unit + "&exchange=" + model.exchange + "&interval=" + model.interval
    return url
}

function changeURL(){
    var url = createUrl(view.MODEL)
    history.pushState(null,"",url)
}

function  getURL(){
    uri = window.location.href
    return uri
}

module.exports = {changeURL : changeURL,
                getURL : getURL,}