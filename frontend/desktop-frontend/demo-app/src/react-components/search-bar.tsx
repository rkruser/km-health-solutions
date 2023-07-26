import '../css/search-area.css';
import React, { useState, useEffect, useCallback } from 'react';
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

// A typescript React wrapper component for individual search results
const SearchResult: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
    <div className='SearchResultOuter'>
        <div className='SearchResultInner'>
            {children}
        </div>
    </div>
    );
}


const SearchArea: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Result[]>([]);

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
  }, [inputValue]); // AI wants me to add debouncedSearch to the dependency array, but I don't see the purpose


  return (
    <div className='SearchArea'>
      <input
        className='SearchBar'
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result: Result, index: number) => (
            <SearchResult key={index}>{result}</SearchResult>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchArea;


