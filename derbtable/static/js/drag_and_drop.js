document.addEventListener('DOMContentLoaded', function () {
    var draggableComponent = document.getElementById('draggable-component');
    var preguntaCounter = 1;
    var alturaPregunta = 100;
    var containerHeight = 300; // Ajusta según sea necesario
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

        // Configura eventos para el botón del modal en el nuevo container
        var modalButton = createModalButton(newContainerId);
        newContainer.appendChild(modalButton);

        // Configura eventos del nuevo modal
        configureModal(modalButton, preguntaCounter + 3);

        // Realiza la lógica adicional para manejar el formulario dentro del nuevo container si es necesario
        // ...
    });

    // Configura eventos de drag and drop para contenedores existentes
    var dropContainers = document.querySelectorAll('.drop-container');
    dropContainers.forEach(function (dropContainer) {
        configureDropContainer(dropContainer);

        // Configura eventos para el botón del modal en el contenedor existente
        var modalButton = createModalButton(dropContainer.id);
        dropContainer.appendChild(modalButton);

        // Configura eventos del modal existente
        configureModal(modalButton, preguntaCounter + 3);
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

                        // Evento para el botón "Eliminar"
                        var eliminarPreguntaButton = formContainer.querySelector('#eliminar');
                        eliminarPreguntaButton.addEventListener('click', function () {
                            var preguntaContainers = formContainer.querySelectorAll('.seccion-pregunta');
                            if (preguntaContainers.length > 1) {
                                var lastPreguntaContainer = preguntaContainers[preguntaContainers.length - 1];
                                lastPreguntaContainer.remove();
                                preguntaCounter--;
                                formContainer.style.maxHeight = (containerHeight + preguntaCounter * alturaPregunta) + 'px';
                            }
                        });
                    }
                });
            }
        });
    }

    function configureModal(modalButton, modalIndex) {
        modalButton.addEventListener('click', function () {
            // Configura eventos de apertura del modal
            $('#myModal' + modalIndex).on('show.bs.modal', function (e) {
                // Carga dinámicamente el contenido de responder_preguntas.html en el modal
                $('#modalContent' + modalIndex).load("/responder_preguntas" + modalIndex + "/");
            });

            // Añade clases de estilo a los modales
            $('#myModal' + modalIndex + ' .modal-dialog').addClass('modal-container');
            $('#myModal' + modalIndex + ' .modal-button-container').addClass('modal-button-container');
        });
    }

    function createModalButton(containerId) {
        var modalButtonContainer = document.createElement('div');
        modalButtonContainer.classList.add('modal-button-container');

        var modalButton = document.createElement('button');
        modalButton.type = 'button';
        modalButton.classList.add('btn', 'btn-primary');
        modalButton.setAttribute('data-toggle', 'modal');
        modalButton.setAttribute('data-target', '#myModal' + containerId.split('-')[2]); // Obtén el número del contenedor
        modalButton.textContent = 'Abrir formulario';

        modalButtonContainer.appendChild(modalButton);

        return modalButtonContainer;
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
            },
            error: function (error) {
                // SweetAlert para indicar que hubo un error al guardar las preguntas
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar las preguntas',
                    text: 'Por favor, inténtelo de nuevo',
                    showConfirmButton: true,
                });
            }
        });
    }
});
