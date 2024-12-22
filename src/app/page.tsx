'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import ChatBox from '../components/common/Chatbox';

export default function Home() {
	return (
		<div className='w-full'>
			<WalletMultiButton />
			<ChatBox />
		</div>
	);
}
