import React, { useState, useEffect } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Typography from '@mui/material/Typography';

export default function Redirects(){
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
        <Typography variant = "h2" component="h1" mb={4}> Redirects </Typography>
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