'use client'
import React, { useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from '@/lib/user'

export default function Component({
	searchParams,
	params,
}: {
	searchParams: URLSearchParams
	params: { id: string }
}) {
	const id = params.id
	const [sendU, sSU] = React.useState<User>()
	const [msgs, sMsgs] = React.useState<any[]>([])
	useEffect(() => {
		const run = async () => {
			if (id) {
				const chats = localStorage.getItem('chats')
					? JSON.parse(localStorage.getItem('chats')!)
					: []
				const res = await fetch(`/api/user/${id}`)
				const data = await res.json()
				sSU(data)
				if (!chats.find((c: any) => c.u1 === id || c.u2 === id)) {
					fetch(`/api/chat?sid=${sendU?.id}`)
						.then((res) => res.json())
						.then((data) => {
							sMsgs(data)
							localStorage.setItem('chats', JSON.stringify(chats + data))
						})
				} else {
					const chat = chats.find((c: any) => c.u1 === id || c.u2 === id)
					fetch(`/api/chat?id=${chat.id}&sid=${sendU?.id}`)
						.then((res) => res.json())
						.then((data) => {
							sMsgs(data)
							localStorage.setItem(
								'chats',
								JSON.stringify(
									chats.map((c: any) => {
										if (c.u1 === id || c.u2 === id) {
											return data
										}
										return c
									})
								)
							)
						})
				}
			}
		}
		run()
	}, [id, sendU?.id])
	return (
		<div className='grid h-screen max-w-3xl mx-auto grid-rows-[auto,1fr] gap-4'>
			<div className='flex items-center justify-center p-4 rounded-lg border'>
				<div className='w-3 h-3 rounded-full bg-green-500 mr-2' />
				<h1 className='text-2xl font-bold tracking-tighter'>Chat</h1>
			</div>
			<div className='grid h-[calc(100%-1.5rem)] rounded-lg border p-4'>
				<div className='grid gap-4'>
					<div className='flex flex-col items-start gap-1'>
						<div className='rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm max-w-[75%]'>
							Sure, it's #123456789.
						</div>
						<div className='text-xs text-gray-500 dark:text-gray-400'>You</div>
					</div>
					<div className='flex flex-col items-end gap-1'>
						<div className='rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm max-w-[75%]'>
							Thank you. I'll check on that and get back to you shortly.
						</div>
						<div className='text-xs text-gray-500 dark:text-gray-400'>
							Support
						</div>
					</div>
				</div>
			</div>
			<div className='flex items-center rounded-lg border'>
				<Input className='rounded-full flex-1' placeholder='Type a message' />
				<Button className='h-10 px-4 rounded-full shrink-0'>
					<SendIcon className='w-4 h-4' />
					<span className='sr-only'>Send</span>
				</Button>
			</div>
		</div>
	)
}

function SendIcon(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m22 2-7 20-4-9-9-4Z' />
			<path d='M22 2 11 13' />
		</svg>
	)
}
