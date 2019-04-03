import React, { useState, useEffect } from 'react'
import countriesService from '../services/countries';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ showSingle, setShowSingle ] = useState('');
  const [ weather, setWeather ] = useState(null);

  const handleSearchTermChange = (evt) => {
    setShowSingle('');
    setWeather(null);
    setSearchTerm(evt.target.value);
  }

  const renderCountry = (country) => {
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <div>
          <img src={country.flag} alt="flag" style={{width: '100px', height: 'auto'}}/>
        </div>
        {weather 
          ? (
            <div>
              <h3>Weather in {country.capital}</h3>
              <strong>teamperature: </strong><span>{weather.current.temp_c} Celsius</span>
              <br />
              <img src={weather.current.condition.icon} alt="weather icon" />
              <br />
              <strong>wind: </strong><span>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</span>
            </div>
          )
          : null
        }
      </div>
    )
  }

  const renderCountries = () => {
    const filtered = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filtered.length > 10) {
      return <p>Too many countries</p>
    } else if (filtered.length === 1) {
      setShowSingle(filtered[0].name)
    } else {
      return (
        <ul>
          {filtered.map(country => (
            <li key={country.name}>
              {country.name}
              <button onClick={() => setShowSingle(country.name)}>show</button>
            </li>
          ))}
        </ul>
      );
    }
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(countriesList => {
        setCountries(countriesList);
      });
  }, [])

  useEffect(() => {
    const country = countries.find(country => country.name === showSingle);
    if (country) {
      countriesService
        .getWeather(country.capital)
        .then(weather => {
          setWeather(weather);
        });
    }
  }, [ showSingle ]);

  return (
    <div>
      <span>find countries</span>
      <input value={searchTerm} onChange={handleSearchTermChange} onFocus={() => setShowSingle('')}/>
      <div>
        {showSingle !== '' 
          ? renderCountry(countries.find(country => country.name === showSingle)) 
          : renderCountries()
        }
      </div>
    </div>
  );
}

export default App