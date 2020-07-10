/*
*
*
*       Complete the handler logic below
*       
*       
*/


const UNITS = { 'gal': 'l',
                'lbs': 'kg',
                'mi': 'km',
                'l': 'gal',
                'kg': 'lbs',
                'km': 'mi'
              };

const UNITS_IN_WORDS = { "mi" : "miles",
                         "l": "liters",
                         "gal": "gallons"
                       };
  

const cadenaFraccionANumero = fraccion => {
  //requiere que fracción sea una cadena que contenga 'x/y'
  let numeros = fraccion.split('/');
  let numerador = Number(numeros[0]);
  let denominador = Number(numeros[1]);
  return numerador / denominador;
};

function ConvertHandler() {

  this.UNITS = UNITS;
  
  // acá ya supongo que el input es válido. <-- No para todas las funciones.
  
  this.getNum = function(input) {
    let indiceTope = input.search(/[A-Za-z]/); //busca la primer ocurrencia de una letra
    // sí o sí tiene que haber una letra en un input válido
    //puede ser que el índiceTope sea 0, es decir que no se pasó un número, sólo una unidad.
    
    // 0 <= indiceTope < input.length || indiceTope = -1
    
    let result = input.substring(0, indiceTope); // result puede ser una cadena vacía
    if(result === ''){
      return 1;
    }
    
    //si incluye / pero no incluye dos /
    // o 
    // si parto result en más de dos cadenas mediante el separador '/' entonces es una fracción inválida
    //puedo chequear si result incluye / y después la longitud de hacer split por /
    
    else if (result.includes('/') && !/\d+\/\d+\/\d+/.test(result)){

      //console.log(result)
      //console.log(cadenaFraccionANumero(result))
      return cadenaFraccionANumero(result);
      
    }
    else {
  //console.log(result)
      return Number(result);  //esto puede ser NaN si hay caracteres no alfanuméricos que no conformen un número válido. Puedo usar esto para chequear si es un initNum válido.
      
      // VER por qué para input = '1/2mi' devuelve NaN?
      // RESPUESTA: porque no convierte de string '1/2' a número
      // podrías detectar si en result hay un '/' y en ese caso tomar lo que está antes y dividirlo por lo que está después, cada uno en formato número.
    }
  };
  
  this.getUnit = function(input) {
    let indiceTope = input.search(/[A-Za-z]/); //busca la primer ocurrencia de una letra
    // sí o sí tiene que haber una letra en un input válido
    //puede ser que el índiceTope sea 0, es decir que no se pasó un número, sólo una unidad.
    let result = input.substring(indiceTope);
    
    
    return result.toLowerCase(); // ¿y si no hay ninguna letra en input? OCUPARSE DE ESTO. En algún lado hay que chequear.
  };
  
  // dependiendo de la unidad provista por el usuario, que tiene que ser una de un grupo finito de posibilidades,
  // sabremos la unidad de conversión, puesto que también está predefinido y hay una sola para cada entrada.
  this.getReturnUnit = function(initUnit) {
    // requiere que initUnit esté en lowercase. lo cual vendría asegurado por getUnit, que es como se obtiene la unidad y es el valor que se pasa a esta función
    // pero tal vez no debiera depender de ello?
    
    var result = UNITS[initUnit]; //¿qué pasa si initUnit no es una clave del diccionario?
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = UNITS_IN_WORDS[unit];
    
    return result;
  };
  
  //¿en dónde chequeás que el input sea válido y dónde y cómo respondés que no es válido, cuando sea el caso?
  
  // acá ya suponés que todo tiene el formato adecuado, ya está verificado el input
  // casos para initUnit
  // si initUnit es:
  // lbs: tenés que usar el factor lbsToKg
  // kg: tenés que usar el factor lbsToKg, pero al revés, de forma inversa.
  // gal: tenés que usar el factor galToL
  
  this.convert = function(initNum, initUnit) {
    // requiere que initNum sea de tipo Number
    // requiere que initUnit sea String y esté en lowercase
    // requiere que initUnit sea una de las posibles unidades válidas
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result;
    
    switch(initUnit){
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL; // chequear que esta división da lo que se supone
        break;
      case "lbs":
        result = initNum * lbsToKg;
      case "kg":
        result = initNum / lbsToKg;
      case "mi":
        result = initNum * miToKm;
      case "km":
        result = initNum / miToKm;   
    }    
    
    return result;
  };

  //el resultado tiene que estar redondeado a 5 decimales
   
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
  
    var result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
