import type {
	CSSProperties,
	FC,
	MouseEvent,
	PropsWithChildren,
	ReactNode,
} from 'react';

export type ButtonProps = PropsWithChildren<{
	className?: string;
	disabled?: boolean;
	endIcon?: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	startIcon?: ReactNode;
	style?: CSSProperties;
	tabIndex?: number;
}>;

export const WalletModalButton: FC<ButtonProps> = (props) => {
	return (
		<button
			className='flex h-30 p-4 w-full items-center gap-1 truncate rounded-2xl border-2 border-gray-10 px-6.5 text-2xl font-medium leading-normal text-black hover:border-gray-100 hover:bg-gray-100'
			disabled={props.disabled}
			style={props.style}
			onClick={props.onClick}
			tabIndex={props.tabIndex ?? 0}
			type='button'
		>
			{props.startIcon && (
				<div className='box-content size-15 rounded-xl border-2 border-gray-100 bg-white p-3'>
					{props.startIcon}
				</div>
			)}
			{props.children}
			{props.endIcon && (
				<div className='box-content size-15 rounded-xl border-2 border-gray-100 bg-white p-3'>
					{props.endIcon}
				</div>
			)}
		</button>
	);
};
