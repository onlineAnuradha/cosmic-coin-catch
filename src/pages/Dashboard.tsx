
import { useState, useEffect } from 'react';
import { Coins, Gift, Rocket, Wallet, Zap, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(1247);
  const [watchedToday, setWatchedToday] = useState(8);
  const [dailyGoal] = useState(15);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [tapCooldown, setTapCooldown] = useState(0);
  const [coinBurst, setCoinBurst] = useState(false);
  const [mascotCelebrate, setMascotCelebrate] = useState(false);
  const [dailyTapProgress, setDailyTapProgress] = useState(40);
  const [maxDailyTaps] = useState(100);

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

  const handleTapToEarn = () => {
    if (tapCooldown > 0 || dailyTapProgress >= maxDailyTaps) return;
    
    const earnedCoins = Math.floor(Math.random() * 15) + 5; // 5-20 coins
    setCoins(prev => prev + earnedCoins);
    setDailyTapProgress(prev => Math.min(prev + 1, maxDailyTaps));
    setTapCooldown(180); // 3 minutes cooldown
    
    // Trigger animations
    setCoinBurst(true);
    setMascotCelebrate(true);
    
    // Reset animations
    setTimeout(() => setCoinBurst(false), 2000);
    setTimeout(() => setMascotCelebrate(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (watchedToday / dailyGoal) * 100;
  const tapProgressPercentage = (dailyTapProgress / maxDailyTaps) * 100;
  const canTap = tapCooldown === 0 && dailyTapProgress < maxDailyTaps;

  return (
    <div className="space-y-6 animate-slide-up relative overflow-hidden">
      {/* Coin Burst Effect */}
      {coinBurst && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 animate-ping"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
            >
              <Coins className="text-yellow-400 w-8 h-8" />
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-yellow-400 animate-bounce">
            +{Math.floor(Math.random() * 15) + 5} 🪙
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">
          Good {timeOfDay}! 🌟
        </h1>
        <p className="text-gray-300">Ready to earn some crypto today?</p>
      </div>

      {/* Coin Balance Card */}
      <Card className="glass-card glow-effect">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Your Balance</p>
              <div className="flex items-center space-x-2">
                <Coins className="text-yellow-400 animate-pulse-glow" size={32} />
                <span className="text-4xl font-bold text-white">{coins.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-400 text-sm">≈ ${(coins * 0.01).toFixed(2)}</p>
              <p className="text-gray-400 text-xs">USD Value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tap to Earn Section - Central Interactive Button */}
      <Card className="glass-card relative overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold gradient-text flex items-center justify-center gap-2">
              <Zap className="text-yellow-400" size={24} />
              Tap to Earn Coins
            </h2>
            
            <div className="relative">
              <Button
                onClick={handleTapToEarn}
                disabled={!canTap}
                className={`w-32 h-32 rounded-full text-xl font-bold transition-all duration-300 ${
                  canTap 
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 shadow-[0_0_40px_rgba(251,191,36,0.6)] animate-pulse-glow' 
                    : 'bg-gray-600 cursor-not-allowed'
                } ${coinBurst ? 'scale-110' : 'hover:scale-105'}`}
              >
                {canTap ? (
                  <div className="flex flex-col items-center">
                    <Coins size={32} />
                    <span className="text-sm">TAP!</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-lg">⏰</span>
                    <span className="text-xs">{formatTime(tapCooldown)}</span>
                  </div>
                )}
              </Button>
              
              {/* Pulsating ring effect for active button */}
              {canTap && (
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping opacity-20"></div>
              )}
            </div>

            <p className="text-gray-300 text-sm">
              {canTap 
                ? "Tap to earn 5-20 coins instantly!" 
                : dailyTapProgress >= maxDailyTaps 
                  ? "Daily tap limit reached! Come back tomorrow." 
                  : `Next tap available in ${formatTime(tapCooldown)}`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Daily Tap Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Gift className="text-pink-400" size={20} />
            <span>Daily Tap Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Taps Today</span>
            <span className="text-cyan-400 font-medium">{dailyTapProgress}/{maxDailyTaps}</span>
          </div>
          <Progress value={tapProgressPercentage} className="h-3" />
          <p className="text-xs text-gray-400">
            {maxDailyTaps - dailyTapProgress} taps remaining today to maximize your earnings!
          </p>
        </CardContent>
      </Card>

      {/* Watch Ads Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Play className="text-purple-400" size={20} />
            <span>Ad Watching Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Watched Today</span>
            <span className="text-cyan-400 font-medium">{watchedToday}/{dailyGoal} ads</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-400">
            {dailyGoal - watchedToday} more ads to complete today's goal and earn bonus coins!
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card hover:glow-effect transition-all cursor-pointer" onClick={() => navigate('/watch')}>
          <CardContent className="p-4 text-center">
            <Rocket className="text-cyan-400 mx-auto mb-2 animate-bounce-soft" size={32} />
            <h3 className="font-semibold text-white">Watch Ad</h3>
            <p className="text-xs text-gray-400">Earn +10 coins instantly</p>
            <div className="mt-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
              Quick Boost!
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:glow-effect transition-all cursor-pointer" onClick={() => navigate('/wallet')}>
          <CardContent className="p-4 text-center">
            <Wallet className="text-green-400 mx-auto mb-2" size={32} />
            <h3 className="font-semibold text-white">Wallet</h3>
            <p className="text-xs text-gray-400">Withdraw your coins</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { action: 'Tap to earn bonus', coins: 15, time: '1 min ago' },
            { action: 'Watched crypto ad', coins: 25, time: '2 mins ago' },
            { action: 'Referral bonus', coins: 100, time: '1 hour ago' },
            { action: 'Daily tap reward', coins: 12, time: '3 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
              <div>
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Coins className="text-yellow-400" size={16} />
                <span className="text-green-400 font-medium">+{activity.coins}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA Button */}
      <Button 
        onClick={() => navigate('/watch')}
        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl text-lg glow-effect"
      >
        Watch More Ads for Bonus Coins! 🚀
      </Button>

      {/* Celebrating Mascot Effect */}
      {mascotCelebrate && (
        <div className="fixed bottom-32 right-4 z-40 animate-bounce-soft">
          <div className="glass-card p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
            <Rocket className="text-white w-6 h-6 animate-spin" />
          </div>
          <div className="absolute -top-12 -left-16 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <p className="text-xs text-gray-800 font-medium">
              Great job! 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
