"use client"

import { useCryptoScanner } from "../utils/cryptoScanner"
// import { Card, CardContent, CardHeader, CardTitle } from "../components/CryptoScanner"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CryptoScanner() {
	const coins = useCryptoScanner()

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Top 20 Coins with Continuous Buying (24-hour)</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Rank</TableHead>
							<TableHead>Symbol</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>24h Change</TableHead>
							<TableHead>Volume (USDT)</TableHead>
							<TableHead>Buy Volume %</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{coins.map((coin, index) => (
							<TableRow key={coin.symbol}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{coin.symbol}</TableCell>
								<TableCell>${coin.lastPrice.toFixed(4)}</TableCell>
								<TableCell className="text-green-600">+{coin.priceChangePercent.toFixed(2)}%</TableCell>
								<TableCell>{coin.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
								<TableCell>{coin.buyVolumePercent.toFixed(2)}%</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

