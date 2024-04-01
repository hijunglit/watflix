export interface ICoins {
    id: string,
    is_active: boolean,
    is_new: boolean,
    name: string,
    rank: number,
    symbol: string,
    type: string,
}
export interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
export interface PriceData {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  total_supply:number;
  max_supply:number;
  beta_value:number;
  first_data_at:string;
  last_updated:string;
  quotes:{
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}
const BASE_URL = "https://api.coinpaprika.com/v1"

export async function fetchCoins() {
    const coins: ICoins[] = await fetch(
        `${BASE_URL}/coins`
        ).then((response) => response.json());
        return coins.slice(0, 20);
}
export async function fetchCoinInfo(coinId: string) {
    const infoData: InfoData[] = await fetch(
        `${BASE_URL}/coins/${coinId}`
        ).then((response) => response.json());
        return infoData;
}
export async function fetchCoinPrice(coinId:string) {
    const priceData: PriceData[] = await fetch(
        `${BASE_URL}/tickers/${coinId}`
    ).then((response) => response.json());
    return priceData;
}
