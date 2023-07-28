import '../css/app-header.css';
import SearchBar from './search-bar';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import React, { useState, useContext, useEffect, useRef } from 'react';


const SuggestedPatients: React.FC = () => {

    return (
        <div className='SuggestedPatients'>
            Here we will put suggested patients
        </div>
    )
}




const AppHeader: React.FC = () => {
    return (
        <div className='AppHeader'>
            <SuggestedPatients />
            <div className='SearchBarWrapper'>
                <SearchBar />
                <button className='IconWrapper'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default AppHeader;