import '../css/patient-overview.css';
import PatientContext from './patient-context';
import React, { useState, useContext, useEffect, useRef } from 'react';


type KeywordComponents = {
    [keyword: string]: React.FC<any>
}

const COMPONENT_MAP: KeywordComponents = {
    'summary': ({data}) => {return <div>Summary: {data}</div>},
    'orders': ({data}) => {return <div>Orders: {data}</div>},
    'medications': ({}) => {return <div>Medications</div>},
    'timeline': ({}) => {return <div>Timeline</div>},
    'history': ({data}) => {return <div>History: {data}</div>},
    'labs': ({}) => {return <div>Labs</div>},
    'vitals': ({data}) => {return <div>Vitals: {data}</div>},
    'notes': ({}) => {return <div>Notes</div>},
    'recommendations': ({}) => {return <div>Recommendations</div>},
    'diagnoses': ({}) => {return <div>Diagnoses</div>},
    'allergies': ({}) => {return <div>Allergies</div>},
}

type DataPanelProperties = {
    entry: {keyword: string, data: any}
}

const DataPanel: React.FC<DataPanelProperties> = ({entry}) => {
    const ComponentToRender = COMPONENT_MAP[entry.keyword];
    if (!ComponentToRender) {
        return null;
    }

    return (
        <div className='DataPanel'>
            <ComponentToRender data={entry.data} />
        </div>
    );
}

const PatientOverview: React.FC = () => {
    const {selectedPatient} = useContext(PatientContext);

    return (
        <div className='PatientOverview'>
            {Object.entries(selectedPatient).map(([keyword, data], _) => (
                <DataPanel key={keyword} entry={{ keyword, data }} />
            ))}
        </div>
    );
}

export default PatientOverview;