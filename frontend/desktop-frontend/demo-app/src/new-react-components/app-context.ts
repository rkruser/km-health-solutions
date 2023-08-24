import React from 'react';
import RendererAPIService from '../api/ampere-api';


type AppContextType = {
    patientId: string;
    API: RendererAPIService | null;
}

const AppContext = React.createContext<AppContextType>({
    patientId: '',
    API: null
} as AppContextType);

export default AppContext;