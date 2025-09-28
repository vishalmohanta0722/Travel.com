import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ScrollButton: React.FC = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

      setShowUp(!atTop);
      setShowDown(!atBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on page load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {showDown && (
        <button
          onClick={scrollToBottom}
          className="p-4 bg-purple-400 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all hover:scale-110"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      )}
      {showUp && (
        <button
          onClick={scrollToTop}
          className="p-4 bg-blue-400 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;