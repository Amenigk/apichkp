
import axios from 'axios';
import { Buffer } from 'buffer';
import { useState } from 'react';
import './App.css';

function App() {

const [city, setCity] = useState("")
const [country, setCountry] = useState("")
const [weather, setWeather] = useState("")
const [loading, setLoading] = useState(true)
const options = {
  method: 'GET',
  url: 'https://weather-embed.p.rapidapi.com/forecast',
  params: {
    city: `${city}`,
    country: `${country}`,
    backgroundColor: 'white',
    textColor: 'black',
    units: 'metric',
    days: '7'
  },
  responseType: "arraybuffer",
  headers: {
    'X-RapidAPI-Key': '24101d5f2emsh38bf69aab5d71fcp12f7bfjsn47b2f6a80482',
    'X-RapidAPI-Host': 'weather-embed.p.rapidapi.com'
  }
}
let srcValue;
 const handleSubmit=(e)=>{

  e.preventDefault()
  const fetchData =async() =>{
    try {
      const res= await axios.request(options)
      console.log(res)
      let base64ImageString =await Buffer.from(res.data, 'binary').toString('base64')
      console.log(base64ImageString)
      setWeather("data:image/png;base64,"+base64ImageString)
       setLoading(false)
       console.log(weather)
      // setWeather(res.data)
        } 
    catch (error) {
      console.log(error) 
                   }
    }
  
   fetchData()
   setCity('')
   setCountry('')
}
  return (
    <div className="App">

      <h1>  Weather App </h1>
      <img src='https://media.istockphoto.com/id/531889697/photo/weather-forecast-concept.jpg?b=1&s=170667a&w=0&k=20&c=Jci9nrgcCSfOx8ZgfO9KbMKr3r0i28B1fwN20r8KmFA=' alt=''/>
      
      <form onSubmit={handleSubmit}>

     <input type='text' value={city}  onChange={(e)=>{setCity(e.target.value)}} placeholder='enter your city' />   
     <input type='text' value={country}  onChange={(e)=>{setCountry(e.target.value)}} placeholder='enter your country'/>  
      <button> search          </button>
      </form>
      {
        loading? <h3> wait for data ....</h3>
        :
        <div> 
          <img src={weather}  />
        </div>
          

              }
   
       </div>
  );
}

export default App;
