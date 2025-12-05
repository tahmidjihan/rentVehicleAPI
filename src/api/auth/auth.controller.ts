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
async function comparePassword(hashedPassword: string, password: string) {
  let pending = true;
  let resultToReturn = false;
  bcrypt.compare(password, hashedPassword, function (err, result) {
    if (err) {
      console.log(err);
    }
    resultToReturn = result;
    pending = false;
    // console.log(result);
    return result;
  });
  while (pending) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return resultToReturn;
}

//auth
export async function signup(user: User) {
  const password = user.password;
  const hashedPassword = await hashPassword(password);
  const data = await dbPool.query(
    'INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user.name, user.email, hashedPassword, user.phone, user.role]
  );
  //   console.log(data);
  return data;
}
export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const data = await dbPool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  const user = data.rows[0];
  if (user) {
    const hashedPassword = user.password;
    const result = await comparePassword(hashedPassword, password);
    // if (result) {
    //   return user;
    // }
    console.log(result);
  }
  // return null;
}
