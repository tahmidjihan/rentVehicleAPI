import { type User } from './User.d';

export async function signup(user: User) {
  console.log('signup: ');
  console.log(user);
  return user;
}
export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log('login: ');
  console.log(email, password);
  return { email, password };
}
