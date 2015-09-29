//Es un objeto un numero
function isNumber(obj){
  return !isNaN(parseFloat(obj))
  }

//Tabla

function updateTotal() {
    producto = document.getElementById('tablaProductos').getElementsByClassName('producto');
    totalGeneral = 0;
    for (i = 0; i < producto.length; i++){
      cantidad = producto[i].getElementsByClassName('cantidad')[0].textContent;
      precioUnitario = producto[i].getElementsByClassName('precio_unitario')[0].textContent;
      total = producto[i].getElementsByClassName('precio_total')[0];
      total.textContent = parseInt(cantidad) + parseInt(precioUnitario);
      totalGeneral = totalGeneral + parseInt(cantidad) + parseInt(precioUnitario);
      console.log(totalGeneral);
    }

    totalInput = document.getElementById('tablaProductos').getElementsByClassName('total_pedido')[0];
    totalInput.textContent = totalGeneral;

}
