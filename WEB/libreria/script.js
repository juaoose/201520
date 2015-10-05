// Ejemplo: lista de libros
// ========================

// == variables

var libros = [];
var libros_seleccionados = [];


// == funciones

// para mostrar una plantilla
// - Obtiene la plantilla
//     fuentePlantilla = $("#template").html();
// - Compila la plantilla
//     var plantilla = Handlebars.compile( fuentePlantilla );
// - Pasa los datos a la plantilla
//     var html = plantilla( tareas );
// - Agrega el resultado a la página
//     $('#placeholder').html( html );


// == asigna los eventos

// al cargar la página
$(document).ready(function(){
  
  // cargar el JSON con datos
  $.getJSON( 
    "books.json", 
    function( data ) {
      libros = data;
      console.log( data );
      mostrarLibros();
    }
  );
  
  // muestra el listado en pantalla
  
});

function mostrarLibros(){
	var fuentePLantilla = $("#template").html();
	var plantilla = Handlebars.compile(fuentePLantilla);
	var html = plantilla(libros);
	$("#lista_libros").html(html);
}

