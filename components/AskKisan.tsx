import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import LoadingSpinner from './LoadingSpinner';
import type { ChatMessage as ChatMessageType } from '../types';

// SpeechRecognition polyfill for cross-browser compatibility
// FIX: Cast window to `any` to access non-standard browser APIs. This resolves:
// - Property 'SpeechRecognition' does not exist on type 'Window & typeof globalThis'.
// - Property 'webkitSpeechRecognition' does not exist on type 'Window & typeof globalThis'.
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// FIX: Use `any` type for the recognition object to avoid name collision with the `SpeechRecognition` variable. This resolves:
// - 'SpeechRecognition' refers to a value, but is being used as a type here. Did you mean 'typeof SpeechRecognition'?
let recognition: any | null = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US'; // This can be any language; the model will detect the spoken language.
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}

interface AskKisanProps {
    messages: ChatMessageType[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    onClearChat: () => void;
}

const AskKisan: React.FC<AskKisanProps> = ({ messages, onSendMessage, isLoading, onClearChat }) => {
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    const handleSend = () => {
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText('');
        }
    };
    
    const handleMicClick = () => {
        if (!recognition) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            setIsRecording(true);
            recognition.start();
        }
    };

    if (recognition) {
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        };
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsRecording(false);
        };
         recognition.onend = () => {
            setIsRecording(false);
        };
    }

    return (
        <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                 <h3 className="text-xl font-bold text-green-800">
                    Ask Kisan Mitra
                </h3>
                <button onClick={onClearChat} className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">Clear Chat</button>
            </div>
           
            <div ref={chatContainerRef} className="p-4 h-96 overflow-y-auto bg-white">
                {messages.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <p>Ask me anything about exotic farming!</p>
                        <p className="text-xs mt-1">(Hindi, English, or Marathi)</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <ChatMessage key={index} role={msg.role} text={msg.text} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                     <div className="flex justify-start mb-4">
                        <div className="max-w-prose px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none flex items-center justify-center">
                           <LoadingSpinner />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t flex items-center gap-2 bg-gray-50 rounded-b-lg">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    placeholder="Type or use the mic..."
                    disabled={isLoading}
                    className="flex-grow w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                 <button 
                    onClick={handleMicClick} 
                    disabled={!recognition}
                    className={`flex-shrink-0 p-2 rounded-full transition-colors duration-200 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 10v-2m0 0V5m0 6a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                 </button>
                 <button
                    onClick={handleSend}
                    disabled={isLoading || !inputText.trim()}
                    className="flex-shrink-0 p-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                     aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AskKisan;