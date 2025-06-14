import { useState ,useEffect} from "react"
import axios from "axios"

function ShowCountries({ countries,ShowCountry }) {
    const WEATHER_API_KEY = "e0130f3410f92d30e962ef995fc67473"
    const [weather, setWeather] = useState(null)
    useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital[0]
      const countryCode = countries[0].cca2.toLowerCase()
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(response => {
          setWeather(response.data)
          console.log("Api weather",response.data)
        })
        .catch(err => {
          console.error("Failed to fetch weather", err)
          setWeather(null)
        })
    }
  }, [countries])
  if (!Array.isArray(countries)) return <p>Invalid data</p>
  if(countries.length>1){
    return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>{country.name.common} 
            <button onClick={()=>ShowCountry(country.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  )
  }else if(countries.length===1){
    return (
        <div>
            <h1>{countries[0].name.common}</h1>
            <p>Capital {countries[0].capital[0]}</p>
             <p>Capital {countries[0].area}</p>
             <h1>Languages</h1>
             <ul>
            {Object.values(countries[0].languages).map((l, index) => (
                <li key={index}>{l}</li>
            ))}
            </ul>
            <img src={countries[0].flags.svg} alt="" />
            {weather && (
          <>
            <h3>Weather in {countries[0].capital[0]}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Wind: {weather.wind.speed} m/s</p>

          </>
        )}
        </div>
    )
  }else{
    return
  }
}

export default ShowCountries