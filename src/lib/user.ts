import { data } from "./data.json"

export type User = typeof data[0]

export const getUser = (userid: number) => {
  if (!userid || userid <= 0 || userid > data.length) return null
  const user = data.find((user) => user.id === userid)
  return user
}

export const getRandomUsers = (count: number) => {
  const users = data.sort(() => Math.random() - Math.random()).slice(0, 50)
  return users
}


export const matchUsers = (mbti: string, count: number = 5) => {
  const users = data.filter(user => user.MBTI === mbti).sort(() => Math.random() - Math.random()).slice(0, count)
  return users
}