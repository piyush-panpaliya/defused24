import { User } from '@/lib/user'
import React from 'react'

const Card = ({ user }: { user: User }) => {
	return (
		<div className='container px-4 md:px-6 text-white'>
			<div className='flex flex-col items-center gap-2'>
				<div className='rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800'>
					<img
						alt='Image'
						height='100'
						src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${user.Name}`}
						style={{
							aspectRatio: '100/100',
							objectFit: 'cover',
						}}
						width='100'
					/>
				</div>
				<div className='flex justify-between gap-4 text-xl'>
					Name:<span>{user.Name}</span>
				</div>
				<div className='flex justify-between gap-4'>
					<div className='flex items-center gap-2 text-sm'>
						<span className='font-medium'>Age:</span>
						<span>{user.Age}</span>
					</div>
					<div className='flex items-center gap-2 text-sm'>
						<span>Gender:</span>
						<img
							alt='Image'
							className='rounded-full'
							height='32'
							width='32'
							src={user.Gender == 'Male' ? '/male.svg' : '/female.svg'}
							style={{
								aspectRatio: '24/24',
								objectFit: 'cover',
							}}
						/>
					</div>
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<span>MBTI:</span>
					<span>{user.MBTI}</span>
				</div>
			</div>
		</div>
	)
}

export default Card
