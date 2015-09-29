//Suma si son numeros
function sum(){
        var valorA = document.getElementById('a').value;
        var valorB = document.getElementById('b').value;

        var a = parseInt(valorA);
        var b = parseInt(valorB);

        if (!isNumber(a) && !isNumber(b)){
          alert("a and b should be numbers");
        }
        else if(isNumber(a) && !isNumber(b)){
          alert("b should be a number");
        }
        else if(!isNumber(a) && isNumber(b)){
          alert("a should be a number");
        }
        else{
        var suma = parseInt(valorA) + parseInt(valorB);
        document.getElementById('suma').value = suma;
        }
    }

//Es un objeto un numero
function isNumber(obj){
  return !isNaN(parseFloat(obj))
  }
