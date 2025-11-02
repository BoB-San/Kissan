
import React from 'react';
import type { VegetableData } from '../types';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

interface VegetableInfoProps {
  data: VegetableData | null;
  isLoading: boolean;
}

const icons = {
  grow: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  considerations: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  price: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m5 4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z" /></svg>,
  time: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  costs: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  harvest: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  pairing: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  map: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
};

const VegetableInfo: React.FC<VegetableInfoProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center p-10">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-green-700">Generating your custom farming guide...</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="How to Grow" icon={icons.grow}>
        <p className="whitespace-pre-wrap">{data.howToGrow}</p>
      </Card>
      <Card title="Key Considerations" icon={icons.considerations}>
        <p className="whitespace-pre-wrap">{data.keyConsiderations}</p>
      </Card>
      <Card title="Market Price (India)" icon={icons.price}>
        <p className="text-2xl font-bold text-green-700">{data.marketPriceIndia}</p>
      </Card>
      <Card title="Growth Time" icon={icons.time}>
        <p className="text-2xl font-bold text-green-700">{data.growthTime}</p>
      </Card>
      <div className="md:col-span-2">
        <Card title="Estimated Costs" icon={icons.costs}>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Seeds:</strong> {data.estimatedCosts.seeds}</li>
            <li><strong>Infrastructure:</strong> {data.estimatedCosts.infrastructure}</li>
            <li><strong>Other Expenses:</strong> {data.estimatedCosts.other}</li>
          </ul>
        </Card>
      </div>
       <div className="md:col-span-2">
        <Card title="Post-Harvest Handling" icon={icons.harvest}>
          <p className="whitespace-pre-wrap">{data.postHarvest}</p>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card title="High Demand Regions" icon={icons.map}>
          <p className="whitespace-pre-wrap">{data.highDemandRegions}</p>
        </Card>
      </div>
       <div className="md:col-span-2">
        <Card title="Crop Pairings" icon={icons.pairing}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {data.cropPairings.map((crop, index) => (
              <li key={index} className="bg-green-100 text-green-800 text-center text-sm font-medium py-2 px-3 rounded-full">{crop}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default VegetableInfo;