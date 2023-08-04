import React from 'react';

type PatientContextType = {
    selectedPatient: Record<string, any>;
    setSelectedPatient: (value: Record<string, any>) => void;
    selectedSearchValue: string;
    setSelectedSearchValue: (value: string) => void;
    allPatientData: Record<string, any>;
}

const PatientContext = React.createContext<PatientContextType>({
    selectedPatient: {},
    setSelectedPatient: (value: Record<string, any>) => {},
    selectedSearchValue: '', 
    setSelectedSearchValue: (value: string) => {},
    allPatientData: {},
});

export default PatientContext;
