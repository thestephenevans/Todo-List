import React, { useState, useEffect } from 'react';

export default function TikTok(){
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