/*const btnConfirmar = document.getElementById('confirmar')

btnConfirmar.addEventListener('click', (event) => {
  event.preventDefault();
})
*/

// Función: Narrador de bienvenida
function narracion(mensaje) {
  const habla = new SpeechSynthesisUtterance(mensaje);
  habla.lang = 'es-ES';
  habla.rate = 1;
  habla.pitch = 1;
  // Cancelar si ya estaba hablando
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(habla);
}

function activarNarracionUnaVez() {
  const mensajeInicio = 'Bienvenido al Hospital Central. Pulse la tecla F si usted tiene discapacidad visual grave o ceguera. Pulse la tecla J si tiene discapacidad moderada o leve. Pulse la barra espaciadora para repetir este mensaje';
  narracion(mensajeInicio);
}

// Mostrar modal al cargar
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalBienvenida');
  modal.style.display = 'flex';
  // Enfocar el contenido del modal
  setTimeout(() => {
    modal.querySelector('.modal-content').focus();
  }, 100);

  // 🔊 Escuchar primera interacción del usuario
  activarNarracionUnaVez();
  window.addEventListener('click', activarNarracionUnaVez);
  window.addEventListener('keydown', activarNarracionUnaVez);
});

//Si se selecciona una opción del modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'F') {
    // Cancelar narración
    window.speechSynthesis.cancel();
    // Desactivar activación futura del narrador
    window.removeEventListener('click', activarNarracionUnaVez);
    window.removeEventListener('keydown', activarNarracionUnaVez);
  
    cerrarModal();
    abrirFormulario();
  }
  else if (e.key === 'J') {
    // Cancelar narración
    window.speechSynthesis.cancel();
    // Desactivar activación futura del narrador
    window.removeEventListener('click', activarNarracionUnaVez);
    window.removeEventListener('keydown', activarNarracionUnaVez);
    cerrarModal();
  }
});

// Cerrar modal manualmente (botón)
function cerrarModal() {
  const modal = document.getElementById('modalBienvenida');
  modal.style.display = 'none';
 
  window.speechSynthesis.cancel();
  window.removeEventListener('click', activarNarracionUnaVez);
  window.removeEventListener('keydown', activarNarracionUnaVez);
}

// Cerrar modal con tecla Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});

function abrirFormulario() {
  mensajeFormulario();
}

function mensajeFormulario() {
  const mensaje = 'Pulse F para iniciar dictado por voz'
  narracion(mensaje)
}

window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'f') {
    // Cancelar narración
    window.speechSynthesis.cancel();
    // Desactivar narración futura
    window.removeEventListener('click', activarNarracionUnaVez);
    window.removeEventListener('keydown', activarNarracionUnaVez);

    cerrarModal();      // Cierra el modal de bienvenida
    abrirFormulario();  // Abre el dialog accesible
    mensajeFormulario();
  }
});


const dialogoFormulario = document.getElementById('formDialog');
const formularioDialogo = document.getElementById('formularioAccesible');
const enviarDialogo = document.getElementById('enviarDialogo');

function abrirFormulario() {
  if (typeof dialogoFormulario.showModal === "function") {
    dialogoFormulario.showModal();
  } else {
    alert("Tu navegador no soporta <dialog>");
  }
}

// Al enviar, validamos y cerramos si está todo bien
formularioDialogo.addEventListener('submit', (e) => {
  e.preventDefault(); // prevenir cierre automático

  const dni = document.getElementById('dni2').value.trim();
  const telefono = document.getElementById('telefono2').value.trim();
  const area = document.getElementById('area2').value;

  if (dni && telefono && area) {
    // Puedes procesar los datos aquí si necesitas
    dialogoFormulario.close();
    alert("Formulario enviado correctamente.");
  } else {
    alert("Por favor, complete todos los campos.");
  }
});
