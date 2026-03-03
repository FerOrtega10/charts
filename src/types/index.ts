export interface Asset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string | null;
  explorer: string;
  tokens: object | null;
}

export interface AssetHistory {
  time: number;
  marketCapUsd: string;
  date: string;
}