'use client';

import * as ModalPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { twJoin } from 'tailwind-merge';

import { cn } from '@/lib/utils';

const Modal = ({
	modal = true,
	...props
}: React.ComponentPropsWithoutRef<typeof ModalPrimitive.Root>) => {
	return (
		<ModalPrimitive.Root
			modal={modal}
			{...props}
		/>
	);
};

const ModalTrigger = ModalPrimitive.Trigger;

const ModalPortal = ModalPrimitive.Portal;

const ModalClose = React.forwardRef<
	React.ElementRef<typeof ModalPrimitive.Close>,
	React.ComponentPropsWithoutRef<typeof ModalPrimitive.Close>
>(({ className, ...props }, ref) => (
	<ModalPrimitive.Close
		ref={ref}
		className={cn('ring-0 focus:outline-none focus:ring-0', className)}
		{...props}
	/>
));
ModalClose.displayName = ModalPrimitive.Close.displayName;

const ModalOverlay = React.forwardRef<
	React.ElementRef<typeof ModalPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<ModalPrimitive.Overlay
		ref={ref}
		className={cn(
			'fixed inset-0 z-50 w-full bg-black bg-opacity-60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className,
		)}
		{...props}
	/>
));
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName;

const ModalContent = React.forwardRef<
	React.ElementRef<typeof ModalPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<ModalPortal>
		<ModalOverlay />
		<ModalPrimitive.Content
			ref={ref}
			className={twJoin(
				'fixed left-1/2 top-1/2 z-50 w-max max-w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-black shadow-xl shadow-gray-300 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
				className,
			)}
			{...props}
		>
			{children}
		</ModalPrimitive.Content>
	</ModalPortal>
));
ModalContent.displayName = ModalPrimitive.Content.displayName;

const ModalHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex w-full', className)}
		{...props}
	/>
);
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex w-full', className)}
		{...props}
	/>
);
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = React.forwardRef<
	React.ElementRef<typeof ModalPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
	<ModalPrimitive.Title
		ref={ref}
		className={cn(
			'text-sm font-semibold leading-none -tracking-7 text-white',
			className,
		)}
		{...props}
	/>
));
ModalTitle.displayName = ModalPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
	React.ElementRef<typeof ModalPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
	<ModalPrimitive.Description
		ref={ref}
		className={cn('text-xs text-gray-800', className)}
		{...props}
	/>
));
ModalDescription.displayName = ModalPrimitive.Description.displayName;

export {
	Modal,
	ModalPortal,
	ModalOverlay,
	ModalTrigger,
	ModalClose,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalTitle,
	ModalDescription,
};
