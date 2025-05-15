// app/components/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
	const pathname = usePathname()

	const isActive = (path: string) =>
		pathname === path ? 'text-blue-700 font-bold' : 'text-blue-500 hover:text-blue-700'

	return (
		<nav className="flex gap-6 items-center p-4 shadow-md bg-white">
			<Link href="/scrneer" className={isActive('/')}>
				Scanner
			</Link>
			<Link href="/marubuzu" className={isActive('/marubuzu')}>
				Marubuzu Pattern
			</Link>
		</nav>
	)
}
