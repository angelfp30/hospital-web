/*const btnConfirmar = document.getElementById('confirmar')

btnConfirmar.addEventListener('click', (event) => {
    event.preventDefault();
})
*/

// Función: Narrador de bienvenida
function mensajeInicio() {
  const mensaje = 'Bienvenido al sitio web del Hospital Central. Para activar un lector de pantalla, presiona Control más tecla Windows (justo a la derecha de Control) más Enter. Así podrás usar la tecla Tab para moverte entre secciones. Para repetir este mensaje, presiona cualquier tecla del teclado';

  const habla = new SpeechSynthesisUtterance(mensaje);
  habla.lang = 'es-ES';
  habla.rate = 1;
  habla.pitch = 1;

  // Cancelar si ya estaba hablando
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(habla);
}

function activarNarracionUnaVez() {
  mensajeInicio();
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

//Si se activa el narrador de Windows
window.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Cancelar narración
    window.speechSynthesis.cancel();
    // Desactivar activación futura del narrador
    window.removeEventListener('click', activarNarracionUnaVez);
    window.removeEventListener('keydown', activarNarracionUnaVez);
    console.log("Narrador desactivado por Enter");
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
