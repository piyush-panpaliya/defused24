import Card from '@/components/Card'
import { getRandomUsers } from '@/lib/user'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	const users = getRandomUsers(5)
	return (
		<div className='flex min-h-screen flex-col items-center justify-between gap-4 -mt-8 text-white'>
			<Link className='bg-blue-400 p-4 rounded-xl text-xl mb-8' href='/match'>
				Get matches
			</Link>
			<p className='text-2xl'>{'Random people :)'}</p>
			<div className='flex flex-wrap items-center justify-between gap-4 '>
				{users.map((user, n) => (
					<Link
						href={`/${user.id}`}
						key={n}
						className='flex items-center space-x-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-slate-900 p-2 rounded-xl'
					>
						{/* @next/next/no-img-element */}
						<Card user={user} />
					</Link>
				))}
			</div>
		</div>
	)
}
