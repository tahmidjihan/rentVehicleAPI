import { dbPool } from '../../dbPool';
import { type User } from './User.d';
import bcrypt from 'bcrypt';

// hashing

async function hashPassword(password: string) {
  const saltRounds = 11;
  let hashedPassword: string = '';
  let pending = true;
  //   function setHashedPassword(hashed: string) {
  //     hashedPassword = hashed;
  //   }
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      if (hash) {
        hashedPassword = hash;
        pending = false;
      }
    });
  });
  while (pending) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return hashedPassword;
}
function comparePassword(hashedPassword: string, password: string) {
  return bcrypt.compare(password, hashedPassword, function (err, result) {
    if (err) {
      console.log(err);
    }
    return result;
  });
}

//auth
export async function signup(user: User) {
  const password = user.password;
  //   console.log(password);
  const hashedPassword = await hashPassword(password);
  //   console.log(hashedPassword);
  const data = await dbPool.query(
    'INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user.name, user.email, hashedPassword, user.phone, user.role]
  );
  console.log(data);
  return data;
  //   return user;
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
