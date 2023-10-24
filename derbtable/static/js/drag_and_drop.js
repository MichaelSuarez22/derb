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
            // Obtener el ancho y alto del contenedor central
            var containerWidth = dropContainer.clientWidth;
            var containerHeight = dropContainer.clientHeight;

            // Realizar una solicitud AJAX para cargar la vista responder_preguntas
            $.ajax({
                url: "/responder_preguntas/",
                type: 'GET',
                success: function (data) {

                    dropContainer.innerHTML = data;


                    var formContainer = document.getElementById('formulario-container');
                    var form = formContainer.querySelector('form');

                    // Ajusta el tamaño del formulario al contenedor
                    if (form) {
                        form.style.width = '100%'; // Asegura que el formulario ocupe todo el ancho del contenedor
                        form.style.height = '100%'; // Asegura que el formulario ocupe todo el alto del contenedor
                    }
                }
            });


            draggableComponent.style.display = "none";
        }
    });
});






