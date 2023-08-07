import React from 'react';

type PatientContextType = {
    selectedPatient: Record<string, any>;
    setSelectedPatient: (value: Record<string, any>) => void;
    selectedSearchValue: string;
    setSelectedSearchValue: (value: string) => void;    
}

const PatientContext = React.createContext<PatientContextType>({
    selectedPatient: {},
    setSelectedPatient: (value: Record<string, any>) => {},
    selectedSearchValue: '', 
    setSelectedSearchValue: (value: string) => {}     
});

export default PatientContext;
