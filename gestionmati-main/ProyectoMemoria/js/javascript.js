/*let grupoTarjetas = ["😎", "🍦", "🐸", "👽", "👾", "🤖", "👹", "🐌"];

let totalTarjetas = grupoTarjetas.concat(grupoTarjetas);


//texto de prueba
//holaaaa


function barajaTarjetas() {
  let resultado;
  resultado = totalTarjetas.sort(function() {
    return 0.5 - Math.random();
  });
  return resultado;
}

function reparteTarjetas() {
  let mesa = document.querySelector("#mesa");
  let tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";

  tarjetasBarajadas.forEach(function(elemento) {
    let tarjeta = document.createElement("div");

    tarjeta.innerHTML =
      "<div class='tarjeta'>" +
      "<div class='tarjeta__contenido'>" +
      elemento +
      "</div>" +
      "</div>";

    mesa.appendChild(tarjeta);
  });
}

function descubrir() {
  this.classList.add("descubierta");
}

reparteTarjetas();

document.querySelectorAll(".tarjeta").forEach(function(elemento) {
  elemento.addEventListener("click", descubrir);
}); */


let grupoTarjetas = ["😎", "🍦", "🐸", "👽", "👾", "🤖", "👹", "🐌"];
let totalTarjetas = grupoTarjetas.concat(grupoTarjetas);
let movimientos = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let bloquearTablero = false;
let tarjetasDescubiertas = 0;

function barajaTarjetas() {
  let resultado;
  resultado = totalTarjetas.sort(function() {
    return 0.5 - Math.random();
  });
  return resultado;
}

function reparteTarjetas() {
  let mesa = document.querySelector("#mesa");
  let tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";
  tarjetasDescubiertas = 0;

  tarjetasBarajadas.forEach(function(elemento) {
    let tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML =
      "<div class='tarjeta__contenido'>" +
      elemento +
      "</div>";
    tarjeta.addEventListener("click", descubrir);
    mesa.appendChild(tarjeta);
  });

  document.getElementById("mensajeFelicitaciones").style.display = "none";
  const confettiElements = document.querySelectorAll('.confeti');
  confettiElements.forEach(confetti => confetti.remove());
}

function descubrir() {
  if (bloquearTablero || this.classList.contains("descubierta")) {
    return;
  }

  this.classList.add("descubierta");

  if (tarjeta1 === null) {
    tarjeta1 = this;
  } else {
    tarjeta2 = this;
    movimientos++;
    comprobarPareja();
  }
}

function comprobarPareja() {
  if (tarjeta1.textContent === tarjeta2.textContent) {
    tarjeta1.removeEventListener("click", descubrir);
    tarjeta2.removeEventListener("click", descubrir);
    tarjetasDescubiertas += 2;
    tarjeta1 = null;
    tarjeta2 = null;
    bloquearTablero = false;

    if (tarjetasDescubiertas === totalTarjetas.length) {
      mostrarFelicitaciones();
    }
  } else {
    bloquearTablero = true;
    setTimeout(ocultarTarjetas, 1000);
  }
}

function ocultarTarjetas() {
  tarjeta1.classList.remove("descubierta");
  tarjeta2.classList.remove("descubierta");
  tarjeta1 = null;
  tarjeta2 = null;
  bloquearTablero = false;
}

/*function mostrarFelicitaciones() {
  document.getElementById("mensajeFelicitaciones").style.display = "block";
  dispararConfeti();
}

function dispararConfeti() {
  const cantidadConfeti = 100;
  const mesa = document.getElementById("mesa");
  const coloresConfeti = ['#fce18a', '#ff726d', '#b48ade', '#ffc857', '#27ae60'];

  for (let i = 0; i < cantidadConfeti; i++) {
    const confeti = document.createElement('div');
    confeti.classList.add('confeti');
    confeti.style.backgroundColor = coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)];
    confeti.style.left = `${Math.random() * mesa.offsetWidth}px`;
    confeti.style.animationDelay = `${Math.random() * 2}s`;
    confeti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    mesa.appendChild(confeti);

    confeti.addEventListener('animationend', () => {
      confeti.remove();
    });
  }
}*/

reparteTarjetas();