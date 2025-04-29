var grupoTarjetas = ["😎", "🍦", "🐸", "👽", "👾", "🤖", "👹", "🐌"];
var totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

let primeraTarjeta = null;
let segundaTarjeta = null;
let bloquear = false;
let intentos = 0;
let aciertos = 0;
let tiempoInicio;
let temporizador;

function barajaTarjetas() {
  return totalTarjetas.sort(() => 0.5 - Math.random());
}

function crearContadores() {
  const contenedor = document.createElement("div");
  contenedor.id = "panel-informacion";
  contenedor.style.margin = "1rem";
  contenedor.style.textAlign = "center";
  contenedor.innerHTML = `
    <p><strong>Intentos:</strong> <span id="contador-intentos">0</span></p>
    <p><strong>Tiempo:</strong> <span id="contador-tiempo">0</span> segundos</p>
    <button id="reiniciar">🔁 Reiniciar</button>
  `;
  document.body.insertBefore(contenedor, document.querySelector("main"));

  document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
}

function iniciarTemporizador() {
  tiempoInicio = Date.now();
  temporizador = setInterval(() => {
    const ahora = Date.now();
    const segundos = Math.floor((ahora - tiempoInicio) / 1000);
    document.getElementById("contador-tiempo").textContent = segundos;
  }, 1000);
}

function detenerTemporizador() {
  clearInterval(temporizador);
}

function actualizarIntentos() {
  intentos++;
  document.getElementById("contador-intentos").textContent = intentos;
}

function mostrarMensajeVictoria() {
  detenerTemporizador();
  setTimeout(() => {
    alert(`¡Ganaste en ${intentos} intentos y ${document.getElementById("contador-tiempo").textContent} segundos!`);
  }, 300);
}

function descubrir() {
  if (bloquear || this.classList.contains("descubierta")) return;

  this.classList.add("descubierta");

  if (!primeraTarjeta) {
    primeraTarjeta = this;
  } else {
    segundaTarjeta = this;
    bloquear = true;
    actualizarIntentos();

    const emoji1 = primeraTarjeta.querySelector(".tarjeta__contenido").textContent;
    const emoji2 = segundaTarjeta.querySelector(".tarjeta__contenido").textContent;

    if (emoji1 === emoji2) {
      // Coinciden
      aciertos++;
      primeraTarjeta = null;
      segundaTarjeta = null;
      bloquear = false;

      if (aciertos === grupoTarjetas.length) {
        mostrarMensajeVictoria();
      }
    } else {
      // No coinciden
      setTimeout(() => {
        primeraTarjeta.classList.remove("descubierta");
        segundaTarjeta.classList.remove("descubierta");
        primeraTarjeta = null;
        segundaTarjeta = null;
        bloquear = false;
      }, 1000);
    }
  }
}

function repartirTarjetas() {
  const mesa = document.querySelector("#mesa");
  const tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";

  tarjetasBarajadas.forEach((emoji) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `<div class="tarjeta__contenido">${emoji}</div>`;
    mesa.appendChild(tarjeta);
  });

  document.querySelectorAll(".tarjeta").forEach((t) =>
    t.addEventListener("click", descubrir)
  );
}

function reiniciarJuego() {
  intentos = 0;
  aciertos = 0;
  primeraTarjeta = null;
  segundaTarjeta = null;
  bloquear = false;

  document.getElementById("contador-intentos").textContent = "0";
  document.getElementById("contador-tiempo").textContent = "0";
  detenerTemporizador();
  repartirTarjetas();
  iniciarTemporizador();
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  crearContadores();
  repartirTarjetas();
  iniciarTemporizador();
});
