import CryptoScanner from "./scrneer/page"
import MarubuzuPattern from "./marubuzu/page"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CryptoScanner />
      {/* <MarubuzuPattern /> */}
    </main>
  )
}

