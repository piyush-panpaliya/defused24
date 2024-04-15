import Card from '@/components/Card'
import { getUser } from '@/lib/user'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = ({ params: { user } }: { params: { user: string } }) => {
	const userC = getUser(parseInt(user))
	if (!userC) {
		redirect('/')
	}
	return (
		<div className='flex min-h-screen flex-col items-center  gap-4 -mt-8 text-white'>
			<Card user={userC} />
			<Link
				className='bg-blue-400 p-4 rounded-xl text-xl mb-8'
				href={`/chat/${userC.id}`}
			>
				Chat
			</Link>
		</div>
	)
}

export default Page
