import { matchUsers } from '@/lib/user'
import { match } from 'assert'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: NextApiRequest, res: NextApiResponse) {
	const mbti = new URL(`${request.url}`).searchParams.get('mbti')
	if (
		!mbti ||
		mbti.length !== 4 ||
		!'IE'.includes(mbti[0]) ||
		!'SN'.includes(mbti[1]) ||
		!'TF'.includes(mbti[2]) ||
		!'JP'.includes(mbti[3])
	) {
		return new Response('Invalid MBTI', {
			status: 400,
		})
	}

	const users = matchUsers(mbti as string, 10)
	return new Response(JSON.stringify(users), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
