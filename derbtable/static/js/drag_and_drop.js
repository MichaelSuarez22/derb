document.addEventListener('DOMContentLoaded', function () {
    var draggableComponent = document.getElementById('draggable-component');
    var dropContainers = document.querySelectorAll('.drop-container');
    var preguntaCounter = 1;
    var alturaPregunta = 100;
    var preguntas = [];

    draggableComponent.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'draggable');
    });

    dropContainers.forEach(function (dropContainer) {
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
                        var formContainer = dropContainer.querySelector('#formulario-container');
                        var form = formContainer.querySelector('form');

                        // Resto del código para configurar los eventos dentro del formulario
                        var agregarOtraPreguntaButton = formContainer.querySelector('#agregarOtraPregunta');
                        agregarOtraPreguntaButton.addEventListener('click', function () {
                            var preguntaContainer = formContainer.querySelector('#seccion-pregunta-1').cloneNode(true);
                            preguntaCounter++;
                            preguntaContainer.id = 'seccion-pregunta-' + preguntaCounter;

                            var inputs = preguntaContainer.querySelectorAll('input');
                            inputs.forEach(function (input) {
                                input.value = '';
                            });

                            form.appendChild(preguntaContainer);
                            formContainer.style.maxHeight = (containerHeight + preguntaCounter * alturaPregunta) + 'px';
                        });

                        var guardarButton = formContainer.querySelector('#guardar');
                        guardarButton.addEventListener('click', function () {
                            var apiUrl;

                            if (dropContainer.id === 'drop-container-1') {
                                apiUrl = '/api/questions/';
                            } else if (dropContainer.id === 'drop-container-2') {
                                apiUrl = '/api/questions2/';
                            } else {
                                // Agrega lógica para otro contenedor si es necesario
                            }

                            guardarPreguntas(apiUrl);
                        });

                        function guardarPreguntas(apiUrl) {
                            preguntas = [];

                            for (var i = 1; i <= preguntaCounter; i++) {
                                var preguntaContainer = formContainer.querySelector('#seccion-pregunta-' + i);
                                var pregunta = {
                                    text: preguntaContainer.querySelector('input[name="text"]').value,
                                    question_type: preguntaContainer.querySelector('input[name="question_type"]').value,
                                    descripcion: preguntaContainer.querySelector('input[name="descripcion"]').value,
                                    condicion: preguntaContainer.querySelector('input[name="condicion"]').value
                                };
                                preguntas.push(pregunta);
                            }

                            $.ajax({
                                url: apiUrl,
                                type: 'POST',
                                data: JSON.stringify(preguntas),
                                contentType: 'application/json',
                                success: function (data) {
                                    console.log('Preguntas guardadas con éxito');
                                },
                                error: function (error) {
                                    console.error('Error al guardar preguntas', error);
                                }
                            });
                        }
                    }
                });
            }
        });
    });
});
