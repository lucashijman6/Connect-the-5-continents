window.addEventListener("load", init);

let infoDiv;
let weatherDiv;

/**
 * Initialize the application (after DOM ready)
 */
function init()
{
    massGetInfo();

    infoDiv = document.getElementById("info");
    weatherDiv = document.getElementById("weather");
}

function getInfo(url, successHandler) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(successHandler)
        .catch(ajaxErrorHandler);

}

function massGetInfo() {
    getInfo(weatherUrlCompiler(), weatherSuccessHandler);
    console.log(weatherUrlCompiler())
}

function weatherUrlCompiler() {
    let key = "b7b912ab54fb4c05ab672fad18367e10";
    let baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
    let forecastDays = "7";
    let cityName = "Rotterdam";
    let country = "NL";

    let url = baseUrl + "?city=" + cityName + "&country=" + country + "&days=" + forecastDays + "&key=" + key;

    return url;
}

function weatherSuccessHandler(data) {

    for (let i = 0; i < data.data.length; i++) {

        let weather = data.data[i];

        let div = document.createElement('div');
        div.classList.add('card');

        let date = document.createElement('h2');
        date.innerHTML = weather.valid_date;
        div.appendChild(date);

        let maxTemp = document.createElement('h4');
        maxTemp.innerHTML = weather.max_temp;
        div.appendChild(maxTemp);

        let minTemp = document.createElement('h4');
        minTemp.innerHTML = weather.min_temp;
        div.appendChild(minTemp);

        let forecast = document.createElement('p');
        forecast.innerHTML = weather.weather.description;
        div.appendChild(forecast);

        weatherDiv.appendChild(div);

    }
}

function getFullDay(date) {
    let d = new Date(date);
    let weekday = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    let n = weekday[d.getDay()];
    return n;
}

function factsSuccessHandler(data) {
    
}



function ajaxErrorHandler(data) {
    console.log('error', data);
}
