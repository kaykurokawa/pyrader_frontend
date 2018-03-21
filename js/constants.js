const MICRO = Math.pow(10,6)
const MILLI = Math.pow(10,3)
const HUNDREDMIL = Math.pow(10,8)
const TENTHOUSAND = Math.pow(10,4)
const conversions = {"USD": HUNDREDMIL, "BTC" : HUNDREDMIL, "DOGE" : HUNDREDMIL, 
"LTC" : HUNDREDMIL, "ETH" : HUNDREDMIL, "EUR" : HUNDREDMIL, "SGD" : HUNDREDMIL, "KRW" : TENTHOUSAND}

module.exports.MICRO = MICRO
module.exports.MILLI = MILLI
module.exports.HUNDREDMIL = HUNDREDMIL
module.exports.TENTHOUSAND = TENTHOUSAND
module.exports.conversions = conversions
