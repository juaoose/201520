var products = [
    { producto: "Camiseta", cantidad:3, precio:4000 },
    { producto: "Pantalon", cantidad:5, precio:8000 },
    { producto: "Cerro" , cantidad: 10, precio: 5000},
];


function addProduct( ) {
    product = document.getElementsByClassName('new_product')[0];
    console.log(product);
    var new_product = { producto: product.getElementsByClassName('nombre_producto')[0].value, 
    					cantidad: product.getElementsByClassName('cantidad')[0].value, 
    					precio: product.getElementsByClassName('precio_unitario')[0].value };

    //Check if not empty
    if (new_product){
    products.push( new_product );
    }
}

function removeProduct(product_number)
{
	if ( product_number > -1 && product_number < products.length ) {
    products.splice( product_number, 1 );
    console.log("Just deleted prduct number: "+(product_number+1));
    }
}


function update() {

    //Update layout	

	var htmlLista = "";
	htmlLista     += "<!-- Titulos de la tabla -->";
	htmlLista     += "                        <thead>";
	htmlLista     += "                        <tr>";
	htmlLista     += "                            <th>Producto<\/th>";
	htmlLista     += "                            <th>Cantidad<\/th>";
	htmlLista     += "                            <th class=\"text-center\">Precio<\/th>";
	htmlLista     += "                            <th class=\"text-center\">Total<\/th>";
	htmlLista     += "                            <th> <\/th>";
	htmlLista     += "                        <\/tr>";
	htmlLista     += "                        <\/thead>";
	htmlLista     += "";
	htmlLista     += "                        <!-- Cuerpo de la tabla -->";
	htmlLista     += "                        <tbody>";
	htmlLista     += "";
	htmlLista     += "                        <!-- Formulario nuevo producto -->";
	htmlLista     += "                        <tr class=\"new_product\">";
	htmlLista     += "                            <td class=\"col-sm-8 col-md-6\">";
	htmlLista     += "                                <input type=\"text\" class=\"form-control nombre_producto\"";
	htmlLista     += "                                       id=\"nombre_producto\" name=\"nombre_producto\"";
	htmlLista     += "                                       placeholder=\"Producto\">";
	htmlLista     += "                            <\/td>";
	htmlLista     += "                            <td class=\"col-sm-1 col-md-1\" style=\"text-align: center\">";
	htmlLista     += "                                <input type=\"text\" class=\"form-control cantidad\"";
	htmlLista     += "                                       id=\"cantidad\" name=\"cantidad\"";
	htmlLista     += "                                       placeholder=\"#\">";
	htmlLista     += "                            <\/td>";
	htmlLista     += "                            <td class=\"col-sm-1 col-md-1\">";
	htmlLista     += "                                <input type=\"text\" class=\"form-control precio_unitario\"";
	htmlLista     += "                                       id=\"precio_unitario\" name=\"precio_unitario\"";
	htmlLista     += "                                       placeholder=\"$\">";
	htmlLista     += "                            <\/td>";
	htmlLista     += "                            <td class=\"col-sm-1 col-md-1\">";
	htmlLista     += "                            <\/td>";
	htmlLista     += "";
	htmlLista     += "                            <td class=\"col-sm-1 col-md-1\">";
	htmlLista     += "                                <!-- Boton para agregar el producto al carrito -->";
	htmlLista     += "                                <button type=\"button\" class=\"btn btn-success\" onclick=\"addProduct(), update()\">";
	htmlLista     += "                                    <i class=\"glyphicon glyphicon-plus\"><\/i> Agregar";
	htmlLista     += "                                <\/button>";
	htmlLista     += "                            <\/td>";
	htmlLista     += "                        <\/tr>";

    // arma el HTML de la tabla
    for (var i = 0; i < products.length; i ++ ) {

		htmlLista += "                        <tr class=\"product\">";
		htmlLista += "                            <td class=\"col-sm-8 col-md-6\">";
		htmlLista += "                                <h4 class=\"media-heading producto\">"+ products[i].producto +" <\h4>";
		htmlLista += "                            <\/td>";
		htmlLista += "                            <td class=\"col-sm-1 col-md-1\" style=\"text-align: center\">";
		htmlLista += "                                <strong class=\"cantidad\">"+ products[i].cantidad +"<\/strong>";
		htmlLista += "                            <\/td>";
		htmlLista += "";
		htmlLista += "                            <td class=\"col-sm-1 col-md-1 text-center\">";
		htmlLista += "                                <strong class=\"precio_unitario\">"+ products[i].precio +"<\/strong>";
		htmlLista += "                            <\/td>";
		htmlLista += "                            <td class=\"col-sm-1 col-md-1 text-center\">";
		htmlLista += "                                <strong class=\"precio_total\"><\/strong>";
		htmlLista += "                            <\/td>";
		htmlLista += "";
		htmlLista += "                            <td class=\"col-sm-1 col-md-1\">";
		htmlLista += "";
		htmlLista += "                                <!-- Boton de Remover producto del carrito -->";
		htmlLista += "                                <button type=\"button\" class=\"btn btn-danger\" onclick=\"removeProduct("+i+"), update()\">";
		htmlLista += "                                    <i class=\"glyphicon glyphicon-remove\"><\/i> Remover";
		htmlLista += "                                <\/button>";
		htmlLista += "                            <\/td>";
		htmlLista += "                        <\/tr>";



    }

    //finish HTML for ze table
	htmlLista += "<!-- Total del carrito -->";
	htmlLista += "                        <tr>";
	htmlLista += "                            <td colspan=\"3\"><\/td>";
	htmlLista += "                            <td><h3>Total<\/h3><\/td>";
	htmlLista += "                            <td class=\"text-right\">";
	htmlLista += "                                <h3><strong>";
	htmlLista += "";
	htmlLista += "                                    <!-- Valor total -->";
	htmlLista += "                                    <span id=\"total_carrito\"><\/span>";
	htmlLista += "";
	htmlLista += "                                <\/strong><\/h3>";
	htmlLista += "                            <\/td>";
	htmlLista += "                        <\/tr>";
	htmlLista += "";
	htmlLista += "                        <!-- Botones al final de la tabla -->";
	htmlLista += "                        <tr>";
	htmlLista += "                            <td colspan=\"3\"><\/td>";
	htmlLista += "                            <td>";
	htmlLista += "                                <button type=\"button\" class=\"btn btn-default\">";
	htmlLista += "                                    <i class=\"glyphicon glyphicon-shopping-cart\"><\/i> Seguir Comprando";
	htmlLista += "                                <\/button><\/td>";
	htmlLista += "                            <td>";
	htmlLista += "                                <button type=\"button\" class=\"btn btn-success\">";
	htmlLista += "                                    Pagar <i class=\"glyphicon glyphicon-play\"><\/i>";
	htmlLista += "                                <\/button><\/td>";
	htmlLista += "                        <\/tr>";
	htmlLista += "                        <\/tbody>";


    // coloca el HTML en la lista de tareas
    var task_list = document.getElementById( "productTable" );
    task_list.innerHTML = htmlLista;

    //Update calculations (ESTO DEBERIA IR DESPUES)
    productos = document.getElementById('productTable').getElementsByClassName('product');
    totalGeneral = 0;
    for (i = 0; i < productos.length; i++){
      cantidad = productos[i].getElementsByClassName('cantidad')[0].textContent;
      precioUnitario = productos[i].getElementsByClassName('precio_unitario')[0].textContent;
      total = productos[i].getElementsByClassName('precio_total')[0];
      total.textContent = parseInt(cantidad) * parseInt(precioUnitario);
      totalGeneral = totalGeneral + (parseInt(cantidad) * parseInt(precioUnitario));
      //console.log(totalGeneral);
    }

    totalReal = document.getElementById('total_carrito');
    totalReal.textContent = totalGeneral;

}