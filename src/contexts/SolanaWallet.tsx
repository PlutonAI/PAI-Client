'use client';

import {
	WalletAdapterNetwork,
	type Adapter,
} from '@solana/wallet-adapter-base';
import {
	ConnectionProvider,
	type WalletContextState,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalContext } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import {
	PhantomWalletAdapter,
	TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
	useState,
} from 'react';

import { SolanaWalletModal } from '@/components/common/SolanaWalletModal';
import { clusterApiUrl } from '@solana/web3.js';

const SolanaWalletContext = createContext<WalletContextState | null>(null);

const WalletModalProvider = ({ children }: PropsWithChildren) => {
	const [visible, setVisible] = useState(false);

	return (
		<WalletModalContext.Provider
			value={{
				visible,
				setVisible,
			}}
		>
			{children}
			<SolanaWalletModal open={visible} />
		</WalletModalContext.Provider>
	);
};

export default function SolanaWalletProvider({ children }: PropsWithChildren) {
	const network = WalletAdapterNetwork.Mainnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const wallets = useMemo<Adapter[]>(
		() => [new PhantomWalletAdapter(), new TrustWalletAdapter()],
		[],
	);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider
				wallets={wallets}
				autoConnect
			>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export const useSolanaWallet = () => useContext(SolanaWalletContext);
