/*
*
*
*       Complete the handler logic below
*       
*       
*/

// A mejorar: reorganizar el chequeo de si el input es válido para número y unidad en una sola parte del código y no tan repartida.

const UNITS = { 'gal': 'l',
                'lbs': 'kg',
                'mi': 'km',
                'l': 'gal',
                'kg': 'lbs',
                'km': 'mi'
              };

const UNITS_IN_WORDS = { "mi" : "miles",
                         "l": "liters",
                         "gal": "gallons",
                         "kg": "kilograms",
                         "km": "kilometers",
                         "lbs": "pounds"
                       };

const INVALID_NUMBER_PATTERN = /\d+\W*\d*\/\d+\W*\d*\/\d+\W*\d*/;

const cadenaFraccionANumero = fraccion => {
  //requiere que fracción sea una cadena que contenga 'x/y'
  let numeros = fraccion.split('/');
  let numerador = Number(numeros[0]);
  let denominador = Number(numeros[1]);
  return numerador / denominador;
};

function ConvertHandler() {

  this.UNITS = UNITS;
  
  this.getNum = function(input) {
    let indiceTope = input.search(/[A-Za-z]/); // Busca la primer ocurrencia de una letra
    // Sí o sí tiene que haber una letra en un input válido
    // Puede ser que el índiceTope sea 0, es decir que no se pasó un número, sólo una unidad.
    
    // 0 <= indiceTope < input.length || indiceTope = -1
    
    let result = input.substring(0, indiceTope); // result puede ser una cadena vacía
    if(result === ''){
      return 1;
    }
    else if (result.includes('/') && !INVALID_NUMBER_PATTERN.test(result)){
      return cadenaFraccionANumero(result);   
    }
    else {
      return Number(result);  //esto puede ser NaN si hay caracteres no alfanuméricos que no conformen un número válido. Puedo usar esto para chequear si es un initNum válido.
    }
  };
  
  this.getUnit = function(input) {
    let indiceTope = input.search(/[A-Za-z]/);
    let result = input.substring(indiceTope);
    return result.toLowerCase(); // ¿Y si no hay ninguna letra en input? Como search devolvería -1, input.substring(-1) funciona como input.substring(0) es decir que devuelve toda la cadena, que no tendría letras, y sería inválida, pero acá no se está asegurando. <= OJO
    // ¿Dónde conviene chequear si la unidad es válida?
  };

  this.getReturnUnit = function(initUnit) {
    // Requiere que initUnit esté en lowercase.
    // getUnit asegura un resultado en lowercase
    
    var result = UNITS[initUnit]; // ¿Qué pasa si initUnit no es una clave del diccionario? Devuelve undefined
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = UNITS_IN_WORDS[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    // Se supone que initNum e initUnit tienen el formato adecuado.
    // Requiere que initNum sea de tipo Number
    // Requiere que initUnit sea String y esté en lowercase
    // Requiere que initUnit sea una de las posibles unidades válidas
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result;
    
    switch(initUnit){
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;   
        break;
    }    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // El resultado tiene que estar redondeado a 5 decimales
    var result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;