
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Coins, Users, Search, Crown, Flame, Rocket } from 'lucide-react';

// Generate random Telegram usernames
const generateUsername = () => {
  const prefixes = ['crypto', 'airdrop', 'defi', 'nft', 'hodl', 'moon', 'diamond', 'rocket', 'bull', 'whale', 'ape', 'degen', 'gem', 'alpha', 'beta', 'sigma', 'chad', 'based', 'pump', 'yield'];
  const suffixes = ['legend', 'hunter', 'master', 'pro', 'king', 'queen', 'lord', 'god', 'ninja', 'warrior', 'wizard', 'genius', 'expert', 'trader', 'investor', 'millionaire', 'billionaire', 'monk', 'sage', 'oracle'];
  const numbers = ['69', '420', '100', '1000', '2024', '99', '77', '888', '777', '666', '123', '007', '911', '404', '500'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const number = Math.random() > 0.7 ? numbers[Math.floor(Math.random() * numbers.length)] : '';
  const separator = Math.random() > 0.5 ? '_' : '';
  
  return `@${prefix}${separator}${suffix}${number}`;
};

// Generate random coin balance with realistic distribution
const generateCoinBalance = (rank: number) => {
  if (rank === 1) return Math.floor(Math.random() * 50000) + 100000; // 100k-150k for #1
  if (rank <= 10) return Math.floor(Math.random() * 30000) + 50000; // 50k-80k for top 10
  if (rank <= 50) return Math.floor(Math.random() * 20000) + 20000; // 20k-40k for top 50
  if (rank <= 200) return Math.floor(Math.random() * 15000) + 5000; // 5k-20k for top 200
  if (rank <= 500) return Math.floor(Math.random() * 5000) + 1000; // 1k-6k for top 500
  return Math.floor(Math.random() * 1000) + 100; // 100-1100 for the rest
};

// Generate the full leaderboard data
const generateLeaderboardData = () => {
  return Array.from({ length: 1000 }, (_, index) => {
    const rank = index + 1;
    return {
      rank,
      username: generateUsername(),
      coins: generateCoinBalance(rank),
      avatar: rank <= 3 ? (rank === 1 ? '👑' : rank === 2 ? '🥈' : '🥉') : 
              rank <= 10 ? '🔥' : 
              rank <= 50 ? '🚀' : '💎'
    };
  });
};

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generate leaderboard data once
  const leaderboardData = useMemo(() => generateLeaderboardData(), []);
  
  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return leaderboardData;
    return leaderboardData.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leaderboardData, searchTerm]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-amber-600';
      default: return rank <= 10 ? 'text-purple-400' : 'text-gray-400';
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-amber-600 to-yellow-600';
      default: return rank <= 10 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600';
    }
  };

  const getRowBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-gray-400/50';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-500/50';
    if (rank <= 10) return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30';
    return 'hover:bg-white/5';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-400" size={16} />;
    if (rank <= 3) return <Trophy className={getRankColor(rank)} size={16} />;
    if (rank <= 10) return <Flame className="text-purple-400" size={16} />;
    if (rank <= 50) return <Rocket className="text-cyan-400" size={16} />;
    return null;
  };

  // Find current user position (simulated)
  const currentUserRank = 247;
  const currentUserCoins = 1247;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Global Leaderboard</h1>
        <p className="text-gray-300">1,000 top earners from the CoinCatch community</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-white">#{currentUserRank}</p>
            <p className="text-xs text-gray-400">Your Rank</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Coins className="text-green-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-white">{currentUserCoins.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Your Coins</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Users className="text-cyan-400 mx-auto mb-2" size={24} />
            <p className="text-lg font-bold text-white">1,000</p>
            <p className="text-xs text-gray-400">Total Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <Card className="glass-card glow-effect">
        <CardHeader>
          <CardTitle className="text-white text-center">🏆 Top 3 Champions 🏆</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end space-x-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-14 h-18 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-lg font-bold">2</span>
              </div>
              <div className="text-2xl mb-1">{leaderboardData[1]?.avatar}</div>
              <p className="text-xs font-semibold text-white truncate w-20">{leaderboardData[1]?.username}</p>
              <p className="text-xs text-gray-300">{leaderboardData[1]?.coins.toLocaleString()}</p>
            </div>
            
            {/* 1st Place */}
            <div className="text-center">
              <div className="w-16 h-22 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="text-3xl mb-1">{leaderboardData[0]?.avatar}</div>
              <p className="text-sm font-semibold text-white truncate w-24">{leaderboardData[0]?.username}</p>
              <p className="text-xs text-gray-300">{leaderboardData[0]?.coins.toLocaleString()}</p>
            </div>
            
            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-14 h-16 bg-gradient-to-t from-amber-600 to-yellow-600 rounded-t-lg flex items-center justify-center mb-2">
                <span className="text-lg font-bold">3</span>
              </div>
              <div className="text-2xl mb-1">{leaderboardData[2]?.avatar}</div>
              <p className="text-xs font-semibold text-white truncate w-20">{leaderboardData[2]?.username}</p>
              <p className="text-xs text-gray-300">{leaderboardData[2]?.coins.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-400" />
              <span>Full Rankings</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {filteredData.length} users
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-4">
              {filteredData.map((user) => (
                <div 
                  key={`${user.rank}-${user.username}`}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${getRowBg(user.rank)}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBg(user.rank)}`}>
                    {user.rank}
                  </div>
                  
                  <div className="text-xl">{user.avatar}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-white text-sm truncate">{user.username}</p>
                      {user.rank <= 10 && (
                        <Badge className="bg-purple-500 text-white text-xs">TOP 10</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Coins size={12} className="text-yellow-400" />
                      <span>{user.coins.toLocaleString()} coins</span>
                      <span className="text-gray-500">•</span>
                      <span>${(user.coins / 1000).toFixed(2)} USD</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getRankIcon(user.rank)}
                    <span className={`text-xs font-semibold ${getRankColor(user.rank)}`}>
                      #{user.rank}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
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
            Climb to the top 100 this week and win 10,000 bonus coins!
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Ends in 4 days</span>
            <Badge className="bg-pink-500 text-white">
              10,000 coins
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
