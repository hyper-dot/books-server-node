// GET USER DATA
interface UserData {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
}

export const getUserData = async (token: string): Promise<UserData> => {
  const res = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
    { cache: 'no-store' },
  );
  const data: UserData = await res.json();
  return data;
};
