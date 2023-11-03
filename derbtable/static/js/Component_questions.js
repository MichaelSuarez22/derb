document.addEventListener("DOMContentLoaded", function () {
    var agregarPreguntaButton = document.getElementById("agregarOtraPregunta");
    var formularioContainer = document.getElementById("formulario-container");

    agregarPreguntaButton.addEventListener("click", function () {
        var seccionPregunta = document.querySelector(".seccion-pregunta").cloneNode(true);
        seccionPregunta.querySelectorAll('input[type="text"]').forEach(function (input) {
            input.value = ""; // Limpia los campos de texto
        });
        formularioContainer.appendChild(seccionPregunta);
    });
});

