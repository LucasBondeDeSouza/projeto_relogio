const horarioInput = document.getElementById('horario');
const horario_definido = document.getElementById('horario_definido');
const stopButton = document.getElementById('stop');
const meuAudio = new Audio("../audio/som_despertador.mp3");

function verificar_hora() {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutosAtuais = agora.getMinutes();

    if (minutosAtuais < 10) {
        return `${horaAtual}:0${minutosAtuais}`
    } else {
        return `${horaAtual}:${minutosAtuais}`
    }
}

setInterval(() => {
    const horarioEscolhido = horarioInput.value;
    horario_definido.innerHTML =
        `<h2>Horário definido: ${horarioEscolhido}</h2><br>`

    if (horarioEscolhido == verificar_hora()) {
        meuAudio.play();
        stopButton.style.display = 'block'
    }
}, 1000);

stopButton.addEventListener('click', () => {
    location.reload();
})