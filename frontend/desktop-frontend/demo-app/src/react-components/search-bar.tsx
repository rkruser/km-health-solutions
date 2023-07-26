import '../css/search-bar.css';
import SearchContext from './search-context';

import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

// We're assuming the result to be an array of string.
// Change this type to fit the data structure of your actual search results
type Result = string;


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
    children: React.ReactNode,
    isHighlighted: boolean,
    onClick: () => void
  };

// A typescript React wrapper component for individual search results
const SearchResult: React.FC<SearchResultProps> = ({ children, isHighlighted, onClick }) => {
    return (
    <div 
        className={`SearchResultOuter ${isHighlighted ? 'highlighted' : ''}`}
        onClick={onClick}
    >
        <div className='SearchResultInner'>
            {children}
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
                setSelectedSearchValue(searchResults[highlightIndex]);
                break;
            default:
                break;
        }
    };
    searchInputRef.current?.addEventListener('keydown', handleKeyDown);
    return () => {
        searchInputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
    }, [searchResults, highlightIndex, setSelectedSearchValue]);



  return (
    <div className='SearchArea'>
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
        <div className="search-results">
          {searchResults.map((result: Result, index: number) => (
            <SearchResult
                key={index}
                isHighlighted={index === highlightIndex}
                onClick={() => {
                    setSelectedSearchValue(result);
                    setHighlightIndex(index);
                }}
            >
                {result}
            </SearchResult>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


