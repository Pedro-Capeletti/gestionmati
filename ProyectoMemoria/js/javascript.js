var grupoTarjetas = ["😎", "🍦", "🐸", "👽", "👾", "🤖", "👹", "🐌"];
var totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

var primeraCarta = null; // Para guardar la primera carta descubierta
var segundaCarta = null; // Para guardar la segunda carta descubierta
var bloquearTablero = false; // Para bloquear clicks mientras se comparan cartas

function barajaTarjetas() {
  var resultado;
  resultado = totalTarjetas.sort(function() {
    return 0.5 - Math.random();
  });
  return resultado;
}

function reparteTarjetas() {
  var mesa = document.querySelector("#mesa");
  var tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";

  tarjetasBarajadas.forEach(function(elemento) {
    var tarjeta = document.createElement("div");

    tarjeta.innerHTML =
      "<div class='tarjeta'>" +
      "<div class='tarjeta__contenido'>" +
      elemento +
      "</div>" +
      "</div>";

    mesa.appendChild(tarjeta);
  });

  // Después de repartir, agregamos los eventos de click
  document.querySelectorAll(".tarjeta").forEach(function(elemento) {
    elemento.addEventListener("click", descubrir);
  });
}

function descubrir() {
  if (bloquearTablero) return; // Si está bloqueado, ignoramos clicks
  if (this.classList.contains("descubierta")) return; // Si ya está descubierta, ignoramos clicks

  this.classList.add("descubierta");

  if (!primeraCarta) {
    // Si todavía no hay una primera carta seleccionada
    primeraCarta = this;
  } else {
    // Si ya había una primera carta, ahora esta es la segunda
    segundaCarta = this;
    bloquearTablero = true; // Bloqueamos el tablero mientras comparamos

    // Comparar las dos cartas
    compararCartas();
  }
}

function compararCartas() {
  var contenidoPrimera = primeraCarta.querySelector(".tarjeta__contenido").textContent;
  var contenidoSegunda = segundaCarta.querySelector(".tarjeta__contenido").textContent;

  if (contenidoPrimera === contenidoSegunda) {
    // Si las cartas son iguales
    primeraCarta.removeEventListener("click", descubrir);
    segundaCarta.removeEventListener("click", descubrir);
    reiniciarCartas(); // Reseteamos variables
  } else {
    // Si las cartas son diferentes, las damos vuelta después de 1 segundo
    setTimeout(function() {
      primeraCarta.classList.remove("descubierta");
      segundaCarta.classList.remove("descubierta");
      reiniciarCartas(); // Reseteamos variables
    }, 1000);
  }
}

function reiniciarCartas() {
  // Reseteamos para la próxima jugada
  primeraCarta = null;
  segundaCarta = null;
  bloquearTablero = false;
}

// Empezamos el juego
reparteTarjetas();






