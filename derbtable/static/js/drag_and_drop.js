document.addEventListener('DOMContentLoaded', function () {
    var draggableComponent = document.getElementById('draggable-component');
    var dropContainer = document.getElementById('drop-container');

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

                    // Obtén el ancho y alto del contenedor central
                    var containerWidth = dropContainer.clientWidth;
                    var containerHeight = dropContainer.clientHeight;

                    // Ajusta el tamaño del formulario al contenedor
                    if (form) {
                        form.style.width = containerWidth + 'px';
                        form.style.height = containerHeight + 'px';
                    }
                }
            });
        }
    });
});


