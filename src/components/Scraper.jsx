import React, { useState, useEffect } from 'react';
import axios from "axios";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Typography from '@mui/material/Typography';

export default function Scraper(){
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
      <Typography variant = "h2" component="h1" mb={4}> Scraper </Typography>
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