'use client';

import { useState, useEffect, Key } from 'react';
import io, { Socket } from 'socket.io-client';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	// FormLabel,
	FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';

type Message = {
	message: string;
	from: 'client' | 'server';
};

const ChatBox = () => {
	const [totalMessages, setTotalMessages] = useState<Message[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [calculating, setCalculating] = useState<boolean>(false);

	const form = useForm<{ message: string }>();

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);

		setSocket(newSocket);

		newSocket.on('received_message', (data: string) => {
			setTotalMessages((prevMessages) => [
				...prevMessages,
				{ message: data, from: 'server' },
			]);
			setCalculating(false);
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const sendMessage = (data: { message: string }) => {
		if (data.message.trim()) {
			socket?.emit('send_message', data.message);
			setTotalMessages((prevMessages) => [
				...prevMessages,
				{ message: data.message, from: 'client' },
			]);
			form.setValue('message', '');
			setCalculating(true);
		}
	};

	return (
		<div className='p-4 max-w-4xl w-full mx-auto'>
			{totalMessages.map((message: Message, key: Key) => (
				<div
					key={key}
					className={twMerge(
						'w-full flex',
						message.from === 'server' && 'pr-10 justify-start',
						message.from === 'client' && 'pl-10 justify-end',
					)}
				>
					<div
						className={twMerge(
							'my-2 rounded-md p-4 w-max max-w-full',
							message.from === 'server' &&
								'bg-slate-200 text-neutral-900',
							message.from === 'client' &&
								' bg-neutral-900 text-white',
						)}
					>
						<ReactMarkdown>{message.message}</ReactMarkdown>
					</div>
				</div>
			))}
			{calculating && (
				<div className={'w-full flex justify-start'}>
					<div
						className={
							'my-2 rounded-md p-4 w-max max-w-full bg-slate-200 text-neutral-900 animate-pulse'
						}
					>
						Thinking...
					</div>
				</div>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(sendMessage)}
					className='space-x-2 flex w-full'
				>
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem className='w-full'>
								{/* <FormLabel>Username</FormLabel> */}
								<FormControl>
									<Input
										type='text'
										placeholder='Message'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									The auto generate wallet is not working now.
									Please deposit to this wallet for testing:
									9uVDGba5CygE7Fmv28SZgTRWfA4LUYAXGnsMhzMz2iKw
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Send</Button>
				</form>
			</Form>
		</div>
	);
};

export default ChatBox;
