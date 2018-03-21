var chai = require('chai');
var assert = require('chai').assert;
var expect = require('chai').expect;
var Info = require('../js/info')
var Input = require('../js/input')
var mock_input = require('./mock_input.js')
var constants = require('../js/constants')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('fetchAPI', function() {
  describe('test various API calls on the Info', function() {
    it('gives you the info', function() {
      chai.request('http://159.65.167.149:8888')
      .get('/info')
      .end(function(err, res){
        if (err) done(err);
       expect(res.body).to.have.property("y")
       expect(res.body).to.have.property("w")
       expect(res.body).to.have.property("x1")
       expect(res.body).to.have.property("x2")
       expect(res.body).to.have.property("interval")
       expect(res.body).to.have.property("symbol")   
        done();
      });
    });
  });
  describe('test out the  ?price', function() {
    it('should get the API for prices', function(done) {
      chai.request('http://159.65.167.149:8888')
        .get('/price?symbol=LTC&interval=5min')
        .end(function(err, res){
          if (err) done(err);
         expect(res.body).to.have.property("y")
         expect(res.body).to.have.property("w")
         expect(res.body).to.have.property("x1")
         expect(res.body).to.have.property("x2")
         expect(res.body).to.have.property("interval")
         expect(res.body).to.have.property("symbol")   
          done();
        });
    });  
    it('you can pass in timestamps', function() {
    
    });
  });
  describe('test out the ?block', function() {
    it('gives you successfull call', function() {
      chai.request('http://159.65.167.149:8888')
      .get('/block?coin=LTC&datatype=difficulty&interval=hour')
      .end(function(err, res){
        if (err) done(err);
       expect(res.body).to.have.property("y")
       expect(res.body).to.have.property("x1")
       expect(res.body).to.have.property("x2")
       expect(res.body).to.have.property("interval")
       expect(res.body).to.have.property("coin")   
        done();
      });
    });
    it('you can pass in time stamps', function() {
    
    });
  });
});




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
        assert.deepEqual(Info.eliminateNulls([{exchange : null}]),[{exchange : "Aggregated"}]  )
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
    it('given json, make sure the return has adequete length', function() {
      assert.equal(Input.processDates(mock_input.getMockInput(),3600 * constants.MILLI).length, mock_input.getMockInput().y.length);  
    });
    it('given json, make sure the return is in milliseconds', function() {
      assert.equal(Input.processDates(mock_input.getMockInput(),3600 * constants.MILLI)[0], mock_input.getMockInput().x1/1000);  
    });
  });
  describe('processPrices', function() {
    it('given json, convert prices and change the prices such that there are no zeros, ', function() {
      expect(Input.processPrices({"y": [1882750.375, 0,0,0, 1910363.75]}, "USD")).to.not.include(0);  
    });
    it('given json, if the prices are small (LTC to BTC) then it should return greater than 6 decimal places, ', function() {
      assert.isAbove(Input.processPrices(mock_input.getMockInput1(),"BTC")[0].toString().split(".")[1].length, 6);
      assert.isAbove(Input.processPrices(mock_input.getMockInput(),"USD")[0].toString().split(".")[1].length, 1);
    });
    it('given json, if the prices in USD return at least 1 decimal places, ', function() {
      assert.isAbove(Input.processPrices(mock_input.getMockInput(),"USD")[0].toString().split(".")[1].length, 1);
    });
  });

  describe('processVolume', function() {
    it('given json, convert Volumes and change the prices such that there are no zeros ', function() {
      expect(Input.processVolume({"w": [2243243278336.0, 0.0, 424294744064.0, 0.0]}, "USD")).to.not.include(0); 
    });
    it('given json, convert Volumes and the decmial must be at least 1 ', function() {
      assert.isAbove(Input.processPrices(mock_input.getMockInput(),"USD")[0].toString().split(".")[1].length, 1);
    });
  });

  describe('processData', function() {
    it('given json, make sure the block data has no zeros', function() {
      expect(Input.processData({"y":[100000000,0.0,0.0,null,NaN]})).to.not.include(0 || null || NaN)
    });
  })


});