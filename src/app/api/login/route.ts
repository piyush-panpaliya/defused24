import { randomBytes } from 'crypto'
import { NextApiResponse } from 'next'

export async function POST(request: Request, res: NextApiResponse) {
	let user = await request.json()
	if (
		!user.mbti ||
		user.mbti.length !== 4 ||
		!'IE'.includes(user.mbti[0]) ||
		!'SN'.includes(user.mbti[1]) ||
		!'TF'.includes(user.mbti[2]) ||
		!'JP'.includes(user.mbti[3])
	) {
		return new Response('Invalid MBTI', {
			status: 400,
		})
	}
	if (!user.name || !user.age || !user.state) {
		return new Response('Invalid user data', {
			status: 400,
		})
	}
	user = { ...user, id: randomBytes(8).toString('hex') }
	return new Response(JSON.stringify(user), {
		headers: {
			'content-type': 'application/json',
			'Set-Cookie': `user=${JSON.stringify(user)}; SameSite=Strict; Path=/`,
		},
	})
}
