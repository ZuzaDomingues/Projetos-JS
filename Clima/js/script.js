const searchForm = document.querySelector('#search');
const cityInput = document.querySelector('#city_name');
const alertDiv = document.querySelector('#alert');
const title = document.querySelector('#title');
const tempValue = document.querySelector('#temp_value');
const tempDescription = document.querySelector('#temp_description');
const tempImg = document.querySelector('#temp_img');
const tempMax = document.querySelector('#temp_max');
const tempMin = document.querySelector('#temp_min');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

const apiKey = '6b78d28d2d8002745de6081712cf0bff';

function showAlert(msg, tipo = 'erro') {
    alertDiv.innerHTML = msg;
    alertDiv.className = tipo;
    
    clearTimeout(alertDiv.timeout);
    alertDiv.timeout = setTimeout(() => {
        alertDiv.innerHTML = '';
        alertDiv.className = '';
    }, 5000);
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim();

    if (!cityName) {
        showAlert('Você precisa digitar uma cidade!', 'erro');
        return;
    }

    showAlert('Buscando informações...', 'carregando');

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

        const response = await fetch(apiUrl);
        const json = await response.json();

        if (json.cod === '404') {
            showAlert('Cidade não encontrada! Verifique o nome.', 'erro');
            return;
        }

        if (json.cod !== 200) {
            showAlert(`Erro: ${json.message}`, 'erro');
            return;
        }

        const nomeCidade = `${json.name}, ${json.sys.country}`;
        const temperatura = Math.round(json.main.temp);
        const descricao = json.weather[0].description;
        const icone = json.weather[0].icon;
        const tempMaxima = Math.round(json.main.temp_max);
        const tempMinima = Math.round(json.main.temp_min);
        const umidade = json.main.humidity;
        const velocidadeVento = Math.round(json.wind.speed * 3.6);

        title.textContent = nomeCidade;

        tempValue.innerHTML = `${temperatura} <sup>C°</sup>`;
        tempDescription.textContent = descricao.charAt(0).toUpperCase() + descricao.slice(1);

        tempImg.src = `http://openweathermap.org/img/wn/${icone}@2x.png`;
        tempImg.alt = descricao;

        tempMax.innerHTML = `${tempMaxima} <sup>C°</sup>`;
        tempMin.innerHTML = `${tempMinima} <sup>C°</sup>`;
        humidity.textContent = `${umidade}%`;
        wind.textContent = `${velocidadeVento} km/h`;

        showAlert(`Clima de ${json.name} atualizado!`, 'sucesso');

    } catch (error) {
        console.error('Erro:', error);
        showAlert('Erro ao buscar os dados. Tente novamente.', 'erro');
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchForm.dispatchEvent(new Event('submit'));
    }
});

console.log('Clima Tempo carregado!');
console.log('API Key:', apiKey ? 'Configurada' : 'Faltando');