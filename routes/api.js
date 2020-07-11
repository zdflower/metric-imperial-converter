/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  const esValidoNumero = n => {
    // n es válido si
    // n no es NaN y
    // n es de tipo numérico y
    // n es mayor que cero
    return !isNaN(n) && typeof n === 'number' && n > 0;
  };

  const esValidaUnidad = s => {
    // s es válido si:
    // es una cadena y
    // es una de las claves del objeto ConvertHandler.UNITS
    return s in convertHandler.UNITS;
  };
    
  app.route('/api/convert')
    .get(function (req, res){
    
      var input = req.query.input;
    
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);

      let validezNumero = esValidoNumero(initNum);
      let validezUnidad = esValidaUnidad(initUnit);
    
      if (validezNumero && validezUnidad){
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
        res.json(
          { 
            "initNum": initNum,
            "initUnit": initUnit,
            "returnNum": returnNum,
            "returnUnit": returnUnit,
            "string": toString
          });
      }
     else if (validezNumero) {
       res.status(400).json({"error": "invalid unit"});
     } 
     else if (validezUnidad) {
       res.status(400).json({"error":"invalid number"});
     }
     else {
       //ambos son inválidos
       res.status(400).json({"error" :"invalid unit and number"});
     }
  });
};