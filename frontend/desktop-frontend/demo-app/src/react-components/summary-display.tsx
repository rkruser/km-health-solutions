import React, { useState } from 'react';

type RadioOption = 'option1' | 'option2' | 'option3';

const RadioButtonComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<RadioOption>('option1');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as RadioOption);
  };

  return (
    <div>
      <div>
        <input 
          type="radio" 
          id="option1" 
          value="option1" 
          checked={selectedOption === 'option1'} 
          onChange={handleOptionChange} 
        />
        <label htmlFor="option1">Option 1</label>

        <input 
          type="radio" 
          id="option2" 
          value="option2" 
          checked={selectedOption === 'option2'} 
          onChange={handleOptionChange} 
        />
        <label htmlFor="option2">Option 2</label>

        <input 
          type="radio" 
          id="option3" 
          value="option3" 
          checked={selectedOption === 'option3'} 
          onChange={handleOptionChange} 
        />
        <label htmlFor="option3">Option 3</label>
      </div>

      <div>
        {selectedOption === 'option1' && <p>This is the text for option 1.</p>}
        {selectedOption === 'option2' && <p>This is the text for option 2.</p>}
        {selectedOption === 'option3' && <p>This is the text for option 3.</p>}
      </div>
    </div>
  );
};

export default RadioButtonComponent;
