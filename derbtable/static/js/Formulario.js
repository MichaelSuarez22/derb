//const iconoApertura = document.getElementById('icono-apertura');
//const tablaPreguntasRespuestas = document.getElementById('tabla-preguntas-respuestas');
//const miFormulario = document.getElementById('miFormulario');
//const eliminarTodoButton = document.getElementById('eliminarTodo');
//
//// Variables para almacenar las respuestas localmente
//const storedResponses = JSON.parse(localStorage.getItem('responses')) || [];
//
//// Alternar la tabla de respuestas al hacer clic en el icono
//iconoApertura.addEventListener('click', function() {
//    if (tablaPreguntasRespuestas.style.display === 'none') {
//        tablaPreguntasRespuestas.style.display = 'block';
//        iconoApertura.className = 'fas fa-chevron-up';
//    } else {
//        tablaPreguntasRespuestas.style.display = 'none';
//        iconoApertura.className = 'fas fa-chevron-down';
//    }
//});
//
//// Función para eliminar una fila de la tabla y la respuesta en el almacenamiento local
//function deleteTableRow(responseId) {
//    // Eliminar la respuesta del almacenamiento local
//    const updatedResponses = storedResponses.filter(response => response.id != responseId);
//    localStorage.setItem('responses', JSON.stringify(updatedResponses));
//
//    // Actualizar la tabla
//    const row = document.querySelector(`tr[data-response-id="${responseId}"]`);
//    if (row) {
//        row.remove();
//    }
//}
//
//// Agregar evento al botón "Agregar"
//const agregarFilaButton = document.getElementById('agregarFila');
//agregarFilaButton.addEventListener('click', function() {
//    // Obtener los valores del formulario y agregarlos a la tabla
//    const respuestaData = new FormData(miFormulario);
//    const newRow = document.createElement('tr');
//    newRow.dataset.responseId = storedResponses.length;
//
//    // Agregar el botón de eliminación
//    const deleteButton = document.createElement('button');
//    deleteButton.className = 'btn btn-danger delete-response';
//    deleteButton.textContent = 'Eliminar';
//    newRow.insertCell(0).appendChild(deleteButton);
//
//    // Almacenar los valores en el almacenamiento local
//    const values = [];
//    respuestaData.forEach((value, key) => {
//        if (key !== 'csrfmiddlewaretoken') {
//            newRow.insertCell().textContent = value;
//            values.push(value);
//        }
//    });
//
//    storedResponses.push({ id: newRow.dataset.responseId, values: values });
//    localStorage.setItem('responses', JSON.stringify(storedResponses));
//
//    // Agregar la fila a la tabla
//    const respuestaBody = document.getElementById('respuesta-body');
//    respuestaBody.appendChild(newRow);
//
//    // Agregar evento al botón de eliminación de la fila recién agregada
//    deleteButton.addEventListener('click', function() {
//        const responseId = newRow.dataset.responseId;
//        deleteTableRow(responseId);
//    });
//});
//
//// Cargar respuestas almacenadas en el almacenamiento local al cargar la página
//window.addEventListener('load', function() {
//    const respuestaBody = document.getElementById('respuesta-body');
//    storedResponses.forEach(response => {
//        const newRow = document.createElement('tr');
//        newRow.dataset.responseId = response.id;
//
//        // Agregar el botón de eliminación
//        const deleteButton = document.createElement('button');
//        deleteButton.className = 'btn btn-danger delete-response';
//        deleteButton.textContent = 'Eliminar';
//        newRow.insertCell(0).appendChild(deleteButton);
//
//        // Agregar las respuestas a la fila
//        response.values.forEach(value => {
//            newRow.insertCell().textContent = value;
//        });
//
//        respuestaBody.appendChild(newRow);
//
//        // Agregar evento al botón de eliminación de la fila cargada
//        deleteButton.addEventListener('click', function() {
//            const responseId = newRow.dataset.responseId;
//            deleteTableRow(responseId);
//        });
//    });
//});
//
//// Agregar evento al botón "Eliminar todo"
//eliminarTodoButton.addEventListener('click', function() {
//    // Eliminar todas las filas de respuestas
//    const respuestaBody = document.getElementById('respuesta-body');
//    while (respuestaBody.firstChild) {
//        respuestaBody.removeChild(respuestaBody.firstChild);
//    }
//    // Limpiar el array de respuestas almacenadas localmente
//    localStorage.removeItem('responses');
//});



