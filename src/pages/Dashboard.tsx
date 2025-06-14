import { useState, useEffect } from 'react';
import { Coins, Gift, Rocket, Wallet } from 'lucide-react';
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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const progressPercentage = (watchedToday / dailyGoal) * 100;

  return (
    <div className="space-y-6 animate-slide-up">
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
              <p className="text-green-400 text-sm">≈ $12.47</p>
              <p className="text-gray-400 text-xs">USD Value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Gift className="text-pink-400" size={20} />
            <span>Daily Progress</span>
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
            <h3 className="font-semibold text-white">Watch & Earn</h3>
            <p className="text-xs text-gray-400">Earn 10-50 coins per ad</p>
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
            { action: 'Watched crypto ad', coins: 25, time: '2 mins ago' },
            { action: 'Referral bonus', coins: 100, time: '1 hour ago' },
            { action: 'Watched gaming ad', coins: 15, time: '3 hours ago' },
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
        Start Watching Ads Now! 🚀
      </Button>
    </div>
  );
};

export default Dashboard;
