var assert = require('chai').assert;
var expect = require('chai').expect;
var Info = require('../js/info')
var Input = require('../js/input')
var mock_info = require('./mock_info.js')
var mock_input = require('./mock_input.js')

var MICRO = Math.pow(10,6)
var MILLI = Math.pow(10,3)
var HUNDREDMIL = Math.pow(10,8)
var TENTHOUSAND = Math.pow(10,4)
var conversions = {"USD": HUNDREDMIL, "BTC" : HUNDREDMIL, "DOGE" : HUNDREDMIL, 
"LTC" : HUNDREDMIL, "ETH" : HUNDREDMIL, "EUR" : HUNDREDMIL, "SGD" : HUNDREDMIL, "KRW" : TENTHOUSAND}

//getTimeStamp
//processDates*
//convertIntervalToNumber
//round*
//processPrices*
//processVolume*
//procesSData*

describe('Info', function() {
  describe('given a time in microseconds return what the time interval is', function() {
    it('given 300 mircoseconds return 5min', function() {
      assert.equal(Info.convertIntervalNumberToText(300000000), "5min");
    });
  });
  describe('given a time in microseconds return what the time interval is', function() {
    it('given 3600 microseconds return hour', function() {
      assert.equal(Info.convertIntervalNumberToText(3600000000), "hour");
    });
  });
  describe('given a time in microseconds return what the time interval is', function() {
    it('given 86400 microseconds return day', function() {
      assert.equal(Info.convertIntervalNumberToText(86400000000), "day");
    });
  });
  describe('given an info API call, change and nulls to "Aggregated" for exchange', function() {
    it('test eliminate nulls into aggregated', function() {
      mock = mock_info.getMockInfo().price
        assert.deepEqual(Info.eliminateNulls(mock), mock_info.getMockInfoResult())

    });
  });
});


describe('Input', function() {
  describe('Round', function() {
    it('round a number given a precision number', function() {
      assert.equal(Input.round(0,2),0.00);  
    });
    it('round a number given a precision number', function() {
      assert.equal(Input.round(123.32323232323232,8),123.32323232);  
    });
    it('round a number given a precision number', function() {
      assert.equal(Input.round(12.225,2),12.23);  
    });
  });
  describe('processDates', function() {
    it('given json, output the date in milliseconds', function() {
      assert.deepEqual(Input.processDates(mock_input.getMockInput(),3600 * MILLI).data[4], mock_input.getMockDateResults().data[4]);  
    });
  });
  describe('processPrices', function() {
    it('given json, convert prices and change the prices such that there are no zeros, ', function() {
      assert.deepEqual(Input.processPrices(mock_input.getMockInput(), "&unit=USD").data[2], mock_input.getMockPriceResults().data[2]);  
    });
  });

  describe('processPrices', function() {
    it('given json, if the prices are small then it should return 8 decimal places, ', function() {
      assert.deepEqual(Input.processPrices(mock_input.getMockInput1(),"&unit=BTC").data[2], mock_input.getMockPriceResults1().data[2]);  
    });
  });

  describe('processVolume', function() {
    it('given json, convert Volumes and change the prices such that there are no zeros ', function() {
      assert.deepEqual(Input.processVolume(mock_input.getMockInput(),"&unit=USD").data[3], mock_input.getMockVolumeResults().data[3]);  
    });
  });

  describe('processVolume', function() {
    it('given json, convert Volumes if the units were BTC ', function() {
      assert.deepEqual(Input.processVolume(mock_input.getMockInput1(),"&unit=BTC").data[3], mock_input.getMockVolumeResults1().data[3]);  
    });
  })

  describe('processData', function() {
    it('given json, make sure the block data has no zeros', function() {
      expect(Input.processData(mock_input.getMockInput2()).data[2]).to.not.include(0 || null || NaN)
    });
  })


});