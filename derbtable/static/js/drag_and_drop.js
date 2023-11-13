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

                        // Obtiene el contenedor del formulario
                        var formContainer = dropContainer.querySelector('#formulario-container');
                        var form = formContainer.querySelector('form');

                        // Eventos del formulario
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
                    }
                });
            }
        });
    });

    // BoTon para guardar preguntas
    var guardarIndexButton = document.getElementById('guardar');
    guardarIndexButton.addEventListener('click', function () {
        // Determina que apis usar
        var apiUrl1 = '/api/questions/';
        var apiUrl2 = '/api/questions2/';

        // Llama a la función para guardar preguntas para cada contenedor
        guardarPreguntas(apiUrl1, 'drop-container-1');
        guardarPreguntas(apiUrl2, 'drop-container-2');
    });

    function guardarPreguntas(apiUrl, containerId) {
        preguntas = [];

        for (var i = 1; i <= preguntaCounter; i++) {
            var preguntaContainer = document.querySelector('#seccion-pregunta-' + i);

            // Agrega preguntas en un contenedor especifico
            if (preguntaContainer.closest('.drop-container').id === containerId) {
                var pregunta = {
                    text: preguntaContainer.querySelector('input[name="text"]').value,
                    question_type: preguntaContainer.querySelector('input[name="question_type"]').value,
                    descripcion: preguntaContainer.querySelector('input[name="descripcion"]').value,
                    condicion: preguntaContainer.querySelector('input[name="condicion"]').value
                };
                preguntas.push(pregunta);
            }
        }

        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: JSON.stringify(preguntas),
            contentType: 'application/json',
            success: function (data) {
                // SweetAlert para indicar que las preguntas se guardaron con éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Preguntas guardadas con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });


                setTimeout(function () {
                    location.reload();
                }, 1500);
            },
            error: function (error) {
                console.error('Error al guardar preguntas', error);
            }
        });
    }
});
