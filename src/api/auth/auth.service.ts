import { dbPool } from '../../dbPool';
import {
  type Credentials,
  type User,
  type UserResponse,
} from '../../types/User.d';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

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
async function signup(user: User) {
  const password = user.password;
  const hashedPassword = await hashPassword(password);
  const data = await dbPool.query(
    'INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user.name, user.email, hashedPassword, user.phone, user.role]
  );
  //   console.log(data);
  return data;
}
function signJWT(user: UserResponse) {
  return jwt.sign(user, config.JWT_SECRET);
}
async function signin({ email, password }: Credentials) {
  const data = await dbPool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  const user = data.rows[0];
  if (user) {
    const hashedPassword = user.password;
    const result = await comparePassword(hashedPassword, password);
    if (result) {
      const userToSend: UserResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
      const token = signJWT(userToSend);
      // userToSend.token = token;
      const result = { user: { ...userToSend }, token: token };
      return result;
    } else {
      return null;
    }
    // console.log(result);
  }
  // return null;
}
export default { signin, signup };
