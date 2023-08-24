import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import AppContext from './app-context';
import RendererAPIService from '../api/ampere-api';

function AppInner() {
    const { patientId, setPatientId, API } = useContext(AppContext);
    const [patientSummary, setPatientSummary] = useState<string|null>(null);

    useEffect(() => {
        async function fetchSummary() {
            const summary = await API?.getOverallSummary(patientId, 'param676');
            setPatientSummary(summary ? summary : null);
        }
        fetchSummary();
    }, [patientId, API]);

    return (
        <div>
            <h1>AppInner</h1>
            <p>PatientId: {patientId}</p>
            <p>{patientSummary ? patientSummary : "Loading..."}</p>
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
                setPatientId: setPatientId,
                API: APIinstance
            }}>
                <AppInner />
            </AppContext.Provider>
        </div>
    );
}