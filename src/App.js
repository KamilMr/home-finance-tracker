import React, { useState, useEffect } from 'react';

const App = () => {
  const [catData, setCatData] = useState(null);

  useEffect(() => {
    fetch('https://cataas.com/cat?json=true')
      .then(response => response.json())
      .then(data => {
        setCatData(data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  // Styles for centering the image
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Robaczek</h1>
      {catData && (
        <div style={imageContainerStyle}>
          <img src={`https://cataas.com/cat/${catData._id}`} alt="Random Cat" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Tags: {catData.tags.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default App;
