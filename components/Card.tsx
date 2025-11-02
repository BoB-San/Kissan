import React from 'react';

interface CardProps {
  title: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve the namespace issue.
  icon: React.ReactElement;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="text-green-600">{icon}</div>
        <h3 className="ml-3 text-xl font-bold text-green-800">{title}</h3>
      </div>
      <div className="text-gray-700 space-y-2 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default Card;
