const formulario = document.getElementById('form-basico');
const boton = document.getElementById('confirmar');

formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el envío 
  alert("Formulario capturado correctamente");
});

function activarModerada() {
  document.body.classList.add('accesibilidad-moderada');
  cerrarModal();
}

// Narrador de bienvenida
function narracion(mensaje) {
  const habla = new SpeechSynthesisUtterance(mensaje);
  habla.lang = 'es-ES';
  habla.rate = 1;
  habla.pitch = 1;
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
  setTimeout(() => {
    modal.querySelector('.modal-content').focus();
  }, 100);

  activarNarracionUnaVez();
  window.addEventListener('click', activarNarracionUnaVez);
  window.addEventListener('keydown', activarNarracionUnaVez);
});

let esperandoConfirmacion = false;

// Evento global para teclas F, J, R
window.addEventListener('keydown', (e) => {
  const tecla = e.key.toLowerCase();

  if (tecla === 'f') {
    e.preventDefault();
    window.speechSynthesis.cancel();
    window.removeEventListener('click', activarNarracionUnaVez);
    window.removeEventListener('keydown', activarNarracionUnaVez);

    if (!dialogoFormulario.open) {
      cerrarModal();
      abrirFormulario();
      mensajeFormulario();
    } else {
      iniciarDictado('dni2');
    }
  }

  if (tecla === 'j') {
    e.preventDefault();
    window.speechSynthesis.cancel();
    iniciarDictado('telefono2');
  }

  if (tecla === 'r') {
    e.preventDefault();
    reproducirResumen();
  }

  if (e.key === 'Escape') {
    cerrarModal();
  }
});

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById('modalBienvenida');
  modal.style.display = 'none';
  window.speechSynthesis.cancel();
  window.removeEventListener('click', activarNarracionUnaVez);
  window.removeEventListener('keydown', activarNarracionUnaVez);
}

function mensajeFormulario() {
  const mensaje = 'Pulse F para dictar su DNI. Pulse J para dictar su teléfono. Cuando haya terminado, pulse R para escuchar un resumen y confirmar su cita.';
  narracion(mensaje);
}

// Abrir formulario (dialog)
const dialogoFormulario = document.getElementById('formDialog');
const formularioDialogo = document.getElementById('formularioAccesible');

function abrirFormulario() {
  if (typeof dialogoFormulario.showModal === "function") {
    dialogoFormulario.showModal();
  } else {
    alert("Tu navegador no soporta <dialog>");
  }
}

// Función para reproducir resumen y esperar confirmación
function reproducirResumen() {
  const dni = document.getElementById('dni2').value.trim();
  const telefono = document.getElementById('telefono2').value.trim();

  if (dni && telefono) {
    const resumen = `Usted ha ingresado el DNI ${dni}, el número de teléfono ${telefono}. Si esta información es correcta, pulse Enter o la barra espaciadora para confirmar y enviar.`;
    narracion(resumen);
    esperandoConfirmacion = true;

    const confirmarEnvio = (ev) => {
      if ((ev.key === 'Enter' || ev.key === ' ') && esperandoConfirmacion) {
        ev.preventDefault();
        dialogoFormulario.close();
        narracion("Formulario enviado correctamente.");
        esperandoConfirmacion = false;
        window.removeEventListener('keydown', confirmarEnvio);
      }
    };

    window.addEventListener('keydown', confirmarEnvio);
  } else {
    narracion("No se puede confirmar. Asegúrese de haber llenado DNI y teléfono.");
  }
}

// Dictado por voz (SpeechRecognition)
let escuchandoDictado = false;
let reconocimiento;

function iniciarDictado(idCampo) {
  const campo = document.getElementById(idCampo);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    narracion("Dictado por voz no soportado en este navegador.");
    return;
  }

  if (escuchandoDictado) {
    reconocimiento.stop();
    escuchandoDictado = false;
    narracion("Dictado detenido.");
    return;
  }

  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = 'es-PE';
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 1;

  reconocimiento.onstart = () => {
    escuchandoDictado = true;
    narracion("Puede comenzar a hablar.");
  };

  reconocimiento.onerror = (event) => {
    escuchandoDictado = false;
    narracion("Ocurrió un error al escuchar. Intente nuevamente.");
    console.error("Dictado error:", event.error);
  };

  reconocimiento.onresult = (event) => {
    escuchandoDictado = false;
    const texto = event.results[0][0].transcript;
    const soloNumeros = texto.replace(/\D/g, '');

    if (soloNumeros.length === 0) {
      narracion("No se reconoció ningún número. Intente nuevamente.");
      return;
    }

    campo.value = soloNumeros;
    narracion(`${campo.id === 'dni2' ? 'DNI' : 'Teléfono'} capturado: ${soloNumeros}`);
  };

  reconocimiento.onend = () => {
    escuchandoDictado = false;
  };

  reconocimiento.start();
}