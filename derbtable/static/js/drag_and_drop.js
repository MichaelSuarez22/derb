
document.addEventListener('DOMContentLoaded', function () {
    var draggableComponent = document.getElementById('draggable-component');
    var dropContainer = document.getElementById('drop-container');
    var preguntaCounter = 1; // Contador para identificar las preguntas
    var alturaPregunta = 100; // Altura estimada de una pregunta
    var preguntas = []; // Arreglo para almacenar las preguntas

    draggableComponent.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'draggable');
    });

    dropContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    dropContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        if (e.dataTransfer.getData('text/plain') === 'draggable') {
            // Realiza una solicitud AJAX para cargar la vista Component_questions
            $.ajax({
                url: "/ver_preguntas/",
                type: 'GET',
                success: function (data) {
                    dropContainer.innerHTML = data;

                    // Obtén el contenedor del formulario
                    var formContainer = document.getElementById('formulario-container');
                    var form = formContainer.querySelector('form');

                    // Agregar un manejador de eventos al botón "Agregar otra pregunta"
                    var agregarOtraPreguntaButton = document.getElementById('agregarOtraPregunta');
                    agregarOtraPreguntaButton.addEventListener('click', function () {
                        // Clona el contenedor de pregunta
                        var preguntaContainer = document.getElementById('seccion-pregunta-1').cloneNode(true);

                        // Incrementa el contador y asigna un nuevo id al contenedor clonado
                        preguntaCounter++;
                        preguntaContainer.id = 'seccion-pregunta-' + preguntaCounter;

                        // Limpia los campos del formulario clonado
                        var inputs = preguntaContainer.querySelectorAll('input');
                        inputs.forEach(function (input) {
                            input.value = '';
                        });

                        // Agrega el contenedor clonado al formulario
                        form.appendChild(preguntaContainer);

                        // Ajusta la altura máxima del formulario-container si es necesario
                        formContainer.style.maxHeight = (containerHeight + preguntaCounter * alturaPregunta) + 'px';
                    });

                    // Agregar un manejador de eventos al botón "Guardar"
                    var guardarButton = document.getElementById('guardar');
                    guardarButton.addEventListener('click', function () {
                        guardarPreguntas();
                    });

                    // Implementa la lógica para guardar las preguntas
                    function guardarPreguntas() {
                        preguntas = []; // Limpiar el arreglo de preguntas

                        for (var i = 1; i <= preguntaCounter; i++) {
                            var preguntaContainer = document.getElementById('seccion-pregunta-' + i);
                            var pregunta = {
                                text: preguntaContainer.querySelector('input[name="text"]').value,
                                question_type: preguntaContainer.querySelector('input[name="question_type"]').value,
                                descripcion: preguntaContainer.querySelector('input[name="descripcion"]').value,
                                condicion: preguntaContainer.querySelector('input[name="condicion"]').value
                            };
                            preguntas.push(pregunta);
                        }

                        // Realiza una solicitud AJAX para guardar las preguntas en el API
                        $.ajax({
                            url: "/api/questions/",
                            type: 'POST',
                            data: JSON.stringify(preguntas),
                            contentType: 'application/json',
                            success: function (data) {
                                // Maneja la respuesta del servidor aquí si es necesario
                                console.log('Preguntas guardadas con éxito');
                            },
                            error: function (error) {
                                // Maneja errores si es necesario
                                console.error('Error al guardar preguntas', error);
                            }
                        });
                    }
                }
            });
        }
    });
});


