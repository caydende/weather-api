var card = document.getElementById("card");
var searchInput = document.getElementById("search");
var submitBtn = document.getElementById("submit");
var weatherData = {};


submitBtn.addEventListener('click', function(){
    console.log(searchInput.value)
    getData(searchInput.value);
})

getData("cairo");


// Fetch data from the API
async function getData(city) {
    try {
        var response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=711e813a7ec4444299f152732240312&q=${city}&days=3`
        );
        weatherData = await response.json();
        displayWeather()
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Display weather data
function displayWeather() {
    var location = weatherData.location;
    var current = weatherData.current;

    var design = `
        <div class="card card-bg mb-3 col-md-4 m-auto" height=" 300px" >
            <div class="card-header d-flex justify-content-between border-0 px-0">
                <p class="card-text-c">${new Date().toLocaleString("en-US", {
        weekday: "long",
    })}</p>
                <p class="card-text-c">${new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
    })}</p>
            </div>
            <div class="card-body pt-0 card-text-c">
                <h5 class="card-title pb-3">${location.name}</h5>
                <p class="card-text fs-1 fw-bolder text-white">${current.temp_c
        }°C</p>
                <img src="https:${current.condition.icon}" alt="${current.condition.text
        }">
                <p class="text-color">${current.condition.text}</p>
                <span class="ps-0 p-2">
                    <img src="./imgs/icon-umberella.png" alt="" class="p-1">
                    ${current.precip_mm} mm
                </span>
                <span class="p-2">
                    <img src="./imgs/icon-wind.png" alt="" class="p-1">
                    ${current.wind_kph} km/h
                </span>
                <span class="p-2">
                    <img src="./imgs/icon-compass.png" alt="" class="p-1">
                    ${current.wind_dir}
                </span>
            </div>
        </div>


    `;

    for(var i =1 ; i < weatherData.forecast.forecastday.length ; i++){
        var date = new Date();
        date.setDate(date.getDate() + i);
        design += `
        <div class="card card-bg mb-3 col-md-4 m-auto card-d-color">
                        <div class="card-header  border-0 px-0  m-auto ">
                            <p class="card-text-c ">
                            ${date.toLocaleString("en-US", { weekday : "long",})}
                            </p>
                        </div>
                        <div class="card-body pt-0 card-text-c">
                            <img src="${weatherData.forecast.forecastday[i].day.condition.icon}" class=" pt-5" alt="">


                            <p class="card-text fs-3 fw-bolder text-white mb-0">${weatherData.forecast.forecastday[i].day.maxtemp_c}°C</p>

                            <p class="card-text fs-5 fw-bolder text-white opacity-75">${weatherData.forecast.forecastday[i].day.mintemp_c}°</p>


                            <p class="text-color py-2">${weatherData.forecast.forecastday[i].day.condition.text}</p>


                        </div>
                    </div>

        
        `

    }

    card.innerHTML = design;
}


