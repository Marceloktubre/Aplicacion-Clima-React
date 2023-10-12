import { useState } from 'react';
export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    // ?q={city name}&appid={API key}
    const API_KEY='da47d4a6f730d3182a62f722965b0288'
    const difKelvin = 273.15



    const [ciudad,setCiudad] = useState('')  
    const [dataClima,setdataClima] = useState(null)  
   
    
    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0)   fetchClima()   
    }

const fetchClima= async() =>{
    try {
        const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
        const data = await response.json()
        setdataClima(data)
        
    } catch (error) {
        console.error('Ocurrio el siguiente problema: ', error);
    }
}


  return (
    <div className= "container">
      <h1>Aplícacion del Clima</h1>
      <h1>Hecho por Marcelo Cabrera</h1>

      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        value ={ciudad}
        onChange={handleCambioCiudad} 
        />
        <button type = "submit">Buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)}°C</p>
            <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
          </div>
        )
      }
    </div>
  )
}

