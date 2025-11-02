import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.056 0l1.255 1.255a1 1 0 001.414 0l1.255-1.255a1 1 0 011.056 0l2.646-1.134a1 1 0 000-1.84l-7-3zM12 10a2 2 0 10-4 0v3a2 2 0 104 0v-3z" />
          <path fillRule="evenodd" d="M3 11.25a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-green-800 tracking-tight">
          Kissan Mitra
        </h1>
      </div>
    </header>
  );
};

export default Header;