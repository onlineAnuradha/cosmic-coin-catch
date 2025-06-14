import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Gift, Coins, Copy, Share2, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Referral = () => {
  const { toast } = useToast();
  const [referralCode] = useState('COIN-CATCH-UNI123');
  const referralLink = `https://coincatch.app/ref/${referralCode}`;
  
  const referralStats = {
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarned: 0,
    pendingRewards: 0,
  };

  const recentReferrals = [
    // Empty for now since user has no referrals
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! 📋",
      description: "Referral link copied to clipboard",
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join CoinCatch and Earn Free Crypto!',
        text: `Use my referral code ${referralCode} to get started with 100 bonus coins!`,
        url: referralLink,
      });
    } else {
      copyToClipboard(referralLink);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Referral System</h1>
        <p className="text-gray-300">Invite friends and earn 100 coins per referral!</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Users className="text-cyan-400 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">{referralStats.totalReferrals}</p>
            <p className="text-xs text-gray-400">Total Referrals</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Coins className="text-green-400 mx-auto mb-2" size={32} />
            <p className="text-2xl font-bold text-white">{referralStats.totalEarned}</p>
            <p className="text-xs text-gray-400">Coins Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="glass-card glow-effect">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Share2 className="text-pink-400" />
            <span>Your Referral Link</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black/30 rounded-lg p-3 border border-white/20">
            <p className="text-cyan-400 text-sm font-mono break-all">
              {referralLink}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={() => copyToClipboard(referralLink)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
            >
              <Copy size={16} className="mr-2" />
              Copy Link
            </Button>
            <Button
              onClick={shareLink}
              variant="outline"
              className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Code */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Gift className="text-yellow-400" />
            <span>Your Referral Code</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/50">
            <p className="text-center text-yellow-400 text-xl font-bold font-mono">
              {referralCode}
            </p>
          </div>
          <Button
            onClick={() => copyToClipboard(referralCode)}
            variant="outline"
            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            <Copy size={16} className="mr-2" />
            Copy Code
          </Button>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Gift className="text-pink-400" />
            <span>How It Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <p className="text-white font-medium">Share your link</p>
                <p className="text-sm text-gray-400">Send your referral link to friends</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <p className="text-white font-medium">They join & earn</p>
                <p className="text-sm text-gray-400">Friends get 100 bonus coins when they sign up</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <p className="text-white font-medium">You earn too!</p>
                <p className="text-sm text-gray-400">Get 100 coins for every successful referral</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Tiers */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Trophy className="text-yellow-400" />
            <span>Referral Bonuses</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { referrals: 5, bonus: 500, unlocked: false },
            { referrals: 10, bonus: 1200, unlocked: false },
            { referrals: 25, bonus: 3000, unlocked: false },
            { referrals: 50, bonus: 7500, unlocked: false },
          ].map((tier, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge 
                  className={`${tier.unlocked ? 'bg-green-500' : 'bg-gray-600'} text-white`}
                >
                  {tier.referrals} refs
                </Badge>
                <span className="text-white">Milestone Bonus</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Coins size={16} />
                <span className="font-bold">+{tier.bonus}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Get Started */}
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-white mb-2">Start Inviting Friends!</h3>
          <p className="text-gray-300 text-sm mb-4">
            Share your referral link and start earning coins for every friend who joins!
          </p>
          <Button 
            onClick={shareLink}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl glow-effect"
          >
            Share Now & Earn! 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referral;
