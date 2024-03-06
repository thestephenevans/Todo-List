import { useState, useEffect } from 'react'; // Import useEffect hook
import './App.css';
import axios from "axios";
import { saveAs } from 'file-saver';

import Home from './components/Home';
import List from './components/List';
import Redirects from './components/Redirects';
import Tiktok from './components/Tiktok';
import Predictions from './components/Predictions';
import Scraper from './components/Scraper';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';


const Weather = () => {
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

function App() {
  const [activeElement, setActiveElement] = useState('home');

  const handleNavigation = (element) => {
    setActiveElement(element);
  };

  return (
    <div className='main'>
      <header className='main-header'>
        <nav className='main-navigation'>
          <Button variant='outlined' onClick={() => handleNavigation('home')}>Home</Button>
          <Button variant='outlined' onClick={() => handleNavigation('list')}>Todo List</Button>
          <Button variant='outlined' onClick={() => handleNavigation('redirects')}>Redirects</Button>
          <Button variant='outlined' onClick={() => handleNavigation('trends')}>TikTok Trends</Button>
          <Button variant='outlined' onClick={() => handleNavigation('predictions')}>Predictions</Button>
          <Button variant='outlined' onClick={() => handleNavigation('scraper')}>Scraper</Button>
        </nav>
        <div className='weather'>
          <Weather />
        </div>
      </header>

      <div className='content'>
        {activeElement === 'home' && <Home />}
        {activeElement === 'list' && <List />}
        {activeElement === 'redirects' && <Redirects />}
        {activeElement === 'trends' && <Tiktok />}
        {activeElement === 'predictions' && <Predictions />}
        {activeElement === 'scraper' && <Scraper />}
      </div>

      <div className='footer'>
        
      </div>
    </div>
  );
}

export default App;