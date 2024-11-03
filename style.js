function getting(response) {

    let type = document.querySelector("#type");
    type.innerHTML = response.data.condition.description;
    let humidity = document.querySelector("#humidity");
    let humiditySpeed = response.data.temperature.humidity / 100;
    humidity.innerHTML = `${humiditySpeed.toFixed(2)}%`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;
    
    let temperaturCity = document.querySelector("#tempo");
    temperaturCity.innerHTML = `${Math.round(response.data.temperature.current)}`;
    let heading = document.querySelector("h1");
    heading.innerHTML = response.data.city;
    let icon = document.querySelector("#icoon");
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="no1">`;
    dailyForcast(response.data.city);
}

function todayDate(date) {
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let newDate = weekDays[day];

    if (minute < 10) {
        minute = `0${minute}`;
    }
    if (hour < 10) {
        hour = `0${hour}`;
    }
    return `${newDate} ${hour}:${minute},`
} 
let currentDateElement = document.querySelector("#day");
let currentDate = new Date();
currentDateElement.innerHTML = todayDate(currentDate);

function searchcity(city) {
    let apikey = "795fc3dt59e943954b5e5aoc405fb9c4";
    let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit='metrics`;
    axios.get(apiurl).then(getting);
}   
function valuing(event) {
    event.preventDefault();    
    let forming = document.querySelector("#form1");
    searchcity(forming.value);
}
let searching = document.querySelector("#search-element");
searching.addEventListener("submit", valuing);

function goSearching(response) {

    console.log(response.data.daily);
    let forcastHTML = "";
    let weatherforcast = document.querySelector("#weather-forcast");
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    response.data.daily.forEach(function (day, index) {
            if (index < 5) {
                let date = new Date(day.time * 1000);
                let dayName = days[date.getDay()];
                forcastHTML += `<div class="weather-forcast">
        <div id="class-one">
            <div id="weather-forcast-date">${dayName}</div>
            <div><img src="${day.condition.icon_url}" /></div>
            <div id="weather-forcast-temperature"><strong>${Math.round(day.temperature.maximum)}° </strong> ${Math.round(day.temperature.minimum)}°</div>
        </div>
    </div>`;
            }
            });
        weatherforcast.innerHTML = forcastHTML;
    };
function dailyForcast(city) {
    let apikey = "795fc3dt59e943954b5e5aoc405fb9c4";
    let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&unit='metric`;
    axios.get(apiurl).then(goSearching);
};
