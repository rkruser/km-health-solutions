import React from 'react';

type SearchContextType = {
    selectedSearchValue: string;
    setSelectedSearchValue: (value: string) => void;
}

const SearchContext = React.createContext<SearchContextType>({
    selectedSearchValue: '', 
    setSelectedSearchValue: (value: string) => {} 
});

export default SearchContext;