import { useState, useEffect } from 'react'; // Import useEffect hook
import './App.css';
import axios from "axios";
import { saveAs } from 'file-saver';

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

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState({ name: '', password: '' });
  const [accounts, setAccounts] = useState([]);

  // Load accounts from local storage on component mount
  useEffect(() => {
    const storedAccounts = localStorage.getItem('accounts');
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  // Save accounts to local storage whenever accounts state changes
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  function handleRegister(e) {
    const { name, value } = e.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleLogin(e) {
    e.preventDefault();
    const { username, password } = e.target.elements;

    // Check if entered username and password match any account
    const accountExists = accounts.some(account => account.name === username.value && account.password === password.value);

    if (accountExists) {
      setLoggedIn(true);
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }

  function handleAccounts(e) {
    e.preventDefault();
    const newAccount = { id: Date.now(), name: register.name, password: register.password };
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
  }

  return (
    <>
      <h2>Home</h2>
      {loggedIn ? (
        <div>
          <p>Welcome, {register.name}!</p>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <form className='login-form' onSubmit={handleLogin}>
            <input type='text' placeholder='Username' name='username' />
            <input type='password' placeholder='Password' name='password' />
            <Button variant='contained' type='submit'>Login</Button>
          </form>

          <form className='register-form' onSubmit={handleAccounts}>
            <input type='text' placeholder='Username' name='name' value={register.name} onChange={handleRegister} />
            <input type='password' placeholder='Password' name='password' value={register.password} onChange={handleRegister} />
            <Button variant='contained' type='submit'>Register</Button>
          </form>
        </div>
      )}

      <ul>
        {accounts.map(account => (
          <li key={account.id}>{account.name}, {account.password}</li>
        ))}
      </ul>
    </>
  )
}

function List() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');

  const [activeElement, setActiveElement] = useState('home');

  const handleNavigation = (element) => {
    setActiveElement(element);
  };

  // Load todo list from local storage when component mounts
  useEffect(() => {
    const storedList = localStorage.getItem('todoList');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []); // Empty dependency array to run this effect only once when component mounts

  // Function to update local storage and state with new list
  function updateList(newList) {
    localStorage.setItem('todoList', JSON.stringify(newList));
    setList(newList);
  }

  function addTodo(todo) {
    setInput(todo);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(input.length > 0) {
      const newTodo = { id: Date.now(), value: input, completed: false };
      updateList([...list, newTodo]);
      setInput('');
    }
  }

  function handleDelete(id) {
    const updatedList = list.filter(todo => todo.id !== id);
    updateList(updatedList);
  }

  function handleCompleted(id, completed) {
    const updatedList = list.map(todo => {
      if(todo.id === id) {
        todo.completed = completed;
      }
      return todo;
    });
    updateList(updatedList);
  }

  return (
    <>
      <div className='main'>
        <h2>Todo List</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input value={input} type='text' className='user-input' onChange={e => addTodo(e.target.value)}/>
          <Button variant='contained' className='button'>Submit</Button>
        </form>

        <ol className='list'>
          {list.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input 
                type='checkbox' 
                checked={todo.completed} 
                onChange={(e) => handleCompleted(todo.id, e.target.checked)}
              />
              {todo.value}
              <Button variant="outlined" color='error' className='delete-button' onClick={() => handleDelete(todo.id)}>Delete</Button>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

function Redirects(){
  const [redirectTo, setRedirectTo] = useState('');
  const [oldSlug, setOldSlug] = useState('');
  const [redirectList, setRedirectList] = useState([]);
  const [redirectType, setRedirectType] = useState('302');

  const [generatedList, setGeneratedList] = useState([]);

  function handleSetRedirect(url) {
    setRedirectTo(url);
  }

  function handleSetOldSlug(urlFrom) {
    setOldSlug(urlFrom);
  }

  function addRedirect(e){
    e.preventDefault();
    const newOldSlugArr = oldSlug.split(',');
    const newOldSlug = {from: newOldSlugArr[0].replace(' ', ''), to: newOldSlugArr[1].replace(' ', '')};
    setRedirectList(prevList => [...prevList, newOldSlug]);
    setRedirectFrom('');
  }

  function setSelection(event){
    let selection = event.target.value;
    setRedirectType(selection);
  }

  return (
    <>
      <h2>Redirects</h2>
      <div className = "redirects-main">
        <form className='redirect-to' onSubmit={e => e.preventDefault()}>
          <label htmlFor="toURL"><strong>Redirect to:</strong></label>
          <input value = {redirectTo} type="text" className='toURL' onChange={e => handleSetRedirect(e.target.value)}/>
        </form>

        <form className='redirect-from' onSubmit={addRedirect}>
          <label htmlFor="fromURL"><strong>Redirect slugs:</strong> eg. /about/, /about-us/ </label>
          <input value={oldSlug} type="text" className='fromURL' onChange={e => handleSetOldSlug(e.target.value)}/>
          <button className='redirect-from-submit'>Submit</button>
        </form>
        <div className='redirect-list-main'>
          <div className='selection' onChange={setSelection}>
            <label htmlFor="302-selection"><strong>302</strong> </label>
            <input type='radio' className='302-selection' name="selection" value='302' checked={redirectType === '302'}/>
            <label htmlFor="301-selection"><strong>301</strong> </label>
            <input type='radio' className='301-selection' name="selection" value='301' checked={redirectType === '301'}/>
          </div>
          
          <span><strong>Redirect to:</strong> {redirectTo ? redirectTo : 'No redirect location set'}</span>
          <span className='generated-title'><strong>Generated redirects:</strong></span>
          <ul className='redirect-list'>
            {redirectList.length === 0 ? 'No redirects set' : redirectList.map((redirect) => (
              <>
                <li key={redirect.from}>
                  Redirect {redirectType} {redirect.from} {redirectTo}{redirect.to}
                </li>
              </>
            ))}
          </ul>

        </div>
      </div>
    </>
  );
}

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

const TikTok = () => {
  const [categoryData, setCategoryData] = useState(null);

  const options = {
    method: 'GET',
    url: 'https://tokapi-mobile-version.p.rapidapi.com/v1/category',
    params: {
      region: 'US',
      count: '10'
    },
    headers: {
      'X-RapidAPI-Key': 'f39f2ca9damsh359ef3d42e69137p133f66jsndcab0f2c4c17',
      'X-RapidAPI-Host': 'tokapi-mobile-version.p.rapidapi.com'
    }
  };
  
  const fetchCategoryData = async () => {
    try {
      const response = await axios.request(options);
      setCategoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return(
    <>
      <div className='categories-main'>
        {categoryData && (
          <div>
            {categoryData.category_list.map((category, i) => (
              <div key={i}>
                <h2>{category.category_name}</h2>
                <div>
                  {category.aweme_list.map((aweme, j) => (
                    <p key={j}>{aweme.desc}</p>
                  ))}
                </div>
              </div>
            ))}
            
          </div>
        )}
      </div>
    </>
  );
}

const Predictions = () => {
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

const Scraper = () => {
  const [scrapedData, setScrapedData] = useState(null);
  const [website, setWebsite] = useState('');

  function getWebsite(target){
    setWebsite(target);
  }

  const options = {
    method: 'GET',
    url: 'https://website-contacts-scraper.p.rapidapi.com/scrape-contacts',
    params: {
      query: website,
      match_email_domain: 'false',
      external_matching: 'false'
    },
    headers: {
      'X-RapidAPI-Key': 'f39f2ca9damsh359ef3d42e69137p133f66jsndcab0f2c4c17',
      'X-RapidAPI-Host': 'website-contacts-scraper.p.rapidapi.com'
    }
  };
  const handleScraper = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setScrapedData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (website !== '') { // Add a condition to prevent unnecessary requests when website is empty
      handleScraper();
    }
  }, [website]);

  return(
    <>
    <h1>Scraper</h1>
      <div className='scraper-main'>
        <label htmlFor="website">Website: </label>
        <input type='text' name='website' value={website} onChange={e => getWebsite(e.target.value)}/>
      </div>

      {scrapedData && (
        <div>
          {scrapedData.data.map((data, i) => (
            <div key={i}>
              <h2>{data.domain}</h2>
              {data.emails.map((email, i) =>(
                <p key={i}>{email.value}</p>
              ))}
              <span className='scraped-data'>
                <span>{data.facebook}</span>
                <span>{data.instagram}</span>
                <span>{data.linkedin}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

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
        {activeElement === 'trends' && <TikTok />}
        {activeElement === 'predictions' && <Predictions />}
        {activeElement === 'scraper' && <Scraper />}
      </div>

      <div className='footer'>
        
      </div>
    </div>
  );
}

export default App;