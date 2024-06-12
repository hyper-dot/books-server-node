// GET USER DATA
export const getUserData: any = async (token: string) => {
  const res = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  return data
}
