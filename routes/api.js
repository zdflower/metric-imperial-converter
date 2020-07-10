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

// ¿dónde ubico código para "atrapar" posibles errores y que no salgan directamente en el navegador y los maneje por otro lado?

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  //Revisar si estas funciones chequean correctamente la validez del número y de la unidad
  
  // qué pasa con cada uno de estos casos de input:
  
  // válidos ambos
  // /api/convert?input=4gal
  // /api/convert?input=1/2km
  // /api/convert?input=5.4/3lbs
  // /api/convert?input=kg
  
  // inválido el número
  
  // inválida la unidad
  
  // inválidos ambos
  
  
  // ¿qué serían:
  // /api/convert?input=1- 
  // /api/convert?input=1-x-
  // ?
  
const esValidoNumero = (n) => {
  // n es válido si
  // n no es NaN y
  // n es de tipo numérico y
  // n es mayor que cero
  return !isNaN(n) && typeof n === 'number' && n > 0;
};

const esValidaUnidad = (s) => {
  // TO DO
  // s es válido si:
  // es una cadena y
  // es una de las claves del objeto ConvertHandler.UNITS
  return s in convertHandler.UNITS;
};

    
  app.route('/api/convert')
    .get(function (req, res){
    
    // ¿acá se chequea que el input sea válido? y si todo está bien, continúa con la conversión
    // y si no responde que es inválido?
    
    // Sí. Pienso que es acá. Me parece que puedo usar express-validator 
    // https://express-validator.github.io/docs/
    
    
    // si buscamos el índice del primer carácter del input, lo que está adelante debería ser el inputNum,
// y lo demás sería la unidad
// Todo esto una vez que nos aseguramos que el formato del input es el adecuado.

//qué input no sería válido
//qué input number no sería válido
//qué input unit no sería válida

//sería válido un input sin número pero con una unidad de las aceptadas.

//¿habría que limitar el máximo/mínimo valor a convertir? ¿se podría romper la aplicación con algún caso extremo?

// un patrón válido sería algo así: 0 o varios números seguidos de 0 o un . o un / seguido de uno o más números (en el caso de que antes hubiera . o / y si es / entonces no puede seguir un 0)
// y luego tiene que seguir uno o más caractéres alfabéticos, más precisamente coincidentes con: lbs o gal o km o mi o L o kg

    //¿habría que "sanitizar" el input?
    
    
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
    // si no
    // responder, según el caso:
    // "invalid unit"
    // "invalid number"
    // "invalid unit and number"
   else if (validezNumero) {
      res.send("invalid unit");
   } 
   else if (validezUnidad) {
      res.send("invalid number");
   }
   else {
      //ambos son inválidos
      res.send("invalid unit and number");
    }
  });
    
};
