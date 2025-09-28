import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to TravelCo. How can I help you plan your next adventure?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Keyword-based bot replies
  const botReplies = [
    {
      keywords: [
        'hi',
        'hey',
        'hello',
        "what's up",
        'how are you',
        'who are you',
      ],
      responses: [
        'Hello! I am TravelCo Bot, your virtual travel assistant. How can I help you today?',
        'Hey there! Ready to plan your next adventure? Ask me anything about our travel packages!',
        "Hi,I am good ,! I'm here to help you explore destinations, book flights, and find the best deals.",
        ' I am good ',
      ],
    },
    {
      keywords: ['destination', 'places', 'tour', 'location', 'where'],
      responses: [
        'We have several destinations that would be perfect for you. Would you like to see our most popular options?',
        'Our top destinations this month are Bali, Paris, and Maldives. Interested in any of these?',
      ],
    },
    {
      keywords: ['price', 'budget', 'cost', 'package', 'expensive'],
      responses: [
        'Our travel packages start from $500 and can be customized according to your budget.',
        "We can create a custom itinerary for your budget. What's your preferred range?",
      ],
    },
    {
      keywords: ['flight', 'air', 'plane', 'tickets'],
      responses: [
        'We offer flight booking along with our travel packages. Do you want us to include flights?',
        "You can choose your preferred airline, and we'll arrange your tickets as part of your package.",
      ],
    },
    {
      keywords: ['hotel', 'stay', 'accommodation', 'room'],
      responses: [
        'We provide 3⭐ to 5⭐ hotel stays. Do you have any preference?',
        'We can include hotels with breakfast, free WiFi, and great reviews in your package.',
      ],
    },
    {
      keywords: ['offer', 'deal', 'discount', 'promo'],
      responses: [
        'We have special offers this month. Would you like to hear about our current deals?',
        'Book now and get up to 20% off on selected packages!',
      ],
    },
    {
      keywords: ['custom', 'plan', 'itinerary', 'schedule'],
      responses: [
        'Our travel experts can create a custom itinerary for you. What kind of activities do you like?',
        'You can customize every part of your trip — flights, hotels, and sightseeing!',
      ],
    },
    {
      keywords: ['help', 'support', 'question', 'contact', 'need'],
      responses: [
        'You can chat with one of our travel specialists for personalized support.',
        "I'm here to help! What would you like assistance with?",
      ],
    },
  ];

  const getBotReply = (userText: string) => {
    const lowerText = userText.toLowerCase();

    for (let item of botReplies) {
      if (item.keywords.some((keyword) => lowerText.includes(keyword))) {
        return item.responses[
          Math.floor(Math.random() * item.responses.length)
        ];
      }
    }

    return "That's interesting! Can you please provide more details about your travel plans?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotReply(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Bottom Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-40 right-6 z-50 p-4 bg-gradient-to-r from-blue-300 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl transition-all transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-44 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Chat with Us</h3>
                <p className="text-xs opacity-90">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'flex-row-reverse space-x-reverse'
                      : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-full transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
