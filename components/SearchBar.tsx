
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('e.g., Tomato, Carrot, Spinach...');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-grow w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        onFocus={() => setPlaceholder('')}
        onBlur={() => setPlaceholder('e.g., Tomato, Carrot, Spinach...')}
      />
      <button
        type="submit"
        disabled={isLoading || !query}
        className="flex items-center justify-center px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="ml-2">Analyzing...</span>
          </>
        ) : (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <span>Search</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default SearchBar;
