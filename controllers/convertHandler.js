/*
*
*
*       Complete the handler logic below
*       
*       
*/

//¿acá se chequea que el input sea válido?

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



function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    
    return result;
  };
  
  // dependiendo de la unidad provista por el usuario, que tiene que ser una de un grupo finito de posibilidades,
  // sabremos la unidad de conversión, puesto que también está predefinido y hay una sola para cada entrada.
  this.getReturnUnit = function(initUnit) {
    var result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
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
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    return result;
  };

  //el resultado tiene que estar redondeado a 5 decimales
  // en algún lado tiene que haber una especie de tabla que sirva para traducir las abreviaturas de las unidades a las palabras enteras para poder construir la cadena.
  // algo así como 
  const tablaUnidades = { "mi" : "miles", "L": "liters", "gal": "gallons"}; // me parece que la función spelloutunit tiene que ver con eso
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${tablaUnidades[initUnit]} converts to ${returnNum} ${tablaUnidades[returnUnit]}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
