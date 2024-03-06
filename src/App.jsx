import React, { useState, useEffect } from 'react'; // Import useEffect hook
import './App.css';

import Home from './components/Home';
import List from './components/List';
import Redirects from './components/Redirects';
import Tiktok from './components/Tiktok';
import Predictions from './components/Predictions';
import Scraper from './components/Scraper';
import Weather from './components/Weather';
import Whois from './components/Whois';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function App() {
  const [activeElement, setActiveElement] = useState('home');
  const [value, setValue] = React.useState(0);

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
          <Button variant='outlined' onClick={() => handleNavigation('whois')}>Whois Lookup</Button>
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
        {activeElement === 'whois' && <Whois />}
      </div>

      <div className='footer'>
      
      </div>
    </div>
  );
}

export default App;