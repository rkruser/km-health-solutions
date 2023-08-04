import '../css/app-header.css';
import SearchBar from './search-bar';

import {ReactComponent as Logo} from '../graphics/medical_logo_dalle_v2.svg';

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
            <Logo />
            <DropdownMenu />
            <div className='SearchBarWrapper'>
                <SearchBar />
            </div>
        </div>
    );
}

export default AppHeader;