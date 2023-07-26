import '../css/search-bar.css';
import SearchContext from './search-context';

import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { debounce, set } from 'lodash';

// We're assuming the result to be an array of string.
// Change this type to fit the data structure of your actual search results
type Result = string;


// Should put this in utilities
function getRandomInteger(min: number, max: number) {
    min = Math.ceil(min); // Round up to the nearest whole number
    max = Math.floor(max); // Round down to the nearest whole number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

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


const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const { setSelectedSearchValue } = useContext(SearchContext);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState('default');

  // Debounce function to prevent immediate execution as user types
  const debouncedSearch = useCallback(
    debounce((value: string) => {
        if (value === '') {
            setSearchResults([]);
            return;
        }
        searchApi(value).then((results) => setSearchResults(results));
    }, 300),
    [],
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
    searchInputRef.current?.addEventListener('keydown', handleKeyDown);
    return () => {
        searchInputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchResults, highlightIndex, setHighlightIndex, setSelectedSearchValue]);



  return (
    <div className='SearchBar'>
      <input
        ref={searchInputRef}
        className='InputBar'
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            setHighlightIndex(0);
        }}
      />
      {searchResults.length > 0 && (
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
  );
};

export default SearchBar;


