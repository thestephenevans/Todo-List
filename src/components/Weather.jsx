import { useState, useEffect } from "react";
import axios from "axios";

export default function Weather(){
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
  
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=heathfield&appid=50c8a3737e61d67daa345d8590d43a6e`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchWeatherData();
    }, [city]);
  
    return (
      <>
        <div>
          {weatherData && (
            <div>
              <h2>{weatherData.name}</h2>
              <p>{weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp}</p>
            </div>
          )}
        </div>
      </>
    );
  };