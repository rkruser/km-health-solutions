import React from 'react';
import RendererAPIService from '../api/ampere-api';


type AppContextType = {
    patientId: string;
    setPatientId: (value: string) => void;
    API: RendererAPIService | null;
}

const AppContext = React.createContext<AppContextType>({
    patientId: '',
    setPatientId: () => {},
    API: null
} as AppContextType);

export default AppContext;