import axios from 'axios'
import React, { useState, useEffect} from 'react'

const api_key = process.env.REACT_APP_API_KEY_WEATHER_API

const App = () => {
  const [country, setCountry] = useState(
    {
      name: '',
      population: '',
      capital: 'Helsinki',
      languages: [{name:'ENG'}],
      flag: ''
    }
  )
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const [weather, setWeather] = useState(
      {
        current:{
          temp_c:'', 
          condition:{icon: ''},
          wind_mph: '', 
          wind_dir: ''
        }
      }
    )

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }
  useEffect(hook, [])
  
  const weatherHook = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}&aqi=no`
      )
      .then((response) => setWeather(response.data));
  }
  useEffect(weatherHook, [country]);
  
  const countrySearchHandler = (event) => {
    setCountrySearch(event.target.value)
  }

  const handleShowCountry = (event) => {
    setCountrySearch(event.target.value)
  }

  const limitSearchArray = () => {
    const limitedSearch = countries.filter(country => country.name.toLowerCase()
                                   .indexOf(countrySearch.toLowerCase()) !== -1)

    if (limitedSearch.length === 1) {
      if(country !== limitedSearch[0]) {
        setCountry(limitedSearch[0])
      }
      console.log(country)
      return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map(language => 
              <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name} height='100px'/>
          <h2>Weather in {country.capital}</h2>
              <p>temperature: {weather.current.temp_c} Celcius</p>
              <img src={weather.current.condition.icon} alt={country.capital}/>
              <p>wind: {weather.current.wind_mph} mph direction {weather.current.wind_dir}</p>
        </div>
      )
    } else if (limitedSearch.length <= 10){
        return (
          limitedSearch.map(country => 
          <p key={country.name}>{country.name}
            <button value={country.name} onClick={handleShowCountry}>show</button>
          </p>)
        )
    } else {
        return 'Too many matches, specify another filter'
    }
  }

  return (
    <div>
      find countries <input value={countrySearch} onChange={countrySearchHandler}></input>
      <div>
        {limitSearchArray()}
      </div>
    </div>
  )
}

export default App
