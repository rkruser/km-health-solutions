import React from 'react';

type PatientContextType = {
    selectedPatient: Record<string, any>;
    setSelectedPatient: (value: Record<string, any>) => void;
}

const PatientContext = React.createContext<PatientContextType>({
    selectedPatient: {},
    setSelectedPatient: () => {}
});

export default PatientContext;
