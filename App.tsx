
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VegetableInfo from './components/VegetableInfo';
import LandCalculator from './components/LandCalculator';
import AskKisan from './components/AskKisan';
import { getVegetableInfo, calculateYieldAndCrops, sendChatMessage, resetChat } from './services/geminiService';
import type { VegetableData, CalculatorResult, ChatMessage } from './types';

const App: React.FC = () => {
  const [vegetableName, setVegetableName] = useState<string>('');
  const [vegetableData, setVegetableData] = useState<VegetableData | null>(null);
  const [calculatorResult, setCalculatorResult] = useState<CalculatorResult | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(false);
  const [isLoadingCalc, setIsLoadingCalc] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New states for chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    setIsLoadingInfo(true);
    setError(null);
    setVegetableData(null);
    setCalculatorResult(null);
    setVegetableName(query);

    try {
      const data = await getVegetableInfo(query);
      setVegetableData(data);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch vegetable information. Please try again.');
    } finally {
      setIsLoadingInfo(false);
    }
  }, []);
  
  const handleCalculate = useCallback(async (landSize: number, landUnit: string, region: string) => {
    if (!vegetableName || !landSize || !region) return;
    setIsLoadingCalc(true);
    setCalculatorResult(null);
    try {
      const result = await calculateYieldAndCrops(vegetableName, landSize, landUnit, region);
      setCalculatorResult(result);
    } catch (e) {
      console.error(e);
      setError('Failed to perform calculation. Please try again.');
    } finally {
      setIsLoadingCalc(false);
    }
  }, [vegetableName]);

  const handleSendChatMessage = useCallback(async (message: string) => {
    setIsChatLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);

    try {
        const responseText = await sendChatMessage(message);
        setChatMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
        console.error(e);
        const errorMessage = 'Sorry, I had trouble responding. Please try again.';
        setChatMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
        setIsChatLoading(false);
    }
  }, []);

  const handleClearChat = useCallback(() => {
    setChatMessages([]);
    resetChat();
  }, []);


  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-2">Your AI Farming Assistant</h2>
          <p className="text-center text-gray-600 mb-8">
            Enter a vegetable name to get a complete guide on cultivation, costs, and market prices.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoadingInfo} />

          {error && <div className="mt-6 text-center text-red-600 bg-red-100 border border-red-400 rounded-lg p-4">{error}</div>}
          
          <VegetableInfo data={vegetableData} isLoading={isLoadingInfo} />

          {vegetableData && (
             <LandCalculator 
              vegetableName={vegetableName} 
              onCalculate={handleCalculate} 
              result={calculatorResult} 
              isLoading={isLoadingCalc} 
            />
          )}

          <AskKisan 
            messages={chatMessages}
            onSendMessage={handleSendChatMessage}
            isLoading={isChatLoading}
            onClearChat={handleClearChat}
          />

        </div>
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        <p>&copy; 2025 Built by Usman & Shraddha</p>
      </footer>
    </div>
  );
};

export default App;
