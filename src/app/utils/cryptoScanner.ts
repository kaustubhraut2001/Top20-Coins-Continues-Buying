"use client";

import { useState, useEffect } from "react";

const BINANCE_API_BASE = "https://api.binance.com/api/v3";

interface CoinData {
  symbol: string;
  lastPrice: number;
  priceChangePercent: number;
  volume: number;
  buyVolume: number;
  buyVolumePercent: number;
}

async function fetch24hrData(): Promise<CoinData[]> {
  const response = await fetch(`${BINANCE_API_BASE}/ticker/24hr`);
  const data = await response.json();
  return data
    .filter((coin: any) => coin.symbol.endsWith("USDT"))
    .map((coin: any) => ({
      symbol: coin.symbol,
      lastPrice: Number.parseFloat(coin.lastPrice),
      priceChangePercent: Number.parseFloat(coin.priceChangePercent),
      volume: Number.parseFloat(coin.volume),
      buyVolume:
        (Number.parseFloat(coin.volume) *
          (1 + Number.parseFloat(coin.priceChangePercent) / 100)) /
        2,
      buyVolumePercent:
        ((1 + Number.parseFloat(coin.priceChangePercent) / 100) / 2) * 100,
    }))
    .filter(
      (coin: CoinData) =>
        coin.priceChangePercent > 0 && coin.buyVolumePercent > 55 // Assuming more than 55% of volume is buy volume
    )
    .sort(
      (a: CoinData, b: CoinData) => b.buyVolumePercent - a.buyVolumePercent
    );
}

export function useCryptoScanner() {
  const [coins, setCoins] = useState<CoinData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch24hrData();
      setCoins(data.slice(0, 20)); // Get top 20 coins
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return coins;
}
