    var MODELS = []

    function UrlParam(id,type, symbol, unit, datatype,exchange,interval){
        this.id  = id;
        this.type = type;
        this.symbol = symbol;
        this.unit = unit;
        this.datatype = datatype;
        this.exchange =  exchange;
        this.interval = interval;
    }

    function resetModel(){
        MODEL = []
        return MODEL
    }
module.exports = {
    MODELS : MODELS,
    UrlParam : UrlParam
}


