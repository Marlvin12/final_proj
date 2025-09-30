import Link from 'next/link'
import React from 'react'

export default function DashboardSingle() {
	return (
		<div style={{ padding: 24, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
			<header style={{ display: 'flex', alignItems: 'center' }}>
				<nav>
					<Link href="/quiz" style={buttonStyle}>Business readiness quiz</Link>
				</nav>
			</header>
		</div>
	)
}

const buttonStyle: React.CSSProperties = {
	display: 'inline-block',
	padding: '8px 12px',
	background: '#0ea5e9',
	color: 'white',
	borderRadius: 6,
	textDecoration: 'none',
	fontWeight: 600,
}
