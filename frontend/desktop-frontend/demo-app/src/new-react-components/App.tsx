import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import AppContext from './app-context';
import RendererAPIService from '../api/ampere-api';

type stateListEntryType = [string, ()=>RendererAPIService|null, (a:any)=>void, ()=>any]
function createAPIEffect(stateListEntry:stateListEntryType) : ()=>void {
    return () => {
        async function performAPIEffect() {
            const [apiFunc, apiGetter, stateSetter, stateGetter] = stateListEntry;
            stateSetter(null);
            const API = apiGetter();
            if (!API) {
                console.error("API not initialized");
                return;
            }
            const result = await API[apiFunc as keyof RendererAPIService](stateGetter(), 'param676');
            stateSetter(result ? result : null);
        }
        performAPIEffect();
    };
}

/*
Next steps:
- Allow the various state variables to be formatted like the corresponding ampere types (maybe even just use the state aggregate type? eh, depends)
- Use calls from the ampere API library to extract them into different display fields from the state
- Be able to get patient list and display it too
- Provide the various state variables to lower components?
*/

function AppInner() {
    const { patientId, API } = useContext(AppContext);
    const [patientSummary, setPatientSummary] = useState<string|null>(null);
    const [orderSummary, setOrderSummary] = useState<string|null>(null);
    const [basicInfo, setBasicInfo] = useState<string|null>(null);

    const stateList:stateListEntryType[] = [
        ['getOverallSummary', ()=>API, setPatientSummary, ()=>patientId],
        ['getOrderSummary', ()=>API, setOrderSummary, ()=>patientId],
        ['getBasicInfo', ()=>API, setBasicInfo, ()=>patientId],
    ];
    const effects = stateList.map(stateEntry => createAPIEffect(stateEntry));

    useEffect(() => {
        effects.forEach(effect => effect());
    }, [patientId, API]);

    return (
        <div>
            <h1>AppInner</h1>
            <p>PatientId: {patientId}</p>
            <p>{patientSummary ? patientSummary : "Loading..."}</p>
            <p>{orderSummary ? orderSummary : "Loading order summary..."}</p>
            <p>{basicInfo ? basicInfo:"loading basic info"}</p>
            <button onClick={() => API?.setCurrentPatientId(Math.random().toString())}>Change Patient</button>
        </div>
    );
}

export default function App() {
    const [patientId, setPatientId] = useState('test_patient_id');
    const APIinstance = new RendererAPIService(setPatientId);

    return (
        <div>
            <AppContext.Provider value={{
                patientId: patientId,
                API: APIinstance
            }}>
                <AppInner />
            </AppContext.Provider>
        </div>
    );
}