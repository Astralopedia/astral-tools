import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import Providers from "@/components/Providers"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
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
					<Footer />
					<Toaster position='top-right' richColors theme='dark' />
				</Providers>
			</body>
		</html>
	)
}
