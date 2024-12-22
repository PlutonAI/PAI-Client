'use client';

import type * as ModalPrimitive from '@radix-ui/react-dialog';
import type { WalletName } from '@solana/wallet-adapter-base';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet, type Wallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';

import { Modal, ModalContent } from '@/components/ui/modal';

// import Logo from '../Logo';
import { WalletModalButton } from './WalletModalButton';
import { XIcon } from 'lucide-react';

export const SolanaWalletModal = ({
	open = false,
	...props
}: React.ComponentPropsWithoutRef<typeof ModalPrimitive.Root>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { wallets, select } = useWallet();
	const { setVisible } = useWalletModal();

	const [installedWallet, notInstalledWallet] = useMemo(() => {
		const installed: Wallet[] = [];
		const notInstalled: Wallet[] = [];

		for (const wallet of wallets) {
			if (wallet.readyState === WalletReadyState.Installed) {
				installed.push(wallet);
			} else {
				notInstalled.push(wallet);
			}
		}

		return installed.length
			? [installed, notInstalled]
			: [notInstalled, []];
	}, [wallets]);

	// TODO: Handle this
	console.log('not install wallet: ', notInstalledWallet);

	const closeModal = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	const handleWalletClick = useCallback(
		(walletName: WalletName) => {
			select(walletName);
			closeModal();
		},
		[select, closeModal],
	);

	const handleTabKey = useCallback(
		(event: KeyboardEvent) => {
			const node = ref.current;
			if (!node) return;

			// here we query all focusable elements
			const focusableElements = node.querySelectorAll('button');
			const firstElement = focusableElements[0]!;
			const lastElement =
				focusableElements[focusableElements.length - 1]!;

			if (event.shiftKey) {
				// if going backward by pressing tab and firstElement is active, shift focus to last focusable element
				if (document.activeElement === firstElement) {
					lastElement.focus();
					event.preventDefault();
				}
			} else {
				// if going forward by pressing tab and lastElement is active, shift focus to first focusable element
				if (document.activeElement === lastElement) {
					firstElement.focus();
					event.preventDefault();
				}
			}
		},
		[ref],
	);

	useLayoutEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeModal();
			} else if (event.key === 'Tab') {
				handleTabKey(event);
			}
		};

		window.addEventListener('keydown', handleKeyDown, false);

		return () => {
			window.removeEventListener('keydown', handleKeyDown, false);
		};
	}, [closeModal, handleTabKey]);

	return (
		<Modal
			open={open}
			{...props}
		>
			<ModalContent onInteractOutside={closeModal}>
				<div className='flex w-max max-w-4xl flex-col md:flex-row'>
					<div className='flex w-[36%] flex-col bg-black p-4'>
						{/* <Logo className='h-16 w-75.5' /> */}
						<h1 className='font-bold text-2xl text-white mt-10 whitespace-nowrap'>
							Connect your wallet
						</h1>
						<p className='text-lg font-medium leading-7 text-white'>
							HAHAHAHAHAHAHHA
						</p>
					</div>
					<div className='w-[64%] bg-white'>
						<div className='flex h-24 w-full items-center justify-between border-b-2 border-gray-10 p-4'>
							<p className='text-2xl font-semibold text-black'>
								Available Wallets
							</p>
							<XIcon
								className='size-17.5 rounded-full bg-gray-10 fill-gray-08 p-5 hover:bg-gray-02'
								onClick={closeModal}
							/>
						</div>
						{/* TODO: Handle if installed wallet equal to 0 */}
						<div className='grid grid-cols-2 grid-rows-4 gap-6 p-4'>
							{installedWallet.map((wallet, index: number) => (
								<WalletModalButton
									tabIndex={index}
									key={wallet.adapter.name}
									onClick={() =>
										handleWalletClick(wallet.adapter.name)
									}
									startIcon={
										<Image
											src={wallet.adapter.icon}
											alt={wallet.adapter.name}
											height={60}
											width={60}
										/>
									}
								>
									{wallet.adapter.name}
								</WalletModalButton>
							))}
						</div>
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
};
