    var MODELS = []

    function UrlParam(id1,id2,type, symbol, unit, datatype,exchange,interval,start,end, selected){
        this.id1  = id1;
        this.id2 = id2;
        this.type = type;
        this.symbol = symbol;
        this.unit = unit;
        this.datatype = datatype;
        this.exchange =  exchange;
        this.interval = interval;
        this.start = start;
        this.end = end;
    }

    function resetModel(){
        MODEL = []
        return MODEL
    }

module.exports = {
    MODELS : MODELS,
    UrlParam : UrlParam
}


