import React, { useState } from 'react';
import axios from 'axios'
import './index.css'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [city, setCity] = useState("Today's Weather")

  const inputLocation = (event) => {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8c0b474f6453fd3a3342808b8c1166c5`
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        console.log(response)
        return response.json();
      })
      .then(results => {
        setData(results);
        setCity(location.toUpperCase());
        setLocation('');
      })
      .catch(error => {
        console.error(error.message);
        setData({});
        setLocation('');
        setCity('LOCATION NOT FOUND!');
      });

  };


  let handleChange = (e) => {
    setLocation(e.target.value)
  }

  let convertToFahrenheit = (k) => {
    let fahrenheit = Math.floor((k - 273.15) * 1.8 + 32);
    return <h1> {fahrenheit} &deg; </h1>
  }

  return (
    <div className="App">
      <h1>{city}</h1>
      <div className='search'>
        <form
          onSubmit={inputLocation}
          autoComplete='off'>
          <input
            type='text'
            onChange={handleChange}
            value={location}
            placeholder='enter location'
            name='city' />
          <input className='submit-button' type='submit' />
        </form>
      </div>
      <div className='temp'>
        {data.main && (convertToFahrenheit(data.main.temp))}
        {data.main && data.weather[0].main}
      </div>
    </div>
  );
}

export default App;
