
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Wallet, Gift, ArrowUpRight, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCoinBalance } from '@/hooks/useCoinBalance';

const WalletPage = () => {
  const { toast } = useToast();
  const { balance: coinBalance } = useCoinBalance();
  const usdValue = coinBalance / 1000; // 1000 coins = $1
  const [minimumWithdraw] = useState(1000);

  const walletOptions = [
    { name: 'MetaMask', icon: '🦊', supported: true, fee: 0.1 },
    { name: 'Trust Wallet', icon: '🔷', supported: true, fee: 0.1 },
    { name: 'Coinbase Wallet', icon: '🔵', supported: true, fee: 0.15 },
    { name: 'Binance', icon: '🟡', supported: false, fee: 0.1 },
  ];

  const transactionHistory = [
    { type: 'Referral Bonus', amount: 100, date: '2024-01-15', status: 'completed', icon: '👥' },
    { type: 'Ad Reward', amount: 25, date: '2024-01-15', status: 'completed', icon: '📺' },
    { type: 'Daily Bonus', amount: 200, date: '2024-01-14', status: 'completed', icon: '🎁' },
  ];

  const handleWithdraw = (walletName: string) => {
    if (coinBalance < minimumWithdraw) {
      toast({
        title: "Minimum not met",
        description: `You need at least ${minimumWithdraw} coins to withdraw.`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Withdrawal Initiated! 🚀",
      description: `Withdrawing ${coinBalance} coins to ${walletName}`,
    });
  };

  const canWithdraw = coinBalance >= minimumWithdraw;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Your Wallet</h1>
        <p className="text-gray-300">Manage your coins and withdraw to your wallet</p>
      </div>

      {/* Balance Overview */}
      <Card className="glass-card glow-effect">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Coins className="text-white animate-pulse-glow" size={40} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">{coinBalance.toLocaleString()}</p>
              <p className="text-yellow-400 font-medium">CoinCatch Tokens</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">${usdValue.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">USD Value (≈ $0.001 per coin)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Status */}
      <Card className={`glass-card ${canWithdraw ? 'border-green-500/50' : 'border-red-500/50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                canWithdraw ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {canWithdraw ? '✅' : '⏳'}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {canWithdraw ? 'Ready to Withdraw!' : 'Almost There!'}
                </p>
                <p className="text-sm text-gray-400">
                  {canWithdraw 
                    ? 'You can withdraw your coins now'
                    : `Need ${minimumWithdraw - coinBalance} more coins to withdraw`
                  }
                </p>
              </div>
            </div>
            <Badge className={canWithdraw ? 'bg-green-500' : 'bg-red-500'}>
              Min: {minimumWithdraw}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Options */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Wallet className="text-cyan-400" />
            <span>Withdraw To</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {walletOptions.map((wallet, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{wallet.icon}</div>
                <div>
                  <p className="font-semibold text-white">{wallet.name}</p>
                  <p className="text-xs text-gray-400">
                    Fee: {wallet.fee}% • {wallet.supported ? 'Available' : 'Coming Soon'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleWithdraw(wallet.name)}
                disabled={!wallet.supported || !canWithdraw}
                size="sm"
                className={`${
                  wallet.supported && canWithdraw
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {wallet.supported ? (canWithdraw ? 'Withdraw' : 'Locked') : 'Soon'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <ArrowUpRight className="text-green-400" />
            <span>Conversion Rates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg">
            <span className="text-white">1 CoinCatch Token</span>
            <span className="text-green-400 font-bold">= $0.01 USD</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-white">100 Tokens</span>
            <span className="text-green-400">= $1.00 USD</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-white">1,000 Tokens</span>
            <span className="text-green-400">= $10.00 USD</span>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Clock className="text-gray-400" />
            <span>Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactionHistory.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{tx.icon}</div>
                <div>
                  <p className="font-semibold text-white">{tx.type}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-green-400">
                  <Coins size={16} />
                  <span className="font-bold">+{tx.amount}</span>
                </div>
                <Badge className="bg-green-500 text-white text-xs">
                  {tx.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Gift className="text-pink-400" />
            <span>Tips to Earn More</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm text-white">• Watch 15 ads daily for 200 bonus coins</p>
            <p className="text-sm text-white">• Refer friends to earn 100 coins per referral</p>
            <p className="text-sm text-white">• Complete weekly challenges for extra rewards</p>
            <p className="text-sm text-white">• Stay active to unlock milestone bonuses</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
