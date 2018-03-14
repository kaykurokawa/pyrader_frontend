function getMockInfo(){
    const mock_info = {
    "price": [{"exchange": null, "symbol": "LTC", "interval": 86400000000, "last_insert_sec_past": 245249580576, "unit": "BTC", "size": 8}, {"exchange": "kraken", "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 244949644821, "unit": "USD", "size": 5}, {"exchange": "coinbase", "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 245249604674, "unit": "USD", "size": 8}, {"exchange": "kraken", "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 245249314497, "unit": "EUR", "size": 5}, {"exchange": null, "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 245249269360, "unit": "USD", "size": 8}, {"exchange": "bittrex", "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 244949667034, "unit": "BTC", "size": 5}, {"exchange": null, "symbol": "LTC", "interval": 86400000000, "last_insert_sec_past": 245249638740, "unit": "USD", "size": 8}, {"exchange": null, "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 244949667051, "unit": "BTC", "size": 5}, {"exchange": "bittrex", "symbol": "LTC", "interval": 86400000000, "last_insert_sec_past": 245249580614, "unit": "BTC", "size": 8}, {"exchange": "poloniex", "symbol": "DOGE", "interval": 86400000000, "last_insert_sec_past": 429822555304, "unit": "BTC", "size": 1}, {"exchange": "kraken", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 244949661382, "unit": "EUR", "size": 8}, {"exchange": "kraken", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 245249317140, "unit": "USD", "size": 8}, {"exchange": "poloniex", "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 429822545708, "unit": "BTC", "size": 1}, {"exchange": "gemini", "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 245249269391, "unit": "USD", "size": 5}, {"exchange": "kraken", "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 245249482530, "unit": "BTC", "size": 5}, {"exchange": null, "symbol": "DOGE", "interval": 86400000000, "last_insert_sec_past": 244949727931, "unit": "BTC", "size": 5}, {"exchange": "bittrex", "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 244949790858, "unit": "BTC", "size": 8}, {"exchange": "poloniex", "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 429822544318, "unit": "BTC", "size": 1}, {"exchange": "korbit", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 244949651295, "unit": "KRW", "size": 8}, {"exchange": null, "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 244949790877, "unit": "BTC", "size": 8}, {"exchange": "poloniex", "symbol": "LTC", "interval": 86400000000, "last_insert_sec_past": 429822552590, "unit": "BTC", "size": 1}, {"exchange": "coinbase", "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 244949765788, "unit": "USD", "size": 5}, {"exchange": "coinbase", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 245249658028, "unit": "USD", "size": 8}, {"exchange": "itbit", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 244949843934, "unit": "USD", "size": 8}, {"exchange": "gemini", "symbol": "ETH", "interval": 86400000000, "last_insert_sec_past": 245548824350, "unit": "BTC", "size": 5}, {"exchange": "coinbase", "symbol": "LTC", "interval": 86400000000, "last_insert_sec_past": 245249638813, "unit": "USD", "size": 8}, {"exchange": "gemini", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 245244739857, "unit": "USD", "size": 8}, {"exchange": null, "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 244949644952, "unit": "USD", "size": 6}, {"exchange": "bittrex", "symbol": "DOGE", "interval": 86400000000, "last_insert_sec_past": 244949727979, "unit": "BTC", "size": 5}, {"exchange": null, "symbol": "BCH", "interval": 86400000000, "last_insert_sec_past": 245249314621, "unit": "EUR", "size": 5}, {"exchange": "bitstamp", "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 245249540310, "unit": "USD", "size": 8}, {"exchange": null, "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 244949661485, "unit": "EUR", "size": 8}, {"exchange": null, "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 244949843978, "unit": "USD", "size": 8}, {"exchange": null, "symbol": "BTC", "interval": 86400000000, "last_insert_sec_past": 244949651368, "unit": "KRW", "size": 8}, {"exchange": null, "symbol": "LTC", "interval": 3600000000, "last_insert_sec_past": 245249582022, "unit": "BTC", "size": 172}, {"exchange": "kraken", "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 244949645286, "unit": "USD", "size": 110}, {"exchange": "coinbase", "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 245249609903, "unit": "USD", "size": 172}, {"exchange": "kraken", "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 245249315026, "unit": "EUR", "size": 110}, {"exchange": null, "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 245249271510, "unit": "USD", "size": 172}, {"exchange": "bittrex", "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 244949672872, "unit": "BTC", "size": 110}, {"exchange": null, "symbol": "LTC", "interval": 3600000000, "last_insert_sec_past": 245249647405, "unit": "USD", "size": 172}, {"exchange": null, "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 244949672888, "unit": "BTC", "size": 110}, {"exchange": "bittrex", "symbol": "LTC", "interval": 3600000000, "last_insert_sec_past": 245249582057, "unit": "BTC", "size": 172}, {"exchange": "poloniex", "symbol": "DOGE", "interval": 3600000000, "last_insert_sec_past": 429822560834, "unit": "BTC", "size": 12}, {"exchange": "kraken", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 244949662933, "unit": "EUR", "size": 172}, {"exchange": "kraken", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 245249320051, "unit": "USD", "size": 172}, {"exchange": "poloniex", "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 429822591477, "unit": "BTC", "size": 12}, {"exchange": "gemini", "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 245249271541, "unit": "USD", "size": 110}, {"exchange": null, "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 245249315081, "unit": "EUR", "size": 110}, {"exchange": null, "symbol": "DOGE", "interval": 3600000000, "last_insert_sec_past": 244949733569, "unit": "BTC", "size": 110}, {"exchange": "bittrex", "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 244949791641, "unit": "BTC", "size": 172}, {"exchange": "poloniex", "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 429822609059, "unit": "BTC", "size": 12}, {"exchange": "korbit", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 244949652463, "unit": "KRW", "size": 172}, {"exchange": null, "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 244949791658, "unit": "BTC", "size": 172}, {"exchange": "poloniex", "symbol": "LTC", "interval": 3600000000, "last_insert_sec_past": 429822569578, "unit": "BTC", "size": 12}, {"exchange": "coinbase", "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 244949766821, "unit": "USD", "size": 110}, {"exchange": "coinbase", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 245249659983, "unit": "USD", "size": 172}, {"exchange": "itbit", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 244949844422, "unit": "USD", "size": 172}, {"exchange": "gemini", "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 245548824848, "unit": "BTC", "size": 110}, {"exchange": "coinbase", "symbol": "LTC", "interval": 3600000000, "last_insert_sec_past": 245249647479, "unit": "USD", "size": 172}, {"exchange": "gemini", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 245244741784, "unit": "USD", "size": 172}, {"exchange": null, "symbol": "BCH", "interval": 3600000000, "last_insert_sec_past": 244949645416, "unit": "USD", "size": 111}, {"exchange": "bittrex", "symbol": "DOGE", "interval": 3600000000, "last_insert_sec_past": 244949733614, "unit": "BTC", "size": 99}, {"exchange": "kraken", "symbol": "ETH", "interval": 3600000000, "last_insert_sec_past": 245249483724, "unit": "BTC", "size": 110}, {"exchange": "bitstamp", "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 245249541644, "unit": "USD", "size": 172}, {"exchange": null, "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 244949663034, "unit": "EUR", "size": 172}, {"exchange": null, "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 244949844466, "unit": "USD", "size": 172}, {"exchange": null, "symbol": "BTC", "interval": 3600000000, "last_insert_sec_past": 244949652539, "unit": "KRW", "size": 172}, {"exchange": null, "symbol": "LTC", "interval": 300000000, "last_insert_sec_past": 245249583476, "unit": "BTC", "size": 2062}, {"exchange": "kraken", "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 244949645758, "unit": "USD", "size": 1315}, {"exchange": "coinbase", "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 245249621305, "unit": "USD", "size": 2062}, {"exchange": "kraken", "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 245249315538, "unit": "EUR", "size": 1314}, {"exchange": null, "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 245249273541, "unit": "USD", "size": 2062}, {"exchange": "bittrex", "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 244949674442, "unit": "BTC", "size": 1315}, {"exchange": null, "symbol": "LTC", "interval": 300000000, "last_insert_sec_past": 245249651392, "unit": "USD", "size": 2062}, {"exchange": null, "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 244949674481, "unit": "BTC", "size": 1315}, {"exchange": "bittrex", "symbol": "LTC", "interval": 300000000, "last_insert_sec_past": 245249583536, "unit": "BTC", "size": 2062}, {"exchange": "poloniex", "symbol": "DOGE", "interval": 300000000, "last_insert_sec_past": 429822928545, "unit": "BTC", "size": 136}, {"exchange": "kraken", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 244949664536, "unit": "EUR", "size": 2063}, {"exchange": "kraken", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 245249322959, "unit": "USD", "size": 2062}, {"exchange": "poloniex", "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 429822635998, "unit": "BTC", "size": 136}, {"exchange": "gemini", "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 245249273600, "unit": "USD", "size": 1314}, {"exchange": "kraken", "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 245249484731, "unit": "BTC", "size": 1314}, {"exchange": null, "symbol": "DOGE", "interval": 300000000, "last_insert_sec_past": 244949734342, "unit": "BTC", "size": 1315}, {"exchange": "bittrex", "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 244949792487, "unit": "BTC", "size": 2063}, {"exchange": "poloniex", "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 429822944859, "unit": "BTC", "size": 136}, {"exchange": "korbit", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 244949655136, "unit": "KRW", "size": 2063}, {"exchange": null, "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 244949792504, "unit": "BTC", "size": 2063}, {"exchange": "poloniex", "symbol": "LTC", "interval": 300000000, "last_insert_sec_past": 429822722431, "unit": "BTC", "size": 136}, {"exchange": "coinbase", "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 244949768029, "unit": "USD", "size": 1315}, {"exchange": "coinbase", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 245249662517, "unit": "USD", "size": 2062}, {"exchange": "itbit", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 244949844898, "unit": "USD", "size": 2063}, {"exchange": "gemini", "symbol": "ETH", "interval": 300000000, "last_insert_sec_past": 245548825363, "unit": "BTC", "size": 1313}, {"exchange": "coinbase", "symbol": "LTC", "interval": 300000000, "last_insert_sec_past": 245249651492, "unit": "USD", "size": 2062}, {"exchange": "gemini", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 245244743683, "unit": "USD", "size": 2062}, {"exchange": null, "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 244949646000, "unit": "USD", "size": 1316}, {"exchange": "bittrex", "symbol": "DOGE", "interval": 300000000, "last_insert_sec_past": 244949734391, "unit": "BTC", "size": 1180}, {"exchange": null, "symbol": "BCH", "interval": 300000000, "last_insert_sec_past": 245249315687, "unit": "EUR", "size": 1314}, {"exchange": "bitstamp", "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 245249543017, "unit": "USD", "size": 2062}, {"exchange": null, "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 244949664643, "unit": "EUR", "size": 2063}, {"exchange": null, "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 244949844942, "unit": "USD", "size": 2063}, {"exchange": null, "symbol": "BTC", "interval": 300000000, "last_insert_sec_past": 244949655210, "unit": "KRW", "size": 2063}], "block": [{"datatype": "height", "coin": "LTC", "last_insert_sec_past": 421700636995, "size": 1094, "interval": 86400000000}, {"datatype": "difficulty", "coin": "LTC", "last_insert_sec_past": 421700637006, "size": 1094, "interval": 86400000000}, {"datatype": "total_transfer_volume", "coin": "LTC", "last_insert_sec_past": 421700636993, "size": 1094, "interval": 86400000000}, {"datatype": "num_tx", "coin": "LTC", "last_insert_sec_past": 421700637002, "size": 1094, "interval": 86400000000}, {"datatype": "block_size_bytes", "coin": "LTC", "last_insert_sec_past": 421700637023, "size": 1094, "interval": 86400000000}, {"datatype": "height", "coin": "LTC", "last_insert_sec_past": 421700644183, "size": 3839, "interval": 3600000000}, {"datatype": "difficulty", "coin": "LTC", "last_insert_sec_past": 421700644193, "size": 3839, "interval": 3600000000}, {"datatype": "total_transfer_volume", "coin": "LTC", "last_insert_sec_past": 421700644179, "size": 3839, "interval": 3600000000}, {"datatype": "num_tx", "coin": "LTC", "last_insert_sec_past": 421700644188, "size": 3839, "interval": 3600000000}, {"datatype": "block_size_bytes", "coin": "LTC", "last_insert_sec_past": 421700644209, "size": 3839, "interval": 3600000000}, {"datatype": "height", "coin": "LTC", "last_insert_sec_past": 421700651329, "size": 5759, "interval": 300000000}, {"datatype": "difficulty", "coin": "LTC", "last_insert_sec_past": 421700651341, "size": 5759, "interval": 300000000}, {"datatype": "total_transfer_volume", "coin": "LTC", "last_insert_sec_past": 421700651326, "size": 5759, "interval": 300000000}, {"datatype": "num_tx", "coin": "LTC", "last_insert_sec_past": 421700651334, "size": 5759, "interval": 300000000}, {"datatype": "block_size_bytes", "coin": "LTC", "last_insert_sec_past": 421700651356, "size": 5759, "interval": 300000000}, {"datatype": "total_transfer_volume_usd", "coin": "LTC", "last_insert_sec_past": 429640398822, "size": 1, "interval": 86400000000}, {"datatype": "total_transfer_volume_usd", "coin": "LTC", "last_insert_sec_past": 429640399014, "size": 1, "interval": 3600000000}, {"datatype": "total_transfer_volume_usd", "coin": "LTC", "last_insert_sec_past": 429640399524, "size": 1, "interval": 300000000}]
    }
return mock_info
}

module.exports = {
    getMockInfo: getMockInfo,

}