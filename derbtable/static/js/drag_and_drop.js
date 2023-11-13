document.addEventListener('DOMContentLoaded', function () {
    var draggableComponent = document.getElementById('draggable-component');
    var preguntaCounter = 1;
    var alturaPregunta = 100;
    var preguntas = [];

    draggableComponent.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'draggable');
    });

    // Botón para agregar formulario
    var agregarFormularioButton = document.getElementById('agregarFormulario');
    agregarFormularioButton.addEventListener('click', function () {
        // Crea un nuevo container
        var newContainer = document.createElement('div');
        newContainer.classList.add('drop-container', 'bg-light', 'border', 'p-3');
        var newContainerId = 'drop-container-' + (preguntaCounter + 3); // Incrementa para evitar colisiones con los primeros tres contenedores
        newContainer.id = newContainerId;

        // Añade el texto predeterminado al nuevo container
        var defaultText = document.createElement('p');
        defaultText.textContent = 'Arrastre aquí el formulario';
        newContainer.appendChild(defaultText);

        // Añade el nuevo container al DOM después del último contenedor existente
        var existingContainers = document.querySelectorAll('.drop-container');
        var lastContainer = existingContainers[existingContainers.length - 1];
        lastContainer.parentNode.insertBefore(newContainer, lastContainer.nextSibling);

        // Configura eventos de drag and drop para el nuevo container
        configureDropContainer(newContainer);

        // Realiza la lógica adicional para manejar el formulario dentro del nuevo container si es necesario
        // ...
    });

    // Configura eventos de drag and drop para contenedores existentes
    var dropContainers = document.querySelectorAll('.drop-container');
    dropContainers.forEach(function (dropContainer) {
        configureDropContainer(dropContainer);
    });

    // Botón para guardar preguntas
    var guardarIndexButton = document.getElementById('guardar');
    guardarIndexButton.addEventListener('click', function () {
        // Determina qué APIs usar
        var apiUrl1 = '/api/questions/';
        var apiUrl2 = '/api/questions2/';

        // Llama a la función para guardar preguntas para cada contenedor
        guardarPreguntas(apiUrl1, 'drop-container-1');
        guardarPreguntas(apiUrl2, 'drop-container-2');

        // Llama a la función para guardar preguntas para los nuevos contenedores
        for (var i = 4; i <= preguntaCounter + 3; i++) {
            var containerId = 'drop-container-' + i;
            guardarPreguntas(apiUrl1, containerId);  // Puedes ajustar la API según tus necesidades
        }
    });

    function configureDropContainer(container) {
        container.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        container.addEventListener('drop', function (e) {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'draggable') {
                // Realiza una solicitud AJAX para cargar la vista Component_questions
                $.ajax({
                    url: "/ver_preguntas/",
                    type: 'GET',
                    success: function (data) {
                        container.innerHTML = data;

                        // Obtiene el contenedor del formulario
                        var formContainer = container.querySelector('#formulario-container');
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
    }

    function guardarPreguntas(apiUrl, containerId) {
        preguntas = [];

        for (var i = 1; i <= preguntaCounter; i++) {
            var preguntaContainer = document.querySelector('#seccion-pregunta-' + i);

            // Agrega preguntas en un contenedor específico
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
