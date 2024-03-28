const btn_tempo = document.getElementById('btn-tempo')
const bandeira = document.getElementById('bandeira')
const temperatura = document.getElementById('temperatura')
const resultado = document.getElementById('resultado')
var container = document.getElementsByClassName('container')[0];
const titulo = document.getElementById('titulo')

var intervalo;

var temp_city = {
    "America/Sao_Paulo": 'São Paulo',
    "America/Argentina/Buenos_Aires": 'Buenos Aires',
    "America/New_York": 'Nova York',
    "America/Mexico_City": 'Cidade do México',
    "America/Toronto": 'Toronto',
    "Europe/London": 'Londres',
    "Europe/Paris": 'Paris',
    "Europe/Berlin": 'Berlim',
    "Europe/Moscow": 'Moscou',
    "Asia/Tokyo": 'Tokyo',
    "Asia/Dubai": 'Dubai',
    "Australia/Sydney": 'Sydney',
    "Africa/Cairo": 'Cairo'
}

var bandeiras = {
    "America/Sao_Paulo": "../imagens/cidades/br.webp",
    "America/Argentina/Buenos_Aires": "../imagens/cidades/ar.webp",
    "America/New_York": "../imagens/cidades/us.webp",
    "America/Mexico_City": "../imagens/cidades/mx.webp",
    "America/Toronto": "../imagens/cidades/ca.webp",
    "Europe/London": "../imagens/cidades/uk.webp",
    "Europe/Paris": "../imagens/cidades/fra.webp",
    "Europe/Berlin": "../imagens/cidades/de.webp",
    "Europe/Moscow": "../imagens/cidades/ru.webp",
    "Asia/Tokyo": "../imagens/cidades/jpn.webp",
    "Asia/Dubai": "../imagens/cidades/ae.webp",
    "Australia/Sydney": "../imagens/cidades/au.webp",
    "Africa/Cairo": "../imagens/cidades/eg.webp"
};

var imagens_tempo = {
    "Clear": "../imagens/clima/clear.png",
    "Clouds": "../imagens/clima/cloud.png",
    "Mist": "../imagens/clima/mist.png",
    "Rain": "../imagens/clima/rain.png",
    "Snow": "../imagens/clima/snow.png",
    "Night": "../imagens/clima/night.png"
}

btn_tempo.addEventListener("click", () => {
    resultado.style.display = 'block'
    const APIKey = '61069938df2e3da7cca2a04116716c31';
    clearInterval(intervalo);
    var local = document.getElementById('local').value;
    var cidade = temp_city[local];

    if (local in bandeiras && local in temp_city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.main) {
                temperatura.innerHTML += `${parseInt(json.main.temp)}<span>°C</span>`;
                var condicao = json.weather[0].main;
                var agora = new Date().getTime() / 1000; // tempo atual em segundos
                var nascerDoSol = json.sys.sunrise;
                var porDoSol = json.sys.sunset;

                // Se o tempo atual estiver entre o nascer e o pôr do sol, é dia. Caso contrário, é noite.
                if (agora >= nascerDoSol && agora <= porDoSol) {
                    // Dia
                    if (condicao in imagens_tempo) {
                        document.getElementById('tempo').innerHTML = '';
                        var img_tempo = document.createElement('img');
                        img_tempo.src = imagens_tempo[condicao];
                        img_tempo.alt = 'Imagem do tempo: ' + condicao;
                        img_tempo.classList.add('imagem-tempo');
                        document.getElementById('tempo').appendChild(img_tempo);
                        titulo.style.color = 'black'
                        container.style.border = '2px solid #000'
                        document.body.style.backgroundColor = 'rgb(240, 242, 245)';
                    }
                } else {
                    // Noite
                    document.getElementById('tempo').innerHTML = '';
                    var img_tempo = document.createElement('img');
                    img_tempo.src = imagens_tempo["Night"];
                    img_tempo.alt = 'Imagem do tempo: Noite';
                    img_tempo.classList.add('imagem-tempo');
                    document.getElementById('tempo').appendChild(img_tempo);
                    titulo.style.color = '#fff'
                    container.style.border = 'none'
                    document.body.style.backgroundColor = 'rgb(23, 32, 44)';
                }
            } else {
                temperatura.innerHTML += 'Desculpe, não foi possível obter a temperatura para ' + cidade;
            }  
        })
        bandeira.innerHTML = '<img src="' + bandeiras[local] + '" alt="bandeira ' + local + '">'
        temperatura.innerHTML = '<h1 id="cidade">' + temp_city[local] + '</h1>'
    }

    intervalo = setInterval(function () {
        var horario = moment().tz(local).format('HH:mm:ss');
        document.getElementById('horario').innerHTML = horario;
    }, 1000);
})