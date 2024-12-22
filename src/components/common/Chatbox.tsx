'use client';

import { useState, useEffect, Key } from 'react';
import io from 'socket.io-client';
import {
	Form,
	FormControl,
	// FormDescription,
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

const socket = io('http://localhost:4000');

type Message = {
	message: string;
	from: 'client' | 'server';
};

const ChatBox = () => {
	const [totalMessages, setTotalMessages] = useState<Message[]>([]);
	const form = useForm<{ message: string }>();

	useEffect(() => {
		// Listen for messages from the server
		socket.on('message', (data: string) => {
			console.log('message received: ', data);
			setTotalMessages((prevMessages) => [
				...prevMessages,
				{ message: data, from: 'server' },
			]);
		});

		// Cleanup function to disconnect the socket and remove listeners when the component is unmounted
		return () => {
			socket.off('message'); // Removes the event listener for 'message'
			socket.disconnect(); // Disconnects the socket
		};
	}, []);

	const sendMessage = (data: { message: string }) => {
		if (data.message.trim()) {
			socket.emit('message', data.message);
			setTotalMessages((prevMessages) => [
				...prevMessages,
				{ message: data.message, from: 'client' },
			]);
			form.setValue('message', '');
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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(sendMessage)}
					className='space-x-8 flex w-full'
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
								{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
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
