import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import AppContext from './app-context';
import RendererAPIService, {testAPIModel} from '../api/ampere-api';

type stateListEntryType = [string, (a:any)=>void]
function createAPIEffect(stateListEntry:stateListEntryType) : (a:RendererAPIService|null,b:string)=>void {
    return (API:RendererAPIService|null, patientId:string) => {
        async function performAPIEffect(API_in:RendererAPIService|null, patientId_in:string) {
            const [apiFunc, stateSetter] = stateListEntry;
            stateSetter(null);
            if (!API_in) {
                console.error("API not initialized");
                return;
            }
            const result = await API_in[apiFunc as keyof RendererAPIService](patientId_in, 'param676');
            stateSetter(result ? result : null);
        }
        performAPIEffect(API, patientId);
    };
}

function AppInner() {
    const { patientId, API, patientSummary, orderSummary, basicInfo } = useContext(AppContext);

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
    const APIinstance = useRef(new RendererAPIService(setPatientId)).current;

    const [patientSummary, setPatientSummary] = useState<string|null>(null);
    const [orderSummary, setOrderSummary] = useState<string|null>(null);
    const [basicInfo, setBasicInfo] = useState<string|null>(null);

    const stateList:stateListEntryType[] = [
        ['getOverallSummary', setPatientSummary],
        ['getOrderSummary', setOrderSummary],
        ['getBasicInfo', setBasicInfo],
    ];
    const effects = stateList.map(stateEntry => createAPIEffect(stateEntry));

    useEffect(() => {
        effects.forEach(effect => effect(APIinstance, patientId));
    }, [patientId, APIinstance]);


    /* 
    Testing a different model of notification
    */
    const TestAPIModel = useRef(new testAPIModel()).current;
    const [notifierVar, setNotifierVar] = useState<number>(0);
    const [testKey, setTestKey] = useState<string>('firstKey');

    return (
        <div>
            <AppContext.Provider value={{
                patientId: patientId,
                API: APIinstance,
                patientSummary: patientSummary,
                orderSummary: orderSummary,
                basicInfo: basicInfo
            }}>
                <AppInner />
                <p>{TestAPIModel.obtain(testKey, notifierVar, setNotifierVar)}</p>
                <button onClick={() => setTestKey('key_'+Math.random().toString())}>Change Key</button>
            </AppContext.Provider>
        </div>
    );
}



/*
Next steps:
- Allow the various state variables to be formatted like the corresponding ampere types (maybe even just use the state aggregate type? eh, depends)
- Use calls from the ampere API library to extract them into different display fields from the state
- Be able to get patient list and display it too
- Provide the various state variables to lower components?
*/