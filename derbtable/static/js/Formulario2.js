const iconoApertura2 = document.getElementById('icono-apertura');
const tablaPreguntasRespuestas2 = document.getElementById('tabla-preguntas-respuestas2');
const miFormulario2 = document.getElementById('miFormulario');
const eliminarTodoButton2 = document.getElementById('eliminarTodo');

// Variables para guardar las respuestas específicas de responder_preguntas2
const storedResponses2 = JSON.parse(localStorage.getItem('responses_responder_preguntas2')) || [];

// Alternar la tabla de respuestas al hacer clic en el icono
iconoApertura2.addEventListener('click', function() {
    if (tablaPreguntasRespuestas2.style.display === 'none') {
        tablaPreguntasRespuestas2.style.display = 'block';
        iconoApertura2.className = 'fas fa-chevron-up';
    } else {
        tablaPreguntasRespuestas2.style.display = 'none';
        iconoApertura2.className = 'fas fa-chevron-down';
    }
});

// Función para eliminar una fila de la tabla
function deleteTableRow2(responseId) {
    // Elimina la respuesta
    const updatedResponses2 = storedResponses2.filter(response => response.id != responseId);
    localStorage.setItem('responses_responder_preguntas2', JSON.stringify(updatedResponses2));

    // Actualiza la tabla
    const row = document.querySelector(`tr[data-response-id="${responseId}"]`);
    if (row) {
        row.remove();
    }
}

// Agrega las respuestas a la tabla
const agregarFilaButton2 = document.getElementById('agregarFila');
agregarFilaButton2.addEventListener('click', function() {
    // Obtiene las respuestas
    const respuestaData = new FormData(miFormulario2);
    const newRow = document.createElement('tr');
    newRow.dataset.responseId = storedResponses2.length;

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

    storedResponses2.push({ id: newRow.dataset.responseId, values: values });
    localStorage.setItem('responses_responder_preguntas2', JSON.stringify(storedResponses2));

    // Agregar la fila a la tabla
    const respuestaBody2 = document.getElementById('respuesta-body');
    respuestaBody2.appendChild(newRow);

    deleteButton.addEventListener('click', function() {
        const responseId = newRow.dataset.responseId;
        deleteTableRow2(responseId);
    });
});

// Carga respuestas almacenadas
window.addEventListener('load', function() {
    const respuestaBody2 = document.getElementById('respuesta-body');
    storedResponses2.forEach(response => {
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

        respuestaBody2.appendChild(newRow);

        deleteButton.addEventListener('click', function() {
            const responseId = newRow.dataset.responseId;
            deleteTableRow2(responseId);
        });
    });
});

// Agrega evento al botón "Eliminar todo"
eliminarTodoButton2.addEventListener('click', function() {
    // Elimina todas las filas de respuestas
    const respuestaBody2 = document.getElementById('respuesta-body');
    while (respuestaBody2.firstChild) {
        respuestaBody2.removeChild(respuestaBody2.firstChild);
    }

    localStorage.removeItem('responses_responder_preguntas2');
});
