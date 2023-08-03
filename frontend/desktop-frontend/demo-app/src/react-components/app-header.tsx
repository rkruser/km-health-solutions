import '../css/app-header.css';
import SearchBar from './search-bar';


import DropdownMenu from './dropdown-menu';

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
            <DropdownMenu />
            <div className='SearchBarWrapper'>
                <SearchBar />
            </div>
        </div>
    );
}

export default AppHeader;