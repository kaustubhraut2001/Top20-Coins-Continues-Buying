'use client'

import React, { useEffect, useState } from 'react'

interface CoinData {
	symbol: string
	lastPrice: number
	priceChangePercent: number
	volume: number
	sellVolume: number
	sellVolumePercent: number
}

async function checkThreeBullishAndRed(symbol: string): Promise<boolean> {
	try {
		const res = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=1d&limit=4`)
		const data = await res.json()
		if (!data || data.length < 4) return false

		// Check first 3 days for bullish Marubozu
		for (let i = 0;i < 3;i++) {
			const [open, high, low, close] = data[i].slice(1, 5).map(Number)
			const isBullishMarubozu =
				close > open &&
				(high - close) / close < 0.001 &&
				(open - low) / open < 0.001

			if (!isBullishMarubozu) return false
		}

		// Check 4th day (current) is red candle
		const [currentOpen, , , currentClose] = data[3].slice(1, 5).map(Number)
		return currentClose < currentOpen
	} catch (err) {
		console.error(`Error checking pattern for ${symbol}`, err)
		return false
	}
}

async function fetchPatternCoins(): Promise<CoinData[]> {
	const res = await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")
	const data = await res.json()

	const usdtCoins = data.filter((coin: any) => coin.symbol.endsWith("USDT"))

	const patternMatches = await Promise.all(
		usdtCoins.map(async (coin: any) => ({
			symbol: coin.symbol,
			matches: await checkThreeBullishAndRed(coin.symbol)
		}))
	)

	const matchedSymbols = new Set(
		patternMatches.filter(p => p.matches).map(p => p.symbol)
	)

	return usdtCoins
		.filter((coin: any) => matchedSymbols.has(coin.symbol))
		.map((coin: any) => {
			const volume = parseFloat(coin.quoteVolume)
			const priceChangePercent = parseFloat(coin.priceChangePercent)
			const sellVolume = (volume * (1 - priceChangePercent / 100)) / 2

			return {
				symbol: coin.symbol,
				lastPrice: parseFloat(coin.lastPrice),
				priceChangePercent,
				volume,
				sellVolume,
				sellVolumePercent: ((1 - priceChangePercent / 100) / 2) * 100,
			}
		})
		.sort((a, b) => b.sellVolumePercent - a.sellVolumePercent)
		.slice(0, 20)
}

const MarubuzuPattern: React.FC = () => {
	const [coins, setCoins] = useState<CoinData[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPatternCoins()
			setCoins(data)
			setLoading(false)
		}

		fetchData()
		const interval = setInterval(fetchData, 60000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Top 20 3-Bullish-Marubozu + Red Candle Pattern</h1>
			{loading ? (
				<p>Loading...</p>
			) : coins.length === 0 ? (
				<p>No matching coins found.</p>
			) : (
				<table className="w-full table-auto border-collapse border border-gray-300">
					{/* Table body remains same as before */}
				</table>
			)}
		</div>
	)
}

export default MarubuzuPattern