import { getRandomUsers } from '@/lib/user'

export async function GET(request: Request) {
	const users = getRandomUsers(50)
	return new Response(JSON.stringify(users), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
