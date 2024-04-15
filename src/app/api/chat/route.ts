import { getUser } from '@/lib/user'
import { randomBytes } from 'crypto'
import { NextApiResponse } from 'next'
const fs = require('fs')
import { cookies } from 'next/headers'
import { parse } from 'path'


export async function POST(request: Request, res: NextApiResponse) {
  const chat = await request.json()
  let { sendUser, msgs } = await chat
  if (!sendUser || !msgs) {
    return new Response('Invalid chat data', {
      status: 400,
    })
  }
  const cookieStore = cookies()
  if (!cookieStore.get('user')?.value) {
    return new Response('User not found', {
      status: 400,
    })
  }

  let user = JSON.parse(cookieStore.get('user')?.value || '')
  user = getUser(parseInt(user.id))
  sendUser = getUser(parseInt(sendUser))
  if (!user || !sendUser) {
    return new Response('Invalid user', {
      status: 400,
    })
  }
  const fmsg = msgs
  fs.writeFileSync(`./data/${msgs.id}.json`, JSON.stringify(fmsg))
  return new Response(JSON.stringify(fmsg), {
    headers: {
      'content-type': 'application/json',
      'Set-Cookie': `user=${JSON.stringify(user)}; SameSite=Strict; Path=/`,
    },
  })
}


export const GET = async (request: Request, res: NextApiResponse) => {
  let id = new URL(`${request.url}`).searchParams.get('id')
  let sid = new URL(`${request.url}`).searchParams.get('sid')
  id = id ? parseInt(id) : null
  sid = sid ? parseInt(sid) : null
  if (!sid) {
    return new Response('Invalid user', {
      status: 400,
    })
  }
  const cookieStore = cookies()
  if (!cookieStore.get('user')?.value) {
    return new Response('User not found', {
      status: 400,
    })
  }
  const userid = JSON.parse(cookieStore.get('user')?.value || '').id
  console.log(userid, sid)
  if (!id || !fs.existsSync(`./data/${id}.json`)) {
    const nid = randomBytes(8).toString('hex')
    fs.writeFileSync(`./data/${nid}.json`, JSON.stringify({
      id: nid,
      u1: userid,
      u2: sid,
      msg: []
    }))
    return new Response(JSON.stringify({
      id: nid,
      u1: userid,
      u2: sid,
      msg: []
    }), {
      headers: {
        'content-type': 'application/json',
      },
    })
  }
  const msgs = fs.readFileSync(`./data/${id}.json`)
  return new Response(msgs, {
    headers: {
      'content-type': 'application/json',
    },
  })
}