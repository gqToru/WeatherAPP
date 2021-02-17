const KEY = '50ad6d186befdf841d771b6c07d94c07';

var selectedLanguage = 'en'; // idioma por defecto
var tempUnits = 'metric'; // metric = celsius, imperial = fahrenheit, standard = kelvin

function replaceData(data) {
	let temperature = document.querySelector('#temp');
	let cityLocation = document.querySelector('city');
	let description = document.querySelector('description');
	let tempInterval = data.weather[0].id;

	temperature.innerHTML = data.main.temp + 'º';
	cityLocation.innerHTML = data.name;
	description.innerHTML = data.weather[0].description;

	if (tempInterval > 199 && tempInterval < 233) {
		document.querySelector('body').className = 'thunderstorm';
	} else if (tempInterval > 299 && tempInterval < 322) {
		document.querySelector('body').className = 'drizzle';
	} else if (tempInterval > 499 && tempInterval < 532) {
		document.querySelector('body').className = 'rain';
	} else if (tempInterval > 599 && tempInterval < 623) {
		document.querySelector('body').className = 'snow';
	} else if (tempInterval == 800) {
		document.querySelector('body').className = 'clearSky';
	} else if (tempInterval > 800) {
		document.querySelector('body').className = 'cloudy';
	}
}

function getWeather() {
	let inputRadio = document.querySelectorAll('input[type=radio]');
	for (i = 0; i < inputRadio.length; i++) {
		if (inputRadio[i].checked == true) {
			tempUnits = inputRadio[i].value;
		}
	}

	let cityName = document.querySelector('.inputCity').value;

	let results = fetch(
		'http://api.openweathermap.org/data/2.5/weather?q=' +
			cityName +
			'&lang=' +
			selectedLanguage +
			'&units=' +
			tempUnits +
			'&appid=' +
			KEY
	) // hace una llamada a la api de clima
		.then((response) => response.json()) // convierte la data en json
		.then((dataDisplay) => {
			replaceData(dataDisplay); // reemplaza la informacion en el html
			console.log(dataDisplay);
			return; // (dataJSON = dataDisplay);
		})
		.catch(function(error) {
			console.log('this is an error', error); //catch any errors
		});
	return results;
}

function selectLanguage() {
	if (document.querySelector('select').value == 'spanish') {
		selectedLanguage = 'es';
		document.querySelector('h1').innerHTML = 'El clima hoy es:';
		document.querySelector('#languageSelect_id').innerHTML = 'Seleccionar idioma:';
		document.querySelector('.inputCity').placeholder = 'Introduzca una ciudad';
	} else {
		selectedLanguage = 'en';
		document.querySelector('h1').innerHTML = 'The weather today is:';
		document.querySelector('#languageSelect_id').innerHTML = 'Select language:';
		document.querySelector('.inputCity').placeholder = 'Enter city name';
	}
}

document.querySelector('.inputCity').addEventListener('keyup', function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		getWeather();
	}
});
