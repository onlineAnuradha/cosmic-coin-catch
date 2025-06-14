import { useState, useEffect } from 'react';
import { Coins, Gift, Rocket, Wallet, Zap, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(120);
  const [displayCoins, setDisplayCoins] = useState(120);
  const [watchedToday, setWatchedToday] = useState(8);
  const [dailyGoal] = useState(15);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [tapCooldown, setTapCooldown] = useState(0);
  const [coinAnimation, setCoinAnimation] = useState(false);
  const [mascotCelebrate, setMascotCelebrate] = useState(false);
  const [dailyCoinsEarned, setDailyCoinsEarned] = useState(45);
  const [dailyCoinTarget] = useState(100);
  const [floatingCoins, setFloatingCoins] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  useEffect(() => {
    if (tapCooldown > 0) {
      const timer = setTimeout(() => setTapCooldown(tapCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tapCooldown]);

  // Animate balance number increase
  useEffect(() => {
    if (displayCoins < coins) {
      const timer = setTimeout(() => {
        setDisplayCoins(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayCoins, coins]);

  const handleTapToEarn = () => {
    console.log('Tap button clicked!');
    console.log('Cooldown status:', tapCooldown);
    
    if (tapCooldown > 0) {
      console.log('Tap blocked by cooldown');
      return;
    }
    
    console.log('Processing tap...');
    
    // Add 1 coin
    setCoins(prev => {
      console.log('Updating coins from', prev, 'to', prev + 1);
      return prev + 1;
    });
    setDailyCoinsEarned(prev => Math.min(prev + 1, dailyCoinTarget));
    setTapCooldown(5); // 5 second cooldown
    
    // Trigger animations
    setCoinAnimation(true);
    setMascotCelebrate(true);
    
    // Add floating +1 animation
    const newFloatingCoin = {
      id: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 50 + 25
    };
    setFloatingCoins(prev => [...prev, newFloatingCoin]);
    
    // Reset animations
    setTimeout(() => setCoinAnimation(false), 1000);
    setTimeout(() => setMascotCelebrate(false), 2000);
    setTimeout(() => {
      setFloatingCoins(prev => prev.filter(coin => coin.id !== newFloatingCoin.id));
    }, 2000);
  };

  const handleWatchAd = () => {
    // Add 10 coins from ad
    setCoins(prev => prev + 10);
    setDailyCoinsEarned(prev => Math.min(prev + 10, dailyCoinTarget));
    setWatchedToday(prev => prev + 1);
    navigate('/watch');
  };

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  const progressPercentage = (watchedToday / dailyGoal) * 100;
  const dailyProgressPercentage = (dailyCoinsEarned / dailyCoinTarget) * 100;
  const canTap = tapCooldown === 0;

  return (
    <div className="space-y-6 animate-slide-up relative overflow-hidden min-h-screen">
      {/* Floating +1 Coins */}
      {floatingCoins.map((coin) => (
        <div
          key={coin.id}
          className="fixed pointer-events-none z-50 animate-bounce text-2xl font-bold text-yellow-400"
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
      {coinAnimation && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 animate-ping"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80px)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            >
              <Coins className="text-yellow-400 w-6 h-6" />
            </div>
          ))}
        </div>
      )}

      {/* Header with Live Balance */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">
          Good {timeOfDay}! 🌟
        </h1>
        <div className="glass-card p-4 max-w-sm mx-auto">
          <p className="text-gray-400 text-sm mb-1">Your Balance</p>
          <div className="flex items-center justify-center space-x-2">
            <Coins className="text-yellow-400 animate-pulse-glow" size={28} />
            <span className="text-3xl font-bold text-white">
              {displayCoins.toLocaleString()}
            </span>
            <span className="text-lg text-gray-300">Coins</span>
          </div>
          <p className="text-green-400 text-xs mt-1">≈ ${(displayCoins * 0.01).toFixed(2)} USD</p>
        </div>
      </div>

      {/* Main Tap to Earn Section */}
      <Card className="glass-card relative overflow-hidden glow-effect">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold gradient-text flex items-center justify-center gap-2">
              <Zap className="text-yellow-400 animate-pulse" size={24} />
              Tap to Earn Coins
            </h2>
            
            <div className="relative">
              <button
                onClick={handleTapToEarn}
                disabled={!canTap}
                className={`w-40 h-40 rounded-full text-xl font-bold transition-all duration-300 ${
                  canTap 
                    ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 shadow-[0_0_50px_rgba(251,191,36,0.7)] animate-pulse-glow scale-100 hover:scale-105' 
                    : 'bg-gray-600 cursor-not-allowed opacity-60'
                } ${coinAnimation ? 'animate-bounce scale-110' : ''}`}
              >
                {canTap ? (
                  <div className="flex flex-col items-center">
                    <Coins size={36} className="mb-2" />
                    <span className="text-lg font-black">TAP!</span>
                    <span className="text-sm opacity-90">+1 Coin</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl mb-2">⏰</span>
                    <span className="text-sm">{formatTime(tapCooldown)}</span>
                  </div>
                )}
              </button>
              
              {/* Pulsating rings for active button */}
              {canTap && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping opacity-30"></div>
                  <div className="absolute inset-2 rounded-full border-2 border-orange-400 animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
                </>
              )}
            </div>

            <p className="text-gray-300 text-sm max-w-xs mx-auto">
              {canTap 
                ? "Tap the button to earn 1 coin instantly! ⚡" 
                : `Wait ${formatTime(tapCooldown)} before next tap`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Daily Progress Tracker */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-white text-lg">
            <Gift className="text-pink-400" size={20} />
            <span>Daily Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Coins Earned Today</span>
            <span className="text-cyan-400 font-medium">{dailyCoinsEarned}/{dailyCoinTarget}</span>
          </div>
          <Progress value={dailyProgressPercentage} className="h-3" />
          <p className="text-xs text-gray-400">
            {dailyCoinTarget - dailyCoinsEarned} more coins to reach today's target! 🎯
          </p>
        </CardContent>
      </Card>

      {/* Ad Boost Button */}
      <Card className="glass-card hover:glow-effect transition-all cursor-pointer" onClick={handleWatchAd}>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Play className="text-purple-400 animate-bounce-soft" size={24} />
            <div>
              <h3 className="font-semibold text-white text-lg">Watch Ad to Earn +10 Coins</h3>
              <p className="text-sm text-gray-400">Quick boost available!</p>
            </div>
            <div className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
              BOOST!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ad Watching Progress */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-white text-lg">
            <Play className="text-purple-400" size={20} />
            <span>Ad Watching Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Watched Today</span>
            <span className="text-cyan-400 font-medium">{watchedToday}/{dailyGoal} ads</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-400">
            {dailyGoal - watchedToday} more ads for bonus rewards! 📺
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card hover:glow-effect transition-all cursor-pointer" onClick={() => navigate('/leaderboard')}>
          <CardContent className="p-4 text-center">
            <Rocket className="text-cyan-400 mx-auto mb-2 animate-bounce-soft" size={28} />
            <h3 className="font-semibold text-white text-sm">Leaderboard</h3>
            <p className="text-xs text-gray-400">See top earners</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:glow-effect transition-all cursor-pointer" onClick={() => navigate('/wallet')}>
          <CardContent className="p-4 text-center">
            <Wallet className="text-green-400 mx-auto mb-2" size={28} />
            <h3 className="font-semibold text-white text-sm">Wallet</h3>
            <p className="text-xs text-gray-400">Withdraw coins</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { action: 'Tap to earn', coins: 1, time: 'Just now' },
            { action: 'Watched crypto ad', coins: 10, time: '2 mins ago' },
            { action: 'Daily bonus', coins: 5, time: '1 hour ago' },
            { action: 'Tap to earn', coins: 1, time: '3 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
              <div>
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Coins className="text-yellow-400" size={14} />
                <span className="text-green-400 font-medium">+{activity.coins}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Celebrating Mascot */}
      {mascotCelebrate && (
        <div className="fixed bottom-32 right-4 z-40 animate-bounce">
          <div className="glass-card p-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
            <Rocket className="text-white w-8 h-8 animate-spin" />
          </div>
          <div className="absolute -top-16 -left-20 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg min-w-[120px]">
            <p className="text-sm text-gray-800 font-medium text-center">
              Nice tap! 🎉<br/>
              <span className="text-yellow-600">+1 Coin!</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
