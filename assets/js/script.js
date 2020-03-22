const botao = document.querySelector('.botao');
const timer = document.querySelector('.timer');
const stop = document.querySelector('.stop');
const reset = document.querySelector('#reset');
const audio = document.querySelector('audio');
let temporizador;
let minutoSegundo = minuteToSecond(timeToInteger(timer.innerHTML));

// Evento ao apertar nos botões
document.addEventListener('click', function(e) {
    const elemento = e.target;

    if (elemento.classList.contains('botao')) {
        startTimer();
        timer.classList.remove('paused');
    }

    if (elemento.classList.contains('stop')) {
        clearInterval(temporizador);
        timer.classList.add('paused');
    }

    if (elemento.classList.contains('reset')) {
        clearInterval(temporizador);
        timer.innerHTML = '25:00';
        minutoSegundo = minuteToSecond(timeToInteger(timer.innerHTML));
        timer.classList.remove('paused');
    }
});


// Função que inicia o temporizador
function startTimer() {
    clearInterval(temporizador);
    temporizador = setInterval(() => {
        timerString = timerConversor(minutoSegundo);
        minutoSegundo--;
        timer.innerHTML = timerString.split(':').slice(1).join(':');
        console.log(timerConversor(minutoSegundo));

        if (timerConversor(minutoSegundo) === '23:59:59') {
            clearInterval(temporizador);
            audio.play();

        }

    }, 1000)
}
//Converte segundo em formato HH:MM:SS
function timerConversor(s) {
    const data = new Date(s * 1000);
    return data.toLocaleTimeString('pt-br', {
        hour12: false,
        timeZone: 'GMT'
    })
}

// Converter 25:00 para 25 apenas.
function timeToInteger(tempo) {
    let tempoConvertido = tempo[0] + tempo[1];
    return tempoConvertido;
}

// Recebe o valor em minuto e converte p segundo
function minuteToSecond(minuto) {
    return minuto * 60;
}