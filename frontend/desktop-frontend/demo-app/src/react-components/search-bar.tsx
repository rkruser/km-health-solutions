import '../css/search-bar.css';
import { getRandomInteger } from './utility';
import PatientContext from './patient-context';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { debounce, set } from 'lodash';

// We're assuming the result to be an array of string.
// Change this type to fit the data structure of your actual search results
type Result = string;



  

  // Hypothetical API call
async function searchApi(value: string) {
    // This is where you would call your API.
    // const results: Result[] = await fetch(`/api/search?query=${value}`)
    
    // Write a for-loop that takes the string value and produces an array of 10 strings that are the value + a random number
    let results=[];
    let numResults = getRandomInteger(5, 15);
    for (let i = 0; i < numResults; i++) {
        results.push(value + Math.random());
    }

    return results;
  }

type SearchResultProps = {
    value: string,
    isHighlighted: boolean,
    onClick: () => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
  };

// A typescript React wrapper component for individual search results
const SearchResult: React.FC<SearchResultProps> = ({ 
  value, 
  isHighlighted, 
  onClick, 
  onMouseEnter,
  onMouseLeave,
 }) => {
    return (
    <div 
        className={`SearchResultOuter ${isHighlighted ? 'highlighted' : ''}`}
        onClick={onClick}
        onMouseEnter={()=>{
          onMouseEnter();
        }}
        onMouseLeave={()=>{
          onMouseLeave();
        }}
    >
        <div className='SearchResultInner'>
            {value}
        </div>
    </div>
    );
}

const SearchButton: React.FC = () => {
  return (
    <button className='SearchButton'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </button>
  );
}


const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const { setSelectedSearchValue } = useContext(PatientContext);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState('default');
  
  // For displaying search results when searchbar is in focus, and hiding them when it is not
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement|null>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSearchResults(false);
    }
  };
  useEffect(() => {
    if (showSearchResults) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showSearchResults]);
  const handleSearchBarFocus = () => {
    setShowSearchResults(true);
  };


  // Debounce function to prevent immediate execution as user types
  const debouncedSearch = useCallback(
    (value:string) => {
      debounce((value: string) => {
          if (value === '') {
              setSearchResults([]);
              return;
          }
          searchApi(value).then((results) => setSearchResults(results));
      }, 300)(value);
   },
    [ ],
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]); // AI wants me to add debouncedSearch to the dependency array, but I don't see the purpose


    // Highlight the search result that is currently selected
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setHighlightIndex((prev) => (prev + 1 >= searchResults.length ? 0 : prev + 1));
                break;
            case 'ArrowUp':
                event.preventDefault();
                setHighlightIndex((prev) => (prev - 1 < 0 ? searchResults.length - 1 : prev - 1));
                break;
            case 'Enter':
                event.preventDefault();
                if (searchResults.length === 0) {
                  debouncedSearch(inputValue);
                }
                else {
                  setSelectedSearchValue(searchResults[highlightIndex]);
                  setSearchResults([]);
                }
                break;
            default:
                break;
        }
    };
    const searchInputNode = searchInputRef.current;
    searchInputNode?.addEventListener('keydown', handleKeyDown);
    return () => {
        searchInputNode?.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchResults, highlightIndex, setHighlightIndex, setSelectedSearchValue, debouncedSearch, inputValue]);



  return (
    <div className='SearchBar' ref={searchRef}>
      <div className='SearchBarInner'>
        <input
          ref={searchInputRef}
          className='InputBar'
          type="text"
          value={inputValue}
          onFocus={handleSearchBarFocus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
              setHighlightIndex(0);
          }}
        />
        {
         showSearchResults &&
         (searchResults.length > 0) && (
          <div className="search-results"
            onMouseEnter={()=>{
              setCursor('pointer');
            }}
            onMouseLeave={()=>{
              setCursor('default');
            }}
            style={{cursor: cursor}}
          >
            {searchResults.map((result: Result, index: number) => (
              <SearchResult
                  key={index}
                  isHighlighted={index === highlightIndex}
                  onMouseEnter={() => {
                    setHighlightIndex(index);
                  }}
                  onMouseLeave={() => {}}
                  onClick={() => {
                      setSelectedSearchValue(result);
                      setSearchResults([]);
                  }}
                  value = {result}
              />
            ))}
          </div>
        )}
      </div>
      <SearchButton />
    </div>
  );
};

export default SearchBar;


