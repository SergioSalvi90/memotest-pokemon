let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sound/win.wav')
let loseAudio = new Audio('./sound/lose.wav')
let clickAudio = new Audio('./sound/click.wav')
let rightAudio = new Audio('./sound/right.wav')
let wrongAudio = new Audio('./sound/wrong.wav')

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" >`;
        tarjetaBloqueada.disable = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;

    let cartaActual = document.getElementById(id);
    let resultadoActual = numeros[id];
    cartaActual.innerHTML = `<img src="./img/${resultadoActual}.png">`;
    clickAudio.play();
    cartaActual.disabled = true;

    if (tarjetasDestapadas === 2) {
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`;

        if (primerResultado === resultadoActual && tarjeta1 !== cartaActual) {
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`;
                mostrarTiempo.innerHTML = `Genial: ${timerInicial - timer} segundos`;
                winAudio.play();
            }

            tarjetasDestapadas = 0;
            tarjeta1 = null;
            tarjeta2 = null;
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                cartaActual.innerHTML = '';
                tarjeta1.disabled = false;
                cartaActual.disabled = false;
                tarjetasDestapadas = 0;
                tarjeta1 = null;
                tarjeta2 = null;
                wrongAudio.play();
            }, 700);
        }
    } else {
        primerResultado = resultadoActual;
        tarjeta1 = cartaActual;
    }
}
