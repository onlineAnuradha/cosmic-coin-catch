
import { useState } from 'react';
import { Rocket } from 'lucide-react';

export const Mascot = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <div className="relative">
        <div className="glass-card p-4 rounded-full animate-float">
          <Rocket className="text-cyan-400 w-8 h-8" />
        </div>
        
        {/* Speech bubble */}
        <div className="absolute -top-16 -left-20 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg min-w-[150px] animate-bounce-soft">
          <p className="text-sm text-gray-800 font-medium">
            Keep watching to earn more coins! 🚀
          </p>
          <div className="absolute bottom-0 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95 transform translate-y-full"></div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          ×
        </button>
      </div>
    </div>
  );
};
