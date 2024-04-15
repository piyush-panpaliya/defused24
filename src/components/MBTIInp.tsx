'use client'
import * as React from 'react'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'
import { User } from '@/lib/user'
import Card from './Card'
import Link from 'next/link'

export function MBTIInp() {
	const [mbti, setMbti] = React.useState({
		IE: 'I',
		SN: 'S',
		TF: 'T',
		JP: 'J',
	})
	const [users, setUsers] = React.useState<User[]>([])
	React.useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch(`/api/match?mbti=${Object.values(mbti).join('')}`)
			const data = await res.json()
			setUsers(data)
		}
		fetchUsers()
	}, [mbti])

	const searchParams = useSearchParams()
	const onChange = (key: string, value: string) => {
		setMbti((prev) => ({ ...prev, [key]: value }))
	}
	// const onSubmit = (e) => {
	// 	e.preventDefault()
	// 	const params = new URLSearchParams(searchParams.toString())
	// 	// params.set('mbti', Object.values(mbti).join(''))
	// }
	return (
		<div className='flex flex-col items-center gap-y-8'>
			<div className='flex flex-col items-center gap-2'>
				<div className='flex gap-2'>
					<Select
						onValueChange={(val) => onChange('IE', val)}
						value={mbti.IE}
						defaultValue='I'
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select I or E' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='I'>Introvert</SelectItem>
								<SelectItem value='E'>Extrovert</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(val) => onChange('SN', val)}
						value={mbti.SN}
						defaultValue='S'
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select S or N' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='S'>Sensing</SelectItem>
								<SelectItem value='N'>Intuition</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(val) => onChange('TF', val)}
						value={mbti.TF}
						defaultValue='T'
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select T or F' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='T'>Thinking</SelectItem>
								<SelectItem value='F'>Feeling</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(val) => onChange('JP', val)}
						value={mbti.JP}
						defaultValue='J'
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select J or P' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='J'>Judging</SelectItem>
								<SelectItem value='P'>Perceiving</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='flex gap-4 flex-wrap'>
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
