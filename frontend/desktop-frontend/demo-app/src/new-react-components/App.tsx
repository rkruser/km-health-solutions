import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import AppContext from './app-context';
import RendererAPIService from '../api/ampere-api';

function AppInner() {
    const { patientId, API } = useContext(AppContext);
    const [patientSummary, setPatientSummary] = useState<string|null>(null);
    const [orderSummary, setOrderSummary] = useState<string|null>(null);
    const [basicInfo, setBasicInfo] = useState<string|null>(null);

    useEffect(() => {
        async function fetchSummary() {
            setPatientSummary(null);
            const summary = await API?.getOverallSummary(patientId, 'param676');
            setPatientSummary(summary ? summary : null);
        }
        fetchSummary();
    }, [patientId, API]);
    useEffect(() => {
        async function fetchOrderSummary() {
            setOrderSummary(null);
            const summary = await API?.getOrderSummary(patientId, 'param678');
            setOrderSummary(summary ? summary : null);
        }
        fetchOrderSummary();
    }, [patientId, API]);
    useEffect(() => {
        async function fetchBasicInfo() {
            setBasicInfo(null);
            const info = await API?.getBasicInfo(patientId,"lem2");
            setBasicInfo(info ? info : null);
        }
        fetchBasicInfo();
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