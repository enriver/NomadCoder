const weather=document.querySelector('.js-weather');
const API_KEY='8a07a1a41c1249e5e56fff325ad64fda';
const COORDS='coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json()
        }).then(function(json){
            const temperature=json.main.temp;
            const place=json.name;

            weather.innerText=`${temperature} @ ${place}`;
        }); 
}
function saveCoords(obj){
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Oops');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);

    if (loadedCoords===null){
        askForCoords();
    }else{
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();

}

init();