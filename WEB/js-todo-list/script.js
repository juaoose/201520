// Ejemplo: To Do List
// ===================

// Listado de tareas

var tareas = [
    { tarea: "Terminar la página Personal", terminado: false },
    { tarea: "Terminar el tema de Bootstrap", terminado: false },
];


// manipulación del listado de tareas
//Removed param cus i can
function agregarTarea( ) {
    tarea = document.getElementById("nuevo_item_text").value;
    var nueva_tarea = { tarea: tarea, terminado: false };

    //Check if not empty
    if (tarea){
    tareas.push( nueva_tarea );
    }
}

function eliminarTarea( numero_tarea ) {
    if ( numero_tarea > -1 && numero_tarea < tareas.length ) {
        tareas.splice( numero_tarea, 1 );
        console.log("Just deleted task number: "+(numero_tarea+1));
    }
}

function mostrarTareasEnConsola() {
    for (var i = 0; i < tareas.length; i ++ ) {
        console.log( tareas[i].tarea + " : terminado = " + tareas[i].terminado );
    }
}

function checkAllDone(){
    for (var i = 0; i < tareas.length ; i++){
        cambiarMarcaTarea(i);

    }
}

function removeAllDone(){
    for (i = 0; i < tareas.length; i++) {
        tarea = tareas[i];
           if (tarea.terminado) { 
            tareas.splice(i, 1);
            i--; 
        }
    }
    
}




//  visualización de las tareas

// NOTA : Si se desean agregar otras acciones a los botones de cada tarea,
// es necesario modificar esta función. Al inicio del taller, el botón con
// el checkmark llama a la función  "cambiarMarcaTarea( i )"

// si se desea ejecutar esta función (y mostrar la tabla) al momento de
// cargar la página, se puede incluir un evento en el <body> de la página
//   <body onload="mostrarTareasEnTabla()" >

function update() {

    var htmlLista = "";

    // arma el HTML de la tabla
    for (var i = 0; i < tareas.length; i ++ ) {

        htmlLista += '<li>';
        htmlLista += '<div class="task-checkbox">';

        htmlLista += '<input type="checkbox" disabled="disabled" class="list-child" value="" '
        htmlLista += tareas[i].terminado ? 'checked ' : '';
        htmlLista += '>';

        htmlLista += '</div>';
        htmlLista += '<div class="task-title">';
        htmlLista += '<span class="task-title-sp">';

        htmlLista += tareas[i].tarea;

        htmlLista += '</span>';
        htmlLista += '<div class="pull-right">';

        htmlLista += '<button class="btn btn-success btn-xs" onclick="cambiarMarcaTarea(' + i + '), update()">';
        htmlLista += '<i class=" fa fa-check"></i></button>';
        htmlLista += '<button class="btn btn-danger btn-xs" onclick="eliminarTarea('+i+'), update()">';
        htmlLista += '<i class="fa fa-trash-o "></i></button>';
        htmlLista += '</div>';
        htmlLista += '</div>';
        htmlLista += '</li>';

    }

    // coloca el HTML en la lista de tareas
    var task_list = document.getElementById( "task-list" );
    task_list.innerHTML = htmlLista;

}

// otros métodos (sin terminar)

function cambiarMarcaTarea( i ) {
    //why u do dis mr chavarriaga
    
    tareas[i].terminado = true;
    console.log( "Changed task number " + (i+1) +" to finished, Task Status: "+tareas[i].terminado );
}