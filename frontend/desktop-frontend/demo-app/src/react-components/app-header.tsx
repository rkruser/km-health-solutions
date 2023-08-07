import '../css/app-header.css';
import SearchBar from './search-bar';

import {ReactComponent as Logo} from '../graphics/medical_logo_dalle_v2.svg';

import DropdownMenu from './dropdown-menu';

import React, { useState, useContext, useEffect, useRef } from 'react';



const AppHeader: React.FC = () => {
    return (
        <div className='AppHeader'>
            <div className='AppHeaderTitle'>
                <div className='AppLogoWrapper'>
                    <Logo />
                </div>
                <div className='AppTitleText'>
                    <h1>Ampere Medical</h1>
                </div>
            </div>

            <div className='AppHeaderInner'>
                <DropdownMenu />
                <div className='SearchBarWrapper'>
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}

export default AppHeader;