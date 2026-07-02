const input= document.getElementById('city-name')
const button = document.getElementById('search')

const city = document.getElementById('region')
const degree = document.getElementById('temp')
const quality =document.getElementById('air-quality')
const moisture = document.getElementById('humidity')
// const icon= document.createElement("img")
// document.body.appendChild(icon);
const mosaam = document.getElementById('photo')
const conditions =document.getElementById('condition')
const wind =document.getElementById('wind-speed')
const show = document.getElementById('visibility')

async function getdata(cityName) {
 const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=94cbd9f0b82b45e9a9b172353262706&q=${cityName}&aqi=yes`)
 return await promise.json();
} 

button.addEventListener("click", async () => {
  const value = input.value;
  const result = await getdata(value);
  city.innerHTML = `${result.location.name},${result.location.region} - ${result.location.country}`
  degree.innerHTML = `${result.current.temp_c} °C`
  
   mosaam.src = "https:" + result.current.condition.icon
   mosaam.alt = result.current.condition.text 
   
  const air = result.current.air_quality["us-epa-index"]
  
  moisture.innerHTML=`Humidity  ${result.current.humidity}`
  conditions.innerHTML= `${result.current.condition.text}`
  wind.innerHTML= `Wind Speed ${result.current.wind_mph} mph`
  show.innerHTML= `Visibility  ${result.current.vis_miles} miles`
  if (air === 3) {
    quality.innerHTML = `${air} (Unhealthy for Sensitive Groups)`;
  } else if (air === 1) {
    quality.innerHTML = `${air} (Good)`;
  } else if (air === 2) {
    quality.innerHTML = `${air} (Moderate)`;
  } else if (air === 4) {
    quality.innerHTML = `${air} (Unhealthy)`;
  } else if (air === 5) {
    quality.innerHTML = `${air} (Very Unhealthy)`;
  } else {
    quality.innerHTML = `${air} (Unknown)`;
  }

  quality.style.backgroundColor = 
  air === 1 ? "green" :
  air === 2 ? "yellow" :
  air === 3 ? "orange" :
  air === 4 ? "red" :
  air === 5 ? "purple" : "gray";
})