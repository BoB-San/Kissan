
import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'model';
  text: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, text }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
       {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.056 0l1.255 1.255a1 1 0 001.414 0l1.255-1.255a1 1 0 011.056 0l2.646-1.134a1 1 0 000-1.84l-7-3zM12 10a2 2 0 10-4 0v3a2 2 0 104 0v-3z" />
              <path fillRule="evenodd" d="M3 11.25a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-green-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
