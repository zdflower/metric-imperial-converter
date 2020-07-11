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
      //console.log(convertHandler.getNum(input));
      // el problema no está acá si no en convertHandler que no maneja el caso de convertir una cadena 'número/número' a tipo numérico.
      //assert.equals(compareFloats(convertHandler.getNum(input), 0.5, 0.1), true);
      assert.isOk(compareFloats(convertHandler.getNum(input), 0.5, 0.1))
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '2.5/6gal';
      //acá podría usar assert.approximately si lo terminara de entender
      //assert.equals(compareFloats(convertHandler.getNum(input), 0.41666, 0.1), true);
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
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele.toLowerCase()), input[i].toLowerCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      //¿este sería el caso en que tenés una cadena que no se corresponde con ninguna de las claves de  convertHandler.UNITS?
      //ok, y entonces qué tengo que evaluar, si input tiene una unidad que es cualquiera, cuál sería la respuesta correcta de convertHandler.getUnit(input)?
      
      //según como tengo escrita la función, si input = '12garlochas' debería devolver 'garlochas'
      let input = '12garlochas';
      let expected = 'garlochas';
      assert.equal(convertHandler.getUnit(input), expected);
      done();
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
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        //console.log(`${ele} => ${expect[i]}`);
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
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
      var input = [18, 'l'];
      var expected = 4.7;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [2, 'mi'];
      var expected = 2 * 1.60934;
      //console.log(input[0])
      //console.log(expected)
      //console.log(convertHandler.convert(input[0], input[1]))
      //assert.isOk(compareFloats(input, expected, 0.1))
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [18, 'km'];
      var expected = 18 / 1.60934;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [18, 'lbs'];
      var expected = 18 * 0.453592;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [18, 'kg'];
      var expected = 18 / 0.453592;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });
  
  suite('Function compareFloats(f1,f2,tolerance)', function() {
    test('1/2 y 0.5 con 0.1 de tolerancia', function(done){
      let x = 1/2;
      let y = 0.5;
      let epsilon = 0.1
      let result = true;//Math.abs(x - y) < epsilon
      //console.log(compareFloats(x,y,epsilon))
      //console.log(Math.abs(x-y) < epsilon)
      assert.equal(compareFloats(x,y,epsilon), result);
      done();
    })
  })

});