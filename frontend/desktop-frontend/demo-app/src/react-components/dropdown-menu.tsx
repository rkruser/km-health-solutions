import React, { useState, useContext, useEffect } from 'react';
import PatientContext from './patient-context';

const DropdownMenu: React.FC = () => {

  const {allPatientData} = useContext(PatientContext);
  const { setSelectedPatient } = useContext(PatientContext);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [optionsList, setOptionsList] = useState<[string,number][]>([]);

  //const optionsList: [string,number][] = allPatientData.firstNames.map((name:string,index:number)=>[`${allPatientData.lastNames[index]}, ${name}`,index]); //[['Option 1',0]];


  useEffect(() => {
    if (allPatientData && allPatientData.firstNames) {
      setOptionsList(allPatientData.firstNames.map((name:string,index:number)=>[`${allPatientData.lastNames[index]}, ${name}`,index]));
    }
  }, [allPatientData]);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  
    // Find the index of the selected option in the optionsList array
    const selectedIndex = optionsList.findIndex((option) => option[0] === selectedOption);
  
    // If the selected option is found in the optionsList array, update the selected patient
    if (selectedIndex !== -1) {
      setSelectedPatient(allPatientData.records[optionsList[selectedIndex][1]]);
    }
  };

  return (
    <div>
      <label htmlFor="dropdown">Suggested Patients</label>
      <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">-- Select an option --</option>
        {optionsList.map((option, index) => (
          <option key={index} value={option[0]}>
            {option[0]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
