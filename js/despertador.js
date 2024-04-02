const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const horarioInput = document.getElementById("horario");
const meuAudio = new Audio("../audio/som_despertador.mp3");

// Função para verificar o horário atual e acionar o alarme, se necessário
function verificarHorario() {
    const horarioEscolhido = horarioInput.value;
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();

    const [horaEscolhida, minutoEscolhido] = horarioEscolhido.split(":").map(Number);

    if (horaAtual === horaEscolhida && minutoAtual === minutoEscolhido) {
        meuAudio.play();
        startButton.style.display = 'none';
        stopButton.style.display = 'block';
    } else {
        startButton.style.display = 'block';
        stopButton.style.display = 'none';
    }
}

// Verificar o horário a cada minuto
setInterval(verificarHorario, 60000);

startButton.addEventListener("click", function () {
    verificarHorario(); // Verificar o horário imediatamente ao clicar em "Start"
});

stopButton.addEventListener("click", function () {
    meuAudio.pause();
    meuAudio.currentTime = 0; // Reinicia o áudio para o início
    stopButton.style.display = 'none'; // Oculta o botão "Stop" quando o alarme é parado
    startButton.style.display = 'block';
});