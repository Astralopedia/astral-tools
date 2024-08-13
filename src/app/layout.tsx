import NavBar from "@/components/NavBar"
import Providers from "@/components/providers"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Astral Tools",
	description: "Utilities for Create Astral players",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<NavBar />
					{children}
				</Providers>
			</body>
		</html>
	)
}
