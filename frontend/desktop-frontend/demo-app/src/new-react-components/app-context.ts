import React from 'react';
import RendererAPIService from '../api/ampere-api';


type AppContextType = {
    patientId: string;
    API: RendererAPIService | null;
    patientSummary: string|null;
    orderSummary: string|null;
    basicInfo: string|null;
}

const AppContext = React.createContext<AppContextType>({
    patientId: '',
    API: null,
    patientSummary: null,
    orderSummary: null,
    basicInfo: null,
} as AppContextType);

export default AppContext;