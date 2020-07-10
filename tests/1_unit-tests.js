/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const compareFloats = (x, y, epsilon) => {
  // devuelve true si son aproximadamente iguales, dentro de cierto margen
  //requiere que x, y, epsilon sean números
  return Math.abs(x - y) < epsilon;
}

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '2.5km';
      assert.equal(convertHandler.getNum(input), 2.5);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '1/2mi';
      //acá podría usar assert.almost o assert.approximately
      assert.isOk(compareFloats(convertHandler.getNum(input), 0.5, 0.1));
      //assert.equal(convertHandler.getNum(input), ??);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '2.5/6gal';
      //acá podría usar assert.approximately si lo terminara de entender
      assert.isOk(compareFloats(convertHandler.getNum(input), 0.41666, 0.1));
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '2.5/6/9gal';
      assert.isNotOk(convertHandler.getNum(input)); // porque Number('2/6/9') da NaN que es falsy
      // también podría usar assert.isNaN
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        //assert
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      
      //done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      
      //done();
    });
    
    test('Mi to Km', function(done) {
      
      //done();
    });
    
    test('Km to Mi', function(done) {
      
      //done();
    });
    
    test('Lbs to Kg', function(done) {
      
      //done();
    });
    
    test('Kg to Lbs', function(done) {
      
      //done();
    });
    
  });

});