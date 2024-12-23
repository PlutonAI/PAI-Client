import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SolanaWalletProvider from '@/contexts/SolanaWallet';
import Header from '@/components/layout/Header';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'PlutonAI',
	description: 'Fully Data onchain AI',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen`}
				style={{
					backgroundImage: "url('/background.png')",
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'contain',
					backgroundColor: '#251e1b',
				}}
			>
				<SolanaWalletProvider>
					{children}
				</SolanaWalletProvider>
			</body>
		</html>
	);
}