const iconoApertura = document.getElementById('icono-apertura');
const tablaPreguntasRespuestas = document.getElementById('tabla-preguntas-respuestas');
const miFormulario = document.getElementById('miFormulario');
const eliminarTodoButton = document.getElementById('eliminarTodo');

// Variables para guardar las respuestas
const storedResponses = JSON.parse(localStorage.getItem('responses')) || [];

// Alternar la tabla de respuestas al hacer clic en el icono
iconoApertura.addEventListener('click', function() {
    if (tablaPreguntasRespuestas.style.display === 'none') {
        tablaPreguntasRespuestas.style.display = 'block';
        iconoApertura.className = 'fas fa-chevron-up';
    } else {
        tablaPreguntasRespuestas.style.display = 'none';
        iconoApertura.className = 'fas fa-chevron-down';
    }
});

// Función para eliminar una fila de la tabla
function deleteTableRow(responseId) {
    // Elimina la respuesta
    const updatedResponses = storedResponses.filter(response => response.id != responseId);
    localStorage.setItem('responses', JSON.stringify(updatedResponses));

    // Actualiza la tabla
    const row = document.querySelector(`tr[data-response-id="${responseId}"]`);
    if (row) {
        row.remove();
    }
}

// Agrega las respuestas a la tabla
const agregarFilaButton = document.getElementById('agregarFila');
agregarFilaButton.addEventListener('click', function() {
    // Obtiene las respuestas
    const respuestaData = new FormData(miFormulario);
    const newRow = document.createElement('tr');
    newRow.dataset.responseId = storedResponses.length;

    // Botón de eliminación
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger delete-response';
    deleteButton.textContent = 'Eliminar';
    newRow.insertCell(0).appendChild(deleteButton);

    // Almacenar los valores
    const values = [];
    respuestaData.forEach((value, key) => {
        if (key !== 'csrfmiddlewaretoken') {
            newRow.insertCell().textContent = value;
            values.push(value);
        }
    });

    storedResponses.push({ id: newRow.dataset.responseId, values: values });
    localStorage.setItem('responses', JSON.stringify(storedResponses));

    // Agregar la fila a la tabla
    const respuestaBody = document.getElementById('respuesta-body');
    respuestaBody.appendChild(newRow);

    deleteButton.addEventListener('click', function() {
        const responseId = newRow.dataset.responseId;
        deleteTableRow(responseId);
    });
});

// Carga respuestas almacenadas
window.addEventListener('load', function() {
    const respuestaBody = document.getElementById('respuesta-body');
    storedResponses.forEach(response => {
        const newRow = document.createElement('tr');
        newRow.dataset.responseId = response.id;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger delete-response';
        deleteButton.textContent = 'Eliminar';
        newRow.insertCell(0).appendChild(deleteButton);

        // Agrega las respuestas a la fila
        response.values.forEach(value => {
            newRow.insertCell().textContent = value;
        });

        respuestaBody.appendChild(newRow);

        deleteButton.addEventListener('click', function() {
            const responseId = newRow.dataset.responseId;
            deleteTableRow(responseId);
        });
    });
});

// Agrega evento al botón "Eliminar todo"
eliminarTodoButton.addEventListener('click', function() {
    // Elimina todas las filas de respuestas
    const respuestaBody = document.getElementById('respuesta-body');
    while (respuestaBody.firstChild) {
        respuestaBody.removeChild(respuestaBody.firstChild);
    }

    localStorage.removeItem('responses');
});
