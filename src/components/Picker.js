import {useState} from 'react';

import {MuiColorInput} from 'mui-color-input';

const validate = (str) => {
  if (!str) return '#ffffff';
  return str.split('').indexOf('#') > -1 ? str : `#${str}`;
};

const MyComponent = ({cb = () => {}, sx, val = '', editable = true}) => {
  const [value, setValue] = useState(validate(val));

  const handleChange = (newValue) => {
    setValue(newValue);
    cb({target: {name: 'color', value: newValue}});
  };

  return (
    <MuiColorInput
      disabled={!editable}
      format="hex"
      sx={{...sx}}
      value={value}
      onChange={handleChange}
    />
  );
};

export default MyComponent;
