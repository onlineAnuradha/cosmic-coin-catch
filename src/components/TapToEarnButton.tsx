
import { useState, useCallback } from 'react';
import { Coins } from 'lucide-react';

interface TapToEarnButtonProps {
  onTap: () => void;
}

export const TapToEarnButton = ({ onTap }: TapToEarnButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showCoinBurst, setShowCoinBurst] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleTap = useCallback(() => {
    // Button press animation
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);

    // Coin burst effect
    setShowCoinBurst(true);
    setTimeout(() => setShowCoinBurst(false), 1000);

    // Add floating +1 animation
    const newFloatingCoin = {
      id: Date.now(),
      x: Math.random() * 60 + 20, // Random position between 20% and 80%
      y: 40
    };
    setFloatingCoins(prev => [...prev, newFloatingCoin]);

    // Remove floating coin after animation
    setTimeout(() => {
      setFloatingCoins(prev => prev.filter(coin => coin.id !== newFloatingCoin.id));
    }, 2000);

    onTap();
  }, [onTap]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Floating +1 Coins */}
      {floatingCoins.map((coin) => (
        <div
          key={coin.id}
          className="absolute pointer-events-none z-50 animate-bounce text-3xl font-bold text-yellow-400"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            animation: 'floatUp 2s ease-out forwards'
          }}
        >
          +1 🪙
        </div>
      ))}

      {/* Coin Burst Effect */}
      {showCoinBurst && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 animate-ping"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            >
              <Coins className="text-yellow-400 w-6 h-6" />
            </div>
          ))}
        </div>
      )}

      {/* Sound Wave Ripples */}
      {isPressed && (
        <>
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping opacity-40"></div>
          <div className="absolute inset-2 rounded-full border-2 border-purple-400 animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute inset-4 rounded-full border-2 border-blue-400 animate-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
        </>
      )}

      {/* Main Tap Button */}
      <button
        onClick={handleTap}
        className={`
          relative w-48 h-48 rounded-full text-xl font-bold transition-all duration-300 overflow-hidden
          bg-gradient-to-br from-cyan-400 via-blue-500 via-purple-600 to-pink-500 
          hover:from-cyan-500 hover:via-blue-600 hover:via-purple-700 hover:to-pink-600
          shadow-[0_0_60px_rgba(6,182,212,0.8)] 
          hover:shadow-[0_0_80px_rgba(6,182,212,1)]
          animate-pulse-glow scale-100 hover:scale-105 active:scale-95
          ${isPressed ? 'animate-bounce scale-110' : ''}
        `}
      >
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
        
        {/* Button content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <Coins size={48} className="mb-3 drop-shadow-lg" />
          <span className="text-2xl font-black drop-shadow-lg">TAP!</span>
          <span className="text-lg opacity-90 drop-shadow-md">to Earn</span>
          <span className="text-sm opacity-80 mt-1">+1 Coin</span>
        </div>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-full animate-spin-slow opacity-50">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
        </div>
      </button>

      {/* Button description */}
      <p className="text-center text-gray-300 text-sm mt-4 max-w-xs">
        Tap the glowing button to earn coins instantly! ⚡ No limits!
      </p>
    </div>
  );
};
