import { getUser } from '@/lib/user'

type Params = {
	id: string
}
export async function GET(request: Request, context: { params: Params }) {
	const userid = parseInt(context.params.id)
	const user = getUser(userid)
	if (!user) {
		return new Response('User not found', {
			status: 404,
		})
	}
	return new Response(JSON.stringify(user), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
