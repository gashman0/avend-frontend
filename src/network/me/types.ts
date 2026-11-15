export interface MeResponse{
    name: string,
    email: string,
    phone: string,
    username: string,
    country: string,
}

export interface DashboardInvestment {
  _id: string;
  plan: string;
  asset: string;
  amount: number;
  roiRate: number;
  roiEarned: number;
  durationDays: number;
  status: string;
  startDate: string;
  maturityDate: string;
}

export interface DashboardTransaction {
  _id: string;
  type: string;
  asset: string;
  amount: number;
  amountUSD: number;
  status: string;
  createdAt: string;
}

export interface DashboardSummaryResponse {
  _id: string;
  user: string;

  totalPortfolioValue: number;
  availableBalance: number;
  totalInvested: number;
  roiEarned: number;

  activeInvestmentCount: number;
  activeInvestments: DashboardInvestment[];
  recentTransactions: DashboardTransaction[];

  createdAt: string;
  updatedAt: string;
}


export interface WalletAssetBalance {
  balance: number;
  valueUSD: number;
  priceUSD: number;
}

export interface WalletAssets {
  BTC: WalletAssetBalance;
  ETH: WalletAssetBalance;
  USDT: WalletAssetBalance;
  BNB: WalletAssetBalance;
  SOL: WalletAssetBalance;
}

export interface WalletResponse {
  _id: string;
  user: string;
  assets: WalletAssets;
  totalBalanceUSD: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletDeposit {
  _id: string;
  transactionId: string;
  asset: string;
  amount: number;
  amountUSD: number;
  status: string;
  createdAt: string;
}

export interface GetWalletResponse {
  wallet: WalletResponse;
  recentDeposits: WalletDeposit[];
}