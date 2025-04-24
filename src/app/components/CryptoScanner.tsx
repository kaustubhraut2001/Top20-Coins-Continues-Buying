"use client"

import { useCryptoScanner } from "../utils/cryptoScanner"

export default function CryptoScanner() {
	const coins = useCryptoScanner();

	const openTradingViewChart = (symbol: string) => {
		const binanceSymbol = symbol.replace("USDT", "USDT");
		const tradingViewUrlBinance = `https://www.tradingview.com/chart/?symbol=BINANCE:${binanceSymbol}`;
		const tradingViewUrlFallback = `https://www.tradingview.com/chart/?symbol=POLONIEX:${binanceSymbol}`; // Fallback URL for Poloniex

		const binanceWindow = window.open(tradingViewUrlBinance, "_blank");

		setTimeout(() => {
			if (!binanceWindow || binanceWindow.closed) {
				window.open(tradingViewUrlFallback, "_blank");
			}
		}, 2000);
	};

	return (
		<div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-xl p-6">
			<div className="mb-4">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white">
					Top 20 Coins with Continuous Buying (24-hour)
				</h2>
			</div>
			<div className="overflow-x-auto">






				<thead className="bg-gray-100 dark:bg-gray-800">
					<tr>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Symbol</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">24h Change</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Volume (USDT)</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Buy Volume %</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Chart</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{coins.map((coin, index) => (
						<tr key={coin.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800">
							<td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{index + 1}</td>
							<td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{coin.symbol}</td>
							<td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">${coin.lastPrice.toFixed(4)}</td>
							<td className="px-4 py-2 text-sm text-green-600 dark:text-green-400">
								+{coin.priceChangePercent.toFixed(2)}%
							</td>
							<td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
								{coin.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
							</td>
							<td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
								{coin.buyVolumePercent.toFixed(2)}%
							</td>
							<td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
								<button
									onClick={() => openTradingViewChart(coin.symbol)}
									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
								>
									Open Chart
								</button>
							</td>
						</tr>
					))}
				</tbody>

			</div>
		</div>
	)
}
