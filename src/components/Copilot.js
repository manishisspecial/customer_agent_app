import React, { useState } from 'react';
import { Sparkles, Send, Loader2, ThumbsUp, ThumbsDown, Copy, RotateCcw } from 'lucide-react';

const Copilot = ({ conversation, onClose, onInsertResponse }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample suggestions based on conversation context
  const suggestions = [
    "Write a response addressing the shipping delay",
    "Generate an apology for the technical issue",
    "Create a summary of the conversation",
    "Suggest next steps for resolution"
  ];

  const handleSubmit = async (prompt) => {
    setIsLoading(true);
    const userMessage = prompt || input;
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput('');

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = "I understand you're looking for assistance with this matter. Based on the conversation context, here's a suggested response that addresses the customer's concerns while maintaining a professional and empathetic tone...";
      setMessages(prev => [...prev, { type: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSubmit(suggestion);
  };

  const handleFeedback = (messageIndex, isPositive) => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === messageIndex ? { ...msg, feedback: isPositive } : msg
    ));
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    onInsertResponse(content);
  };

  const handleRegenerate = (messageIndex) => {
    setMessages(prev => prev.filter((_, idx) => idx !== messageIndex));
    handleSubmit(messages[messageIndex - 1].content);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
        <span className="font-medium text-gray-900">AI Copilot</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Suggested prompts:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left text-sm p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.type === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            
            {/* Actions for AI responses */}
            {message.type === 'assistant' && (
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => handleFeedback(index, true)}
                  className={`p-1 rounded hover:bg-gray-100 ${
                    message.feedback === true ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFeedback(index, false)}
                  className={`p-1 rounded hover:bg-gray-100 ${
                    message.feedback === false ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopy(message.content)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRegenerate(index)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) handleSubmit();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Copilot..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Copilot; 