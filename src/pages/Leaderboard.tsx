
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Coin, Users } from 'lucide-react';

const Leaderboard = () => {
  const topEarners = [
    { rank: 1, name: 'CryptoKing', coins: 125000, referrals: 45, avatar: '👑' },
    { rank: 2, name: 'AdWatcher', coins: 98500, referrals: 32, avatar: '🚀' },
    { rank: 3, name: 'CoinHunter', coins: 87200, referrals: 28, avatar: '💎' },
    { rank: 4, name: 'EarnMaster', coins: 76800, referrals: 25, avatar: '⭐' },
    { rank: 5, name: 'WatchPro', coins: 65400, referrals: 22, avatar: '🔥' },
    { rank: 6, name: 'You', coins: 1247, referrals: 0, avatar: '🦄' },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-amber-600';
      default: return 'text-gray-400';
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-amber-600 to-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Leaderboard</h1>
        <p className="text-gray-300">See who's earning the most coins!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">6th</p>
            <p className="text-xs text-gray-400">Your Rank</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Coin className="text-green-400 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">1,247</p>
            <p className="text-xs text-gray-400">Your Coins</p>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Podium */}
      <Card className="glass-card glow-effect">
        <CardHeader>
          <CardTitle className="text-white text-center">🏆 Top 3 Champions 🏆</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end space-x-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-16 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-2xl">2</span>
              </div>
              <div className="text-3xl mb-1">🚀</div>
              <p className="text-sm font-semibold text-white">AdWatcher</p>
              <p className="text-xs text-gray-300">98,500 coins</p>
            </div>
            
            {/* 1st Place */}
            <div className="text-center">
              <div className="w-16 h-24 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">1</span>
              </div>
              <div className="text-4xl mb-1">👑</div>
              <p className="text-sm font-semibold text-white">CryptoKing</p>
              <p className="text-xs text-gray-300">125,000 coins</p>
            </div>
            
            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-t from-amber-600 to-yellow-600 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-2xl">3</span>
              </div>
              <div className="text-3xl mb-1">💎</div>
              <p className="text-sm font-semibold text-white">CoinHunter</p>
              <p className="text-xs text-gray-300">87,200 coins</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Trophy className="text-yellow-400" />
            <span>Full Rankings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topEarners.map((user) => (
            <div 
              key={user.rank}
              className={`flex items-center space-x-4 p-3 rounded-xl transition-all ${
                user.name === 'You' ? 'bg-purple-500/20 border border-purple-500/50 glow-effect' : 'hover:bg-white/5'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBg(user.rank)}`}>
                {user.rank}
              </div>
              
              <div className="text-2xl">{user.avatar}</div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-white">{user.name}</p>
                  {user.name === 'You' && (
                    <Badge className="bg-purple-500 text-white text-xs">YOU</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Coin size={12} className="text-yellow-400" />
                    <span>{user.coins.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={12} className="text-cyan-400" />
                    <span>{user.referrals} referrals</span>
                  </div>
                </div>
              </div>
              
              <Trophy className={`${getRankColor(user.rank)} ${user.rank <= 3 ? 'animate-pulse-glow' : ''}`} size={20} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Trophy className="text-pink-400" />
            <span>Weekly Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-4">
            Be in the top 10 this week and win 5,000 bonus coins!
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Ends in 3 days</span>
            <Badge className="bg-pink-500 text-white">
              5,000 coins
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
