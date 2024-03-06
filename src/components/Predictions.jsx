import React, { useState, useEffect } from 'react';

export default function Predictions(){
    const [predictionData, setPredicitionData] = useState(null);
    const options = {
      method: 'GET',
      url: 'https://football-prediction-api.p.rapidapi.com/api/v2/predictions',
      params: {
        market: 'classic',
        federation: 'UEFA'
      },
      headers: {
        'X-RapidAPI-Key': 'f39f2ca9damsh359ef3d42e69137p133f66jsndcab0f2c4c17',
        'X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
      }
    };
    
    const fetchPredictions = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setPredicitionData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
        fetchPredictions();
      }, []);
  
    return (
      <div className='predictions-main'>
        {predictionData && (
          <div>
            {predictionData.data.map((prediction, i) => (
              <div key={i}>
                <span>{prediction.away_team} v {prediction.home_team} </span>
                | {prediction.prediction} | {prediction.start_date}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }