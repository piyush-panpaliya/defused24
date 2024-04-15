'use client'
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	Card,
} from '@/components/ui/card'
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'

const Page = () => {
	const [mbti, setMbti] = React.useState({
		IE: 'I',
		SN: 'S',
		TF: 'T',
		JP: 'J',
	})
	const [name, setName] = React.useState('')
	const [age, setAge] = React.useState(25)
	const [state, setState] = React.useState('Delhi')
	const [male, setMale] = React.useState(true)
	const router = useRouter()
	const onMBTIChange = (key: string, value: string) => {
		setMbti((prev) => ({ ...prev, [key]: value }))
	}
	const onLogin = async (e: any) => {
		e.preventDefault()
		const user = {
			name,
			age,
			mbti: Object.values(mbti).join(''),
			state,
			gender: male ? 'Male' : 'Female',
		}
		console.log(user)
		const data = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
		if (data.status === 200) {
			router.push('/chat')
		}
	}
	useEffect(() => {
		// check for cookie
		const user = document.cookie
			.split('; ')
			.find((row) => row.startsWith('user='))
		if (user) {
			router.push('/chat')
		}
	}, [])
	return (
		<div className='flex flex-col min-h-screen -mt-20'>
			<main className='flex flex-col items-center justify-center flex-1 p-4'>
				<Card className='mx-auto shadow-lg rounded-lg p-6'>
					<CardHeader className='space-y-1'>
						<CardTitle className='text-3xl font-bold'>Login</CardTitle>
						<CardDescription>
							Enter your information to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								onChange={(e) => setName(e.target.value)}
								value={name}
								id='name'
								placeholder='Alex babu'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='age'>Age</Label>
							<Input
								onChange={(e) => setAge(parseInt(e.target.value) || age)}
								value={age}
								id='age'
								placeholder='25'
								required
							/>
						</div>
						<div className='space-y-2 flex flex-wrap max-w-[400px] gap-2'>
							<Select
								onValueChange={(val) => onMBTIChange('IE', val)}
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
								onValueChange={(val) => onMBTIChange('SN', val)}
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
								onValueChange={(val) => onMBTIChange('TF', val)}
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
								onValueChange={(val) => onMBTIChange('JP', val)}
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
						<div className='space-y-2'>
							<Label htmlFor='state'>State</Label>
							<Input
								onChange={(e) => setState(e.target.value)}
								value={state}
								id='state'
								placeholder='Delhi'
								required
							/>
						</div>
						<fieldset className='space-y-2'>
							<legend className='text-sm font-medium'>Gender</legend>
							<div className='space-x-2'>
								<Label
									className='inline-flex items-center'
									htmlFor='gender-male'
								>
									<Input
										id='gender-male'
										name='gender'
										type='radio'
										value='male'
										checked={male}
										onChange={(e) => setMale(true)}
									/>
									<span className='ml-2'>Male</span>
								</Label>
								<Label
									className='inline-flex items-center'
									htmlFor='gender-female'
								>
									<Input
										value='female'
										checked={!male}
										onChange={(e) => setMale(false)}
										id='gender-female'
										name='gender'
										type='radio'
									/>
									<span className='ml-2'>Female</span>
								</Label>
							</div>
						</fieldset>
						<Button
							onClick={onLogin}
							className='w-full bg-gray-900 text-white rounded-md shadow-md hover:shadow-lg transition duration-300'
							type='submit'
						>
							Login
						</Button>
					</CardContent>
				</Card>
			</main>
		</div>
	)
}

export default Page
