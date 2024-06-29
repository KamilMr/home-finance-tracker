import {Button} from '@mui/material';
import {Container} from '@mui/system';
import React, {useState, useEffect} from 'react';

export const Cats = ({title = 'Kotki', disableNext}) => {
  const [catData, setCatData] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch('https://cataas.com/cat?json=true')
      .then((response) => response.json())
      .then((data) => {
        setCatData(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handleReload = () => {
    if (!disableNext) setReload(!reload);
  };

  // Styles for centering the image
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <Container sx={{textAlign: 'center'}}>
      <h1 style={{textAlign: 'center'}}>{title}</h1>
      {catData && (
        <div style={imageContainerStyle}>
          <img
            src={`https://cataas.com/cat/${catData._id}`}
            alt="Random Cat"
            style={{maxWidth: '100%', maxHeight: 320}}
          />
          <p>Tags: {catData.tags.join(', ')}</p>
        </div>
      )}
      {!disableNext && <Button onClick={handleReload}>Następny</Button>}
    </Container>
  );
};
