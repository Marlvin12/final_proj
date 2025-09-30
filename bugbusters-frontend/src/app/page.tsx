import Link from 'next/link'
import React from 'react'

export default function HomePage() {
	return (
		<main style={{ padding: 24, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
			<h1>Bug Busters</h1>
			<p>Welcome — go to the dashboard to begin.</p>
			<Link href="/dashboard" style={{ color: '#0ea5e9', fontWeight: 600 }}>
				Open Dashboard
			</Link>
		</main>
	)
}
