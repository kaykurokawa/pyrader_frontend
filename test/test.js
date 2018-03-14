var assert = require('chai').assert;
var Info = require('../js/info')
var mock_info = require('./mock_info.js')

//convertIntervalNumberToText 
//eliminateNulls

console.log(mock_info.getMockInfo())
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
  describe('given an info API call, change and nulls to "None" for exchange', function() {
    it('[]', function() {
      assert.equal(Info.convertIntervalNumberToText(86400000000), "day");
    });
  });
});

