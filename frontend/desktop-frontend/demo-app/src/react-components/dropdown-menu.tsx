import React, { useState } from 'react';

const DropdownMenu: React.FC = () => {
  const optionsList: string[] = ['Option 1', 'Option 2', 'Option 3'];
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Suggested Patients</label>
      <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">-- Select an option --</option>
        {optionsList.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Selected patient: {selectedOption}</p>
    </div>
  );
};

export default DropdownMenu;
