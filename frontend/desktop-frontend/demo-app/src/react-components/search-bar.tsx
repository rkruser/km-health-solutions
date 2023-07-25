import '../css/search-bar.css';
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

// We're assuming the result to be an array of string.
// Change this type to fit the data structure of your actual search results
type Result = string;

  // Hypothetical API call
async function searchApi(value: string) {
    // This is where you would call your API.
    // const results: Result[] = await fetch(`/api/search?query=${value}`)
    
    // Write a for-loop that takes the string value and produces an array of 10 strings that are the value + a random number
    let results=[];
    for (let i = 0; i < 10; i++) {
        results.push(value + Math.random());
    }

    return results;
  }


const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  // Debounce function to prevent immediate execution as user types
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      searchApi(value).then((results) => setSearchResults(results));
    }, 300),
    [],
  );

  useEffect(() => {
    if (inputValue === '') {
      setSearchResults([]);
      return;
    }
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);


  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result: Result, index: number) => (
            <div key={index}>{result}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


