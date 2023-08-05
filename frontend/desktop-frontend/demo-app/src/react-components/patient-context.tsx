import { R } from '@storybook/react/dist/types-0a347bb9';
import React from 'react';

type PatientContextType = {
    selectedPatient: Record<string, any>;
    setSelectedPatient: (value: Record<string, any>) => void;
    selectedSearchValue: Record<string, any>;
    setSelectedSearchValue: (value: Record<string,any>) => void;
    allPatientData: Record<string, any>;
}

const PatientContext = React.createContext<PatientContextType>({
    selectedPatient: {},
    setSelectedPatient: (value: Record<string, any>) => {},
    selectedSearchValue: {}, 
    setSelectedSearchValue: (value: Record<string,any>) => {},
    allPatientData: {},
});

export default PatientContext;
