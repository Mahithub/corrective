function getting(response) {
    console.log(response.data);
    let type = document.querySelector("#type");
    type.innerHTML = response.data.condition.description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.temperature.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed
    
    let temperaturCity = document.querySelector("#tempo");
    temperaturCity.innerHTML = `${Math.round(response.data.temperature.current)}`;
    let heading = document.querySelector("h1");
    heading.innerHTML = response.data.city;
    let now = new Date();
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekDays[now.getDay()];
    let getDay = document.querySelector("#day");
    getDay.innerHTML = day;
    let hour = now.getHours();
    let getHour = document.querySelector("#hour");
    getHour.innerHTML = hour;
    let minute = now.getMinutes();
    let getminute = document.querySelector("#minute");
    getminute.innerHTML = minute;

    let icon = document.querySelector("#icoon");
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="no1">`;
    
    if (minute < 10) {
        minute = `0${minute}`;
    }

}
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
searching.addEventListener("submit", valuing)

