
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coin, Rocket, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WatchEarn = () => {
  const { toast } = useToast();
  const [isWatching, setIsWatching] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [currentAd, setCurrentAd] = useState<any>(null);

  const availableAds = [
    { id: 1, title: 'CryptoExchange Pro', reward: 25, duration: 30, category: 'Crypto', color: 'bg-yellow-500' },
    { id: 2, title: 'Gaming Platform', reward: 15, duration: 20, category: 'Gaming', color: 'bg-blue-500' },
    { id: 3, title: 'NFT Marketplace', reward: 35, duration: 45, category: 'NFT', color: 'bg-purple-500' },
    { id: 4, title: 'DeFi Protocol', reward: 50, duration: 60, category: 'DeFi', color: 'bg-green-500' },
    { id: 5, title: 'Mobile Wallet', reward: 20, duration: 25, category: 'Wallet', color: 'bg-cyan-500' },
    { id: 6, title: 'Trading Bot', reward: 40, duration: 40, category: 'Trading', color: 'bg-red-500' },
  ];

  const watchAd = (ad: any) => {
    setCurrentAd(ad);
    setIsWatching(true);
    setWatchTime(0);
    
    const interval = setInterval(() => {
      setWatchTime(prev => {
        if (prev >= ad.duration) {
          clearInterval(interval);
          setIsWatching(false);
          toast({
            title: "Ad Completed! 🎉",
            description: `You earned ${ad.reward} coins!`,
          });
          setCurrentAd(null);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Watch & Earn</h1>
        <p className="text-gray-300">Choose an ad to watch and earn coins!</p>
      </div>

      {/* Currently Watching */}
      {isWatching && currentAd && (
        <Card className="glass-card glow-effect">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                <Rocket className="text-white animate-bounce-soft" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Watching: {currentAd.title}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-cyan-400">{watchTime}s / {currentAd.duration}s</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(watchTime / currentAd.duration) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <Coin size={20} />
                <span className="font-bold">Reward: {currentAd.reward} coins</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Ads */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
          <Gift className="text-pink-400" size={24} />
          <span>Available Ads</span>
        </h2>
        
        <div className="grid gap-4">
          {availableAds.map((ad) => (
            <Card key={ad.id} className="glass-card hover:glow-effect transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full ${ad.color} flex items-center justify-center`}>
                      <Rocket className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{ad.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {ad.category}
                        </Badge>
                        <span className="text-xs text-gray-400">{ad.duration}s</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                      <Coin size={16} />
                      <span className="font-bold">{ad.reward}</span>
                    </div>
                    <Button
                      onClick={() => watchAd(ad)}
                      disabled={isWatching}
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                    >
                      {isWatching ? 'Watching...' : 'Watch'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Bonus */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Gift className="text-pink-400" />
            <span>Daily Bonus</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-4">
            Watch 15 ads today to earn a 200 coin bonus!
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Progress: 8/15 ads</span>
            <Badge className="bg-yellow-500 text-black">
              +200 coins
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WatchEarn;
