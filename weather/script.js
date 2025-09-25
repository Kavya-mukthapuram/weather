const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide= document.querySelector('.city-hide');

function getWeather() {
  const APIkey = '9f692f529e6882b1b12b75932ef2ee4d';
  const city = input.value.trim();

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod == '404') {
        cityHide.textContent=city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      if(cityHide.textContent == city){
        return;
      }
      else{
        cityHide.textContent =city;

      container.style.height = '555px';
      container.classList.add('active');
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error404.classList.remove('active');

      setTimeout(()=>{
        container.classList.add('remove');
      },2500)
      }



      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'clear.png';
          break;
        case 'Rain':
          image.src = 'rain.png';
          break;
        case 'Snow':
          image.src = 'snow.png';
          break;
        case 'Clouds':
          image.src = 'cloud.png';
          break;
        case 'Mist':
        case 'Haze':
          image.src = 'mist.png';
          break;
        default:
          image.src = 'cloud.png';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

      const infoWeather=document.querySelector('.info-weather')
      const infoHumidity=document.querySelector('.info-humidity')
      const infoWind=document.querySelector('.info-wind')

      const elCloneInfoWeather=infoWeather.cloneNode(true)
      const elCloneInfoHumidity=infoHumidity.cloneNode(true)
      const elCloneInfoWind=infoWind.cloneNode(true)

       elCloneInfoWeather.id='clone-info-weather'
       elCloneInfoWeather.classList.add('.active-clone')

       elCloneInfoHumidity.id='clone-info-humidity'
       elCloneInfoHumidity.classList.add('.active-clone')

       elCloneInfoWind.id='clone-info-wind'
       elCloneInfoWind.classList.add('.active-clone')

       setTimeout(() => {
        infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather)
        infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity)
        infoWind.insertAdjacentElement("afterend",elCloneInfoWind)
       },2200)

      const cloneInfoWeather=Document.querySelectorAll('.info-weather.active-clone')
      const totalCloneInfoWeather=cloneInfoWeather.length
      const cloneInfoWeatherFirst=cloneInfoWeather[0]
      
      const cloneInfoHumidity=Document.querySelectorAll('.info-humidity.active-clone')
      const cloneInfoHumidityFirst=cloneInfoHumidity[0]
      
      const cloneInfoWind=Document.querySelectorAll('.info-wind.active-clone')
      const cloneInfoWindFirst=cloneInfoWind[0]
     
      if(totalCloneInfoWeather >0){
        cloneInfoWeatherFirst.classList.remove('active-clone')
        cloneInfoHumidityFirst.classList.remove('active-clone')
        cloneInfoWindFirst.classList.remove('active-clone')

        setTimeout(() =>{
          cloneInfoWeatherFirst.remove()
          cloneInfoHumidityFirst.remove()
          cloneInfoWeatherFirst.remove()
        },2200)
      }

    })
    .catch(err => console.error(err));
}

// click button
search.addEventListener('click', getWeather);

// press Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather();
  }
});
