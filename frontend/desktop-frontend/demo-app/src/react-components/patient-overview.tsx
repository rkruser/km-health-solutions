import '../css/patient-overview.css';
import PatientContext from './patient-context';
import React, { useState, useContext, useEffect, useRef } from 'react';


type KeywordComponents = {
    [keyword: string]: React.FC<any>
}

const COMPONENT_MAP: KeywordComponents = {
    'summary': ({data}) => {return <div>Summary: {data}</div>},
    'orders': ({data}) => {return <div>Orders: {data}</div>},
    'medications': ({data}) => {return <div>Medications: {data}</div>},
    'timeline': ({}) => {return <div>Timeline</div>},
    'history': ({data}) => {return <div>History: {data}</div>},
    'labs': ({}) => {return <div>Labs</div>},
    'vitals': ({data}) => {return <div>Vitals: {data}</div>},
    'notes': ({}) => {return <div>Notes</div>},
    'recommendations': ({data}) => {return <div>Recommendations: {data}</div>},
    'diagnoses': ({}) => {return <div>Diagnoses</div>},
    'allergies': ({}) => {return <div>Allergies</div>},
}

type DataPanelInputType = {
    entry: {keyword: string, data: any}
}

const DataPanel: React.FC<DataPanelInputType> = ({entry}) => {
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


// Put this in a different file under type 'patient'?
type PatientInfoInputType = {
    info: {name: string, dob: string, description: string}
}

const PatientInfoPanel: React.FC<PatientInfoInputType> = ({info}) => {
    return (
        <div className='PatientInfoPanel'>
            <div className='PatientName'>
                {info.name}
            </div>
            <div className='PatientDOB'>
                D.O.B. {info.dob}
            </div>
            <div className='PatientDescription'>
                {info.description}
            </div>
        </div>
    )
}


const PatientOverview: React.FC = () => {
    const {selectedPatient} = useContext(PatientContext);

    const keywordsToInclude = ['summary', 'orders', 'recommendations']; // Changed to an array to keep order

    return (
        <div className='PatientOverview'>
            <div className='PatientHeader'>
                <PatientInfoPanel info={selectedPatient.info} />
            </div>
            <div className='PatientFields'>
            {   
                keywordsToInclude
                .filter(keyword => selectedPatient.hasOwnProperty(keyword)) // Ensure the keyword exists in the object
                .map(keyword => (
                    <DataPanel key={keyword} entry={{ keyword, data: selectedPatient[keyword] }} /> // Access data directly from the object
                ))
            }
            </div>
        </div>
    );
}


export default PatientOverview;