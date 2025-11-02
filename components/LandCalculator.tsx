
import React, { useState } from 'react';
import type { CalculatorResult, ProfitableCrop } from '../types';
import { INDIAN_STATES } from '../types';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

interface LandCalculatorProps {
  vegetableName: string;
  onCalculate: (landSize: number, landUnit: string, region: string) => void;
  result: CalculatorResult | null;
  isLoading: boolean;
}

const LandCalculator: React.FC<LandCalculatorProps> = ({ vegetableName, onCalculate, result, isLoading }) => {
  const [landSize, setLandSize] = useState<string>('');
  const [landUnit, setLandUnit] = useState<string>('acre');
  const [region, setRegion] = useState<string>(INDIAN_STATES[0]);
  const [error, setError] = useState<string>('');

  const handleCalculateClick = () => {
    const size = parseFloat(landSize);
    if (isNaN(size) || size <= 0) {
      setError('Please enter a valid land size.');
      return;
    }
    setError('');
    onCalculate(size, landUnit, region);
  };
  
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-center text-green-800 mb-4">
        Land Profitability Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
        <div className="md:col-span-1">
          <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
            Land Size
          </label>
          <input
            id="landSize"
            type="number"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            placeholder="e.g., 5"
            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="landUnit" className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select
            id="landUnit"
            value={landUnit}
            onChange={(e) => setLandUnit(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="acre">Acre</option>
            <option value="hectare">Hectare</option>
            <option value="bigha">Bigha</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
           <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
        </div>
        <button
          onClick={handleCalculateClick}
          disabled={isLoading || !landSize}
          className="w-full flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Calculating...</span>
            </>
          ) : (
            'Calculate Yield'
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      {result && (
        <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                 <h4 className="text-lg font-semibold text-gray-800 mb-2">Potential Yield for {vegetableName}</h4>
                 <p className="text-3xl font-bold text-green-600">{result.potentialYield}</p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Profitable Crop Alternatives</h4>
                <div className="space-y-4">
                    {result.profitableCrops.map((crop: ProfitableCrop) => (
                        <div key={crop.name} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="font-bold text-green-800">{crop.name}</p>
                            <p className="text-sm text-gray-600">{crop.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default LandCalculator;
